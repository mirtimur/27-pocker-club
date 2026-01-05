const { shuffleDeck } = require('./util/shuffle');

module.exports = function(io){
  const rooms = new Map();

  io.on('connection', (socket) => {
    socket.on('create_room', ({ roomId, maxPlayers }, cb) => {
      if (rooms.has(roomId)) return cb && cb({ error: 'exists' });
      rooms.set(roomId, { id: roomId, players: [], maxPlayers: maxPlayers || 6, state: 'waiting' });
      cb && cb({ ok: true });
    });

    socket.on('join_room', ({ roomId, nickname }, cb) => {
      const r = rooms.get(roomId);
      if (!r) return cb && cb({ error: 'no_room' });
      if (r.players.length >= r.maxPlayers) return cb && cb({ error: 'full' });
      const player = { id: socket.id, nickname, chips: 1000 };
      r.players.push(player);
      socket.join(roomId);
      io.to(roomId).emit('room_update', r);
      cb && cb({ ok: true, room: r });
    });

    socket.on('start_game', ({ roomId }, cb) => {
      const r = rooms.get(roomId);
      if (!r) return cb && cb({ error: 'no_room' });
      // shuffle and deal hole cards (2 each)
      const deck = shuffleDeck();
      r.game = { deck, community: [], bets: [], pot: 0 };
      r.players.forEach(p => { p.cards = [deck.pop(), deck.pop()]; });
      r.state = 'in_game';
      io.to(roomId).emit('game_started', { room: r });
      cb && cb({ ok: true });
    });

    socket.on('request_state', ({ roomId }, cb) => {
      const r = rooms.get(roomId);
      cb && cb({ room: r });
    });
  });
};
