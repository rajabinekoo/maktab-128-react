import mongoose from "mongoose";

class MongoConnection {
  public connected: boolean = false;

  async init() {
    if (this.connected) return;
    await mongoose.connect("mongodb://localhost:27017/QuoteApp");
    this.connected = true;
  }
}

export const mongoConnection = new MongoConnection();
