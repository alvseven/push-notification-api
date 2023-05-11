import { Router } from "express";
import WebPush from "web-push";
import z from "zod";

export const notificationRoutes = Router();

const { publicKey, privateKey } = WebPush.generateVAPIDKeys();

WebPush.setVapidDetails(
  `http://localhost:${process.env.PORT}`,
  publicKey,
  privateKey
);

notificationRoutes.get("/push/public_key", (req, res) => {
  return res.json({ publicKey }).status(200);
});

notificationRoutes.post("/push/send", (req, res) => {
  const sendPushBody = z.object({
    subscription: z.object({
      endpoint: z.string(),
      keys: z.object({
        p256dh: z.string(),
        auth: z.string(),
      }),
    }),
  });

  const { subscription } = sendPushBody.parse(req.body);

  WebPush.sendNotification(
    subscription,
    `Hoje é ${new Date().toLocaleDateString()}`
  );

  return res.send().status(200);
});
