import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://jobs-apply-backend-24.onrender.com/graphql",
  cache: new InMemoryCache(),
});
