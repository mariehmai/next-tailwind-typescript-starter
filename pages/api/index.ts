import { NextApiRequest, NextApiResponse } from 'next';
import * as Sentry from '@sentry/node';
// import { withSentry } from '@sentry/nextjs';

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  const transaction = Sentry.startTransaction({
    op: 'test',
    name: 'My First Test Transaction',
  });

  setTimeout(() => {
    try {
      foo();
    } catch (e) {
      Sentry.captureException(e);
    } finally {
      transaction.finish();
    }
  }, 99);

  res.status(200).json({ statusCode: 200, message: 'OK' });
};

// export default withSentry(handler);
export default handler;
