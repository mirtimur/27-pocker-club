const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const { pool } = require('../db');

// In-memory fallback
const users = new Map();

router.post('/register', async (req, res) => {
  const { email, password, nickname } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'missing' });
  const hash = await bcrypt.hash(password, 10);
  const userObj = { email, password: hash, nickname: nickname || email.split('@')[0] };
  if (pool) {
    // store in Postgres
    const client = await pool.connect();
    try {
      const check = await client.query('SELECT id FROM users WHERE email=$1', [email]);
      if (check.rowCount) return res.status(409).json({ error: 'exists' });
      const result = await client.query('INSERT INTO users (email, password_hash, nickname) VALUES ($1,$2,$3) RETURNING id, email, nickname', [email, hash, userObj.nickname]);
      const user = result.rows[0];
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'dev');
      return res.json({ token, user });
    } finally {
      client.release();
    }
  }

  // fallback in-memory
  if (users.has(email)) return res.status(409).json({ error: 'exists' });
  const user = { id: Date.now().toString(), ...userObj };
  users.set(email, user);
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'dev');
  res.json({ token, user: { id: user.id, email: user.email, nickname: user.nickname } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (pool) {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT id, email, password_hash, nickname FROM users WHERE email=$1', [email]);
      if (!result.rowCount) return res.status(401).json({ error: 'no_user' });
      const user = result.rows[0];
      const ok = await bcrypt.compare(password, user.password_hash);
      if (!ok) return res.status(401).json({ error: 'bad_pass' });
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'dev');
      return res.json({ token, user: { id: user.id, email: user.email, nickname: user.nickname } });
    } finally {
      client.release();
    }
  }

  const user = users.get(email);
  if (!user) return res.status(401).json({ error: 'no_user' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'bad_pass' });
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'dev');
  res.json({ token, user: { id: user.id, email: user.email, nickname: user.nickname } });
});

module.exports = router;
