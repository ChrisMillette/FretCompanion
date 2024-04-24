This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Description

This is a web application to search whether or not a song has public tablature available. Users may log in and save songs they find to a private list and for everyone, a guitar chord library is available for reference.

## Auth .ENV.LOCAL

To configure authentication yourself, you will need to create a new project on Google Firebase.
Add the authentication module and follow the steps to get the tokens required.

Create a file named ".env.local" and add the following lines

NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_TOKEN"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="AUTH_DOMAIN"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="PROJECT_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="STORAGE_BUCKET"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="SENDER_ID"
NEXT_PUBLIC_FIREBASE_APP_ID="APP_ID"
NEXT_PUBLIC_GITHUB_KEY="YOU_GITHUB_TOKEN" - Get this from your Github account

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## API

Uses the Songsterr API to check if songs have available tabs (https://www.songsterr.com/)

Uses the Deezer API to fetch song information (https://www.deezer.com/en/)

## More Information from NEXT.js

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
