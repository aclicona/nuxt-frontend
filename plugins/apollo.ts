import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {

  // Error handling
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      })
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`)
    }
  })

  // Auth handling


  const httpLink = new HttpLink({
    uri: (process.env.BACKEND_API_URL as string) || 'http://localhost:8000/graphql',
  })

  const apolloClient = new ApolloClient({
    link: errorLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  })

  nuxtApp.vueApp.provide('apollo', apolloClient)
  nuxtApp.provide('apollo', apolloClient)

  return {
    provide: {
      apollo: apolloClient
    }
  }
})