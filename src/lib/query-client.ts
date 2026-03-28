import { QueryClient } from "@tanstack/react-query"

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  })
}

// Browser singleton — reuse the same client across renders to preserve cache.
// On the server, always create a new instance to avoid sharing state between requests.
let browserQueryClient: QueryClient | undefined

export function getQueryClient(): QueryClient {
  if (typeof window === "undefined") return makeQueryClient()
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}
