// import firebaseService from "app/services/firebaseService";
import { ApolloClient, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { cache } from "./cache";
// import { ApolloServer } from "app/constants/urls";

// const httpLink = createHttpLink({
//   uri: ApolloServer, // TODO server url
// });

// const authLink = setContext(async (_, { headers }) => {
//   const token =
//     !!firebaseService.auth &&
//     !!firebaseService.auth.currentUser &&
//     (await firebaseService.auth.currentUser.getIdToken(true));

//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });
// TODO uncomment above if auth added

export function createApolloClient() {
  return new ApolloClient({
    // link: authLink.concat(httpLink),
    cache,
    connectToDevTools: process.env.NODE_ENV !== "production",
  });
}