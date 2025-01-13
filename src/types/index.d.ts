import { UserDocument } from "@/models/User";
import { Server } from "http";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }

    interface Application {
      get(name: "io"): Server;
    }
  }
}
