import { useMemo } from "react";
import { ApolloClient } from "@apollo/client";
import { cache } from "./cache";
// import { setContext } from "@apollo/client/link/context";
// import { HttpLink } from "@apollo/client/link/http";
// import { ApolloServer } from "app/constants/urls";

let apolloClient;

export function createApolloClient() {
  return new ApolloClient({
    uri: "",
    cache,
    // connectToDevTools: process.env.NODE_ENV !== "production",
    connectToDevTools: true,
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
