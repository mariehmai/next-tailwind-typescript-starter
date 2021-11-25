import React from 'react';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@testing-library/react-hooks';
import { render, cleanup } from '@testing-library/react';
import { act } from 'react-test-renderer';

import AgeGuesserRQ from './AgeGuesserRQ';

const useGetAge = () => {
  return useQuery('marie', () => ({
    age: 60
  }));
};

const createWrapper = () => {
  const queryClient = new QueryClient();

  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return wrapper;
};

describe('useGetAge', () => {
  it('should return age when state is loaded', async () => {
    const { result, waitFor } = renderHook(() => useGetAge(), {
      wrapper: createWrapper()
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual({ age: 60 });
  });
});

describe('AgeGuesserRQ component', () => {
  it('should return loading state', async () => {
    const { getByText } = render(<AgeGuesserRQ name="marie" />, {
      wrapper: createWrapper()
    });

    expect(getByText('...')).toBeVisible();
  });

  it('should return age found state', async () => {
    const wrapper = createWrapper();

    const { result, waitFor } = renderHook(() => useGetAge(), {
      wrapper
    });

    await act(async () => {
      await waitFor(() => result.current.isSuccess);
      const { getByText } = render(<AgeGuesserRQ name="marie" />, {
        wrapper
      });

      expect(getByText('60')).toBeVisible();
      cleanup();
    });
  });

  it('should return age not found state', async () => {
    const useGetAgeNotFound = () => {
      return useQuery('marie', () => ({
        age: null
      }));
    };

    const wrapper = createWrapper();

    await act(async () => {
      const { result, waitFor } = renderHook(() => useGetAgeNotFound(), {
        wrapper
      });

      await waitFor(() => result.current.isSuccess);

      const { getByText } = render(<AgeGuesserRQ name="marie" />, {
        wrapper
      });

      expect(getByText('🤷🏻‍♀️')).toBeVisible();
      cleanup();
    });
  });
});
