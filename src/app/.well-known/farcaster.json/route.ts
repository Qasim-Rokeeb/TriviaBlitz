export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  const config = {
    accountAssociation: {
      header:
        "",
      payload: "",
      signature:
        "",
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