import { NextApiRequest, NextApiResponse } from 'next';
// import { withSentry } from '@sentry/nextjs';

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ statusCode: 200, message: 'OK' });
};

export default handler;
// export default withSentry(handler);
