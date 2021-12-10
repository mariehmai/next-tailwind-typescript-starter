import { NextApiRequest, NextApiResponse } from 'next';
// import { withSentry } from '@sentry/nextjs';

import { sampleUserData } from '../../../utils/sample-data';

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  throw new Error('User found, this is boring meh!');
  try {
    if (Array.isArray(sampleUserData)) {
    }

    res.status(200).json(sampleUserData);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

// export default withSentry(handler);
export default handler;
