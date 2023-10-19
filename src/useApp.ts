
import { ApolloClient, InMemoryCache, } from '@apollo/client';

const useApp = () => {
const client = new ApolloClient({
    uri: process.env.REACT_APP_API_ENDPOINT_URL,
    cache: new InMemoryCache()
  });

  return {
    client
  }
}

  export default useApp;