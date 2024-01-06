export function transformResponse<T>(res: T, meta: any) {
  const links = meta.response.headers.get("Link");
  const next = links
    ?.split(",")
    .find((link: any) => link.includes('rel="next"'));
  const lastPage = links
    ?.split(",")
    .find((link: any) => link.includes('rel="last"'));

  const lastPageNumber = lastPage.split("page=").pop().split("&")[0];
  const nextPageNumber = next?.split("page=").pop()?.split("&")[0] || undefined;

  return {
    res,
    meta: {
      nextPage: next ? parseInt(nextPageNumber) : 1,
      lastPage: lastPage ? parseInt(lastPageNumber) : 1,
    },
  };
}
