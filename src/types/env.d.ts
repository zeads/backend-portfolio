export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      MONGO_URI: string;
      PORT?: string;
    }
  }
}
