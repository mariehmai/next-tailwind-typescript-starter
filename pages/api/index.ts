import { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  throw new Error('API ERROR, not fun!');
  res.status(200).json({ statusCode: 200, message: 'OK' });
};

export default withSentry(handler);
