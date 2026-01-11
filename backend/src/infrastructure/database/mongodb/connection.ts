import mongoose from 'mongoose';
import { config } from '../../../shared/config/environment';

export class MongoDBConnection {
  private static instance: MongoDBConnection;

  private constructor() {}

  public static getInstance(): MongoDBConnection {
    if (!MongoDBConnection.instance) {
      MongoDBConnection.instance = new MongoDBConnection();
    }
    return MongoDBConnection.instance;
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(config.database.mongoUri);
      console.log('✅ MongoDB connected successfully');
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log('✅ MongoDB disconnected successfully');
    } catch (error) {
      console.error('❌ MongoDB disconnection error:', error);
      throw error;
    }
  }

  public getConnection() {
    return mongoose.connection;
  }
}
