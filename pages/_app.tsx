import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import 'antd/dist/antd.css'
import '@/styles/global.css'

const httpLink = createHttpLink({
  uri: '/api/graphql'
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
