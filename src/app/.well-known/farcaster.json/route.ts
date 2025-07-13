export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  const config = {
   
  "accountAssociation": {
    "header": "eyJmaWQiOjg3MjkzNSwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweEFEMDYzMjVEMjExODhEQ2FlMEJFRDMxODQ0ZDg3MjllQ0Y3MDQxRGIifQ",
    "payload": "eyJkb21haW4iOiJ0cml2aWEtYmxpdHoudmVyY2VsLmFwcCJ9",
    "signature": "MHg0ODlkYzQwNGE5ZGNjZGI4NjQyNDU4ODY2NTE4YjZmNDhjN2Q2OGY2MTYyZjc4NjZkYWNhYzMwOWYyMTNlMzMzMTljZGRjYmYwYWI5YTU3ZjBlMDY2Y2NhNDUwYmJjMWM5NGI0YjJlZmM3MGI2MWQxZDhiZTJhYjgzMmExZjI1MjFi"
  },

    frame: {
      version: "1",
      name: "TriviaBlitz",
      iconUrl: `https://trivia-blitz.vercel.app//icon.png`,
      homeUrl: appUrl,
      imageUrl: `https://trivia-blitz.vercel.app/frames/hello/opengraph-image`,
      buttonTitle: "Launch Frame",
      splashImageUrl: `https://trivia-blitz.vercel.app/splash.png`,
      splashBackgroundColor: "#f7f7f7",
      webhookUrl: `https://trivia-blitz.vercel.app/api/webhook`,
    },
  };

  return Response.json(config);
}