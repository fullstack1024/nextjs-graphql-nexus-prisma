import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import 'antd/dist/antd.css'
import '@/styles/global.css'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "/api/graphql",
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
