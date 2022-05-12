import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo-client";
import { audiLightTheme, AudiPlatformProvider } from '@audi/audi-ui-react'

function MyApp({ Component, pageProps }) {
  return (
    <AudiPlatformProvider theme={audiLightTheme}>
      <ApolloProvider client={client}>    
          <Component {...pageProps} />
      </ApolloProvider>
    </AudiPlatformProvider>
  )
}

export default MyApp
