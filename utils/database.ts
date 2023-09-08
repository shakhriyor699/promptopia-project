import mongoose, { ConnectOptions } from "mongoose";


declare let process: {
  env: {
    MONGODB_URI: string
  }
}

let isConnected = false

export const connect = async () => {
  mongoose.set('strictQuery', true)

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'share_prompt',
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectOptions)
    
    isConnected = true
  } catch (e) {
    console.log(e)
  }
}