import React from 'react';
import { render } from '@testing-library/react';
import { SWRConfig } from 'swr';

import AgeGuesserSWR from './AgeGuesserSWR';

const createWrapper =
  () =>
  ({ children }) =>
    <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>;

describe('AgeGuesserSWQ', () => {
  it('should return loading state', async () => {
    const { getByText } = render(<AgeGuesserSWR name="marie" />, {
      wrapper: createWrapper()
    });

    expect(getByText('...')).toBeVisible();
  });
});
