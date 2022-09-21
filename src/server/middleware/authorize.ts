import { Request, Response, NextFunction } from "express";
import { respondWith } from "../utils/server_utils";
import { app } from "firebase-admin/lib/firebase-namespace-api";

const authToken = (firebaseAdmin: app.App) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"]?.split(" ");
    const admin = authHeader && authHeader[0];

    if (admin === "admin") {
      /* 
      Logic 1 goes here

      */
      return next();
    }
    const token = authHeader && authHeader[1];

    if (!token) {
      return res.send(respondWith(403, `Invalid Token`));
    }

    if (!firebaseAdmin)
      return res.send(respondWith(403, `Authentication Server Error`));

    firebaseAdmin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        /* 
         Logic 2 goes here

          */
        return next();
      })
      .catch(() => {
        return res.send(respondWith(403, `Invalid Token`));
      });
  };
};

export { authToken };
