## Intro

TON uses the Proof of Stake (PoS) consensus model, meaning the network’s security and stability are maintained by a set of network validators. Anyone can become a validator and contribute to the network security while receiving Toncoin as a reward. 

_What do validators do?_ Network validators verify all the user transactions. If all validators reach a consensus that a given transaction is valid, this transaction is included in the blockchain. The invalid transactions are rejected.

## Task

In this front-end-related project, we would like to create a map of TON Validators to showcase the diverse spirit of the TON international community. So, the task is to build a React component that implements the following UI interface:

- desktop:

![Validators Map (Desktop)](https://github.com/ton-developers/ton-validators-map/assets/20891090/4b939b70-7d36-4f39-9566-ecfb5eca1d65)

- mobile:

![Validators Map (Mobile)](https://github.com/ton-developers/ton-validators-map/assets/20891090/a41622ec-eb31-446c-bdb9-cac62f3b3f64)

- Possible animations:
  - The points are pulsating
  - The connecting lines are pulsating from point to point, thus resembling a network

The best implementations might be integrated into the [ton.org website](https://ton.org/).

## Instructions

To contribute:
1. Fork the project
2. Make the changes
3. Create a PR
4. The Vercel preview deployment should be completed successfully, and the preview link will be provided in the PR

The project is based on the [Next.js](https://nextjs.org/) meta-framework (Pages router). After installing the dependencies, start the local development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
The app should now be available at the [http://localhost:3000](http://localhost:3000). Make changes to `pages/index.tsx` or update the project in any way necessary.

The list of validators can be fetched via the following URL: https://wtfomotydwju2q6x6zjjhlswmi0cczub.lambda-url.eu-central-1.on.aws/

The response format is:
```json
{
  "count": 123,
  "countriesCount": 32,
  "totalStake": 12345670000000000,
  "items": [
    {
      "country": "Country Code, e.g., US",
      "latitude": 37.751,
      "longitude": -97.822
    },
    ...etc  
  ]
}
```

Feel free to be creative and experiment!

## Useful links/resources

- Figma designs for the component: https://www.figma.com/file/TUFuS0d9wELysCT7QT09GN/hacktonberfest%3A-TON-Validators-Map?type=design&node-id=0%3A1&mode=dev
- Javascript SDK for The Open Network: https://github.com/toncenter/tonweb
- convert-country-codes package: https://www.npmjs.com/package/convert-country-codes
- countryjs package: https://www.npmjs.com/package/countryjs

## Communication

For general inquiries, see [HACK-TON-BERFEST 2023 Telegram Group](https://t.me/hack_ton_berfest_2023). For project-specific questions or clarifications, please reach out via [telegram](https://t.me/andreyxdd) or [email](andrei.v@ton.org).
