import { useCallback, useEffect, useRef, useState } from "react";

type useInfiniteQueryResult<T> = {
  data: T;
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  refetch: () => void;
  trigger: (params: any) => void;
  nextPage: number;
  lastPage: number;
  hasPreviousPage: boolean;
  fetchPreviousPage: () => void;
  currentPage: number;
  fetchPage: (page: number) => void;
};

function useInfiniteQuery<T>(
  endpoint: any,
  params = { page: 1 }
): useInfiniteQueryResult<T> {
  const nextPage = useRef<number>(null);
  const lastPage = useRef<number>(null);
  const [pages, setPages] = useState<any>(undefined);
  const [trigger, result] = endpoint.useLazyQuery();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // @ts-ignore
    nextPage.current = params.page;
    // @ts-ignore
    lastPage.current = params.page;

    trigger(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = async (p: any) => {
    setLoading(true);
    await trigger(p);
    setLoading(false);
  };

  const getPageParams = useCallback(
    (data: any) => ({
      nextPage: data?.meta?.nextPage || undefined,
      lastPage: data?.meta?.lastPage || undefined,
    }),
    []
  );

  useEffect(() => {
    if (!result.isSuccess) return;
    // @ts-ignore
    nextPage.current = getPageParams(result.data).nextPage;
    // @ts-ignore
    lastPage.current = getPageParams(result.data).lastPage;
    setPages([...result.data?.res]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  return {
    ...result,
    data: pages,
    isLoading: (result.isFetching && pages === undefined) || loading,
    hasNextPage:
      nextPage.current !== undefined &&
      nextPage.current !== null &&
      nextPage.current !== lastPage.current,
    fetchNextPage() {
      if (nextPage.current !== undefined) {
        trigger({ ...params, page: nextPage.current });
      }
    },
    refetch() {
      trigger(params);
    },
    trigger: load,
    isFetchingNextPage: result.isFetching && pages !== undefined,
    nextPage: nextPage.current !== undefined ? nextPage.current : 1,
    lastPage: lastPage.current !== undefined ? lastPage.current : 1,
    hasPreviousPage:
      nextPage.current !== undefined && (nextPage.current as number) - 1 > 1,
    fetchPreviousPage() {
      if (lastPage.current !== undefined) {
        trigger({ ...params, page: lastPage.current });
      }
    },
    currentPage:
      nextPage.current !== undefined ? (nextPage.current as number) - 1 : 1,
    fetchPage(page) {
      trigger({ ...params, page });
    },
  };
}

export default useInfiniteQuery;
