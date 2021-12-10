import { NextApiRequest, NextApiResponse } from 'next';
// import { withSentry } from '@sentry/nextjs';

import { sampleUserData } from '../../../utils/sample-data';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    if (!Array.isArray(sampleUserData)) {
      throw new Error('Cannot find user data');
    }

    const userId = id as string;

    if (isNaN(parseInt(userId))) {
      throw new Error(`Id ${id} is not a valid id.`);
    }

    const user = sampleUserData.find(user => user.id == parseInt(userId));

    if (!user) {
      return res
        .status(400)
        .json({ statusCode: 400, message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err?.message });
  }
};

// export default withSentry(handler);
export default handler;
