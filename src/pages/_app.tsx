import "../styles/tailwind.css";
import { AppProps } from "next/app";
// import { jssPreset } from "@material-ui/core/styles";
// import { create } from "jss";
// import jssExtend from "jss-plugin-extend";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "app/apollo";

// const jss = create({
//   ...jssPreset(),
//   plugins: [...jssPreset().plugins, jssExtend()],
//   insertionPoint: document.getElementById("jss-insertion-point"),
// });

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
