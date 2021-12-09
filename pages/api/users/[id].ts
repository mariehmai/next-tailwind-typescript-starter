import { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import { SpanStatusCode } from '@opentelemetry/api';

import { sampleUserData } from '../../../utils/sample-data';
import { requestTracer } from '../../../functions-instrumentation';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const span = requestTracer.startSpan('getUserById');

  span.setAttributes({
    method: req.method,
    path: req.url,
    query: JSON.stringify(req.query),
    body: JSON.stringify(req.body),
    headers: JSON.stringify(req.headers)
  });

  try {
    const { id } = req.query;

    if (!Array.isArray(sampleUserData)) {
      throw new Error('Cannot find user data');
    }

    const userId = id as string;

    if (isNaN(parseInt(userId))) {
      throw new Error(`Id ${id} is not a valid id.`);
    }

    const user = sampleUserData.find((user) => user.id == parseInt(userId));

    if (!user) {
      span.setStatus({ code: SpanStatusCode.ERROR });
      span.setAttribute('error_message', 'User not found');
      return res
        .status(404)
        .json({ statusCode: 404, message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (err) {
    span.setStatus({ code: SpanStatusCode.ERROR });

    res.status(500).json({ statusCode: 500, message: err.message });
  } finally {
    span.end();
  }
};

export default withSentry(handler);
