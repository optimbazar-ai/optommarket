import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// GET /api/health - Health check endpoint
router.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  const dbName = mongoose.connection.readyState === 1 ? mongoose.connection.name : 'N/A';
  
  res.status(200).json({
    status: 'OK',
    database: dbStatus,
    dbName: dbName,
    timestamp: new Date().toISOString(),
    service: 'OptoMarket API',
    version: '1.0.0'
  });
});

export default router;
