const jwt = require('jsonwebtoken');

class SocketManager {
  constructor() {
    this.userSocketMap = new Map();
  }

  initialize(io) {
    this.io = io;

    io.use((socket, next) => {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Authentication error'));
      }

      try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        socket.userId = decoded.id;
        next();
      } catch (err) {
        next(new Error('Authentication error'));
      }
    });

    io.on('connection', (socket) => {
      this.handleConnection(socket);
      
      socket.on('disconnect', () => {
        this.handleDisconnection(socket);
      });
    });
  }

  handleConnection(socket) {
    const userId = socket.userId.toString();
    
    if (!this.userSocketMap.has(userId)) {
      this.userSocketMap.set(userId, new Set());
    }
    
    this.userSocketMap.get(userId).add(socket.id);
    
    console.log(`User ${userId} connected with socket ${socket.id}`);
    console.log(`Total sockets for user ${userId}: ${this.userSocketMap.get(userId).size}`);
  }

  handleDisconnection(socket) {
    const userId = socket.userId.toString();
    
    if (this.userSocketMap.has(userId)) {
      this.userSocketMap.get(userId).delete(socket.id);
      
      if (this.userSocketMap.get(userId).size === 0) {
        this.userSocketMap.delete(userId);
      }
      
      console.log(`User ${userId} disconnected socket ${socket.id}`);
    }
  }

  emitToUser(userId, event, data) {
    const socketIds = this.userSocketMap.get(userId);
    
    if (socketIds && socketIds.size > 0) {
      socketIds.forEach(socketId => {
        this.io.to(socketId).emit(event, data);
      });
      
      console.log(`Emitted ${event} to user ${userId} on ${socketIds.size} socket(s)`);
    }
  }

  getUserSocketIds(userId) {
    return this.userSocketMap.get(userId) || new Set();
  }

  isUserOnline(userId) {
    return this.userSocketMap.has(userId) && this.userSocketMap.get(userId).size > 0;
  }
}

module.exports = new SocketManager();
