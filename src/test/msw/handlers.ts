import { http, HttpResponse } from "msw"

// Add MSW request handlers here.
// These intercept real network requests in tests — no mocking fetch manually.
//
// Example:
// http.get("https://api.github.com/users/:username", ({ params }) => {
//   return HttpResponse.json({ login: params.username, public_repos: 10 })
// }),

export const handlers = [
  http.get("https://api.github.com/users/:username", ({ params }) => {
    return HttpResponse.json({
      login: params.username,
      public_repos: 42,
      followers: 100,
      following: 50,
      public_gists: 5,
    })
  }),

  http.get("https://api.github.com/users/:username/repos", () => {
    return HttpResponse.json([])
  }),
]
