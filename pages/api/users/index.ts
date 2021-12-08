import { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import { SpanStatusCode } from '@opentelemetry/api';

import { sampleUserData } from '../../../utils/sample-data';
import { requestTracer } from '../../../functions-instrumentation';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const span = requestTracer.startSpan('getUsers');

  span.setAttributes({
    method: req.method,
    path: req.url,
    query: JSON.stringify(req.query),
    body: JSON.stringify(req.body),
    headers: JSON.stringify(req.headers)
  });

  try {
    if (!Array.isArray(sampleUserData)) {
      throw new Error('Cannot find user data');
    }

    res.status(200).json(sampleUserData);
  } catch (err) {
    span.setStatus({ code: SpanStatusCode.ERROR });

    res.status(500).json({ statusCode: 500, message: err.message });
  } finally {
    span.end();
  }
};

export default withSentry(handler);
