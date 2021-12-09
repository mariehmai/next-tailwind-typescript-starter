import { NextApiRequest, NextApiResponse } from 'next';
import { SpanStatusCode } from '@opentelemetry/api';

import { requestTracer } from '../../../functions-instrumentation';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const span = requestTracer.startSpan('userNotFound');

  span.setAttributes({
    method: req.method,
    path: req.url,
    query: JSON.stringify(req.query),
    body: JSON.stringify(req.body),
    headers: JSON.stringify(req.headers)
  });

  try {
    throw new Error('Intentional /users/notfound error!!');
  } catch (err) {
    span.setStatus({ code: SpanStatusCode.ERROR });

    res.status(500).json({ statusCode: 500, message: err.message });
  } finally {
    span.end();
  }
};

export default handler;
// export default withSentry(handler);
