import { InMemoryCache } from "@apollo/client";
import { typePolicyFields as basicFields } from "./local/basic/mutations";
// import { typePolicyFields as mainFields } from "./local/main/mutations";
// import { typePolicyFields as authFields } from "./local/auth/mutations";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        ...basicFields,
        // ...mainFields,
        // ...authFields,
      },
    },
  },
});
