import { NextApiRequest, NextApiResponse } from 'next';
// import { withSentry } from '@sentry/nextjs';

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    throw new Error('Intentional /users/notfound error!!');
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

// export default withSentry(handler);
export default handler;
