import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/node";




export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"], // Track requests by IP
    rules: [

      // Shield protects your app from common attacks e.g. SQL injection
      shield({ mode: "LIVE" }),
      // Create a bot detection rule
      detectBot({
        mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only

        // Block all bots except the following
        allow: [
          "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
          
        ],
      }),
      // Create a token bucket rate limit. Other algorithms are supported.
      tokenBucket({
        mode: "LIVE",
        refillRate: 5, // Refill 5 tokens per interval
        interval: 30, // Refill every 30 seconds
        capacity: 15, // Bucket capacity of 15 tokens
      }),
    ],
  });
  