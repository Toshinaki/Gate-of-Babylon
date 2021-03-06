import { InMemoryCache } from "@apollo/client";
import mainFields from "./main";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        ...mainFields,
      },
    },
  },
});
