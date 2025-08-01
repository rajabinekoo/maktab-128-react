import mongoose from "mongoose";

class MongoConnection {
  public connected: boolean = false;

  async init() {
    if (this.connected) return;
    await mongoose.connect(<string>process.env.DATABASE_URL);
    this.connected = true;
  }
}

export const mongoConnection = new MongoConnection();
