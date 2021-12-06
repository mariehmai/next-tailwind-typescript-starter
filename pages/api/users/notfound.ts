import { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(400).json({ statusCode: 400, message: 'Hit /users/notfound' });

  throw new Error('/users/notfound error!!');
};

export default withSentry(handler);
