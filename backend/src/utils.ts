import { Query } from "./types";

export const getURL = (urlValue: string, queries: Query[]) => {
  const url = new URL(urlValue);

  for (let query of queries) {
    url.searchParams.set(query.name, query.value);
  }
  return url;
};
