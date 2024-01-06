import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.anapioficeandfire.com/api",
  }),
  endpoints: (builder) => ({}),
});
