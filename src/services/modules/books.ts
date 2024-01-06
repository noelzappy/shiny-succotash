import { transformResponse } from "../../utils/transformData";
import { api } from "../api";

export const booksApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBooks: build.query<any, { page?: number; pageSize?: number }>({
      query: ({ page = 1, pageSize = 20 }) => ({
        url: "/books",
        params: {
          page,
          pageSize,
        },
      }),
      transformResponse,
    }),

    getBook: build.query<any, number>({
      query: (id: number) => ({
        url: `/books/${id}`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetBookQuery } = booksApi;
