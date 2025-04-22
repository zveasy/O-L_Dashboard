import { useMemo } from 'react';

// third-party
import useSWR, { mutate } from 'swr';

// project-imports
import { fetcher } from 'utils/axios';

// types
import { Address } from 'types/e-commerce';

// ==============================|| API - ADDRESS ||============================== //

const endpoints = {
  key: 'api/address',
  list: '/list', // server URL
  insert: '/new', // server URL
  update: '/edit', // server URL
  delete: '/delete' // server URL
};

export function useGetAddress() {
  const { data, isLoading, error, isValidating } = useSWR(endpoints.key + endpoints.list, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      address: data?.address as Address[],
      addressLoading: isLoading,
      addressError: error,
      addressValidating: isValidating,
      addressEmpty: !isLoading && !data?.address?.length
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function updateAddress(addressId: string | number | undefined, updatedAddress: Address) {
  // to update local state based on key
  mutate(
    endpoints.key + endpoints.list,
    (currentAddress: any) => {
      const newAddress: Address[] = currentAddress.address.map((address: Address) =>
        address.id === addressId ? { ...address, ...updatedAddress } : address
      );

      return {
        ...currentAddress,
        address: newAddress
      };
    },
    false
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { list: updatedAddress };
  //   await axios.post(endpoints.key + endpoints.update, data);
}
