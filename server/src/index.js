require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const auth = require('./routes/auth');
const rooms = require('./rooms');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', auth);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// simple rooms manager
rooms(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log('Server listening on', PORT));
