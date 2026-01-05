const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

// In-memory users store for skeleton. Replace with Postgres in next iteration.
const users = new Map();

router.post('/register', async (req, res) => {
  const { email, password, nickname } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'missing' });
  if (users.has(email)) return res.status(409).json({ error: 'exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = { email, password: hash, nickname: nickname || email.split('@')[0], id: Date.now().toString() };
  users.set(email, user);
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'dev');
  res.json({ token, user: { id: user.id, email: user.email, nickname: user.nickname } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.get(email);
  if (!user) return res.status(401).json({ error: 'no_user' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'bad_pass' });
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'dev');
  res.json({ token, user: { id: user.id, email: user.email, nickname: user.nickname } });
});

module.exports = router;
