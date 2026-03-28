import { renderHook } from "@testing-library/react"
import { useSession } from "next-auth/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { useUser } from "@/hooks/useUser"

vi.mock("next-auth/react")

const mockUseSession = vi.mocked(useSession)

describe("useUser", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("returns null when there is no session", () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: "unauthenticated",
      update: vi.fn(),
    })

    const { result } = renderHook(() => useUser())

    expect(result.current).toBeNull()
  })

  it("returns null while the session is loading", () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: "loading",
      update: vi.fn(),
    })

    const { result } = renderHook(() => useUser())

    expect(result.current).toBeNull()
  })

  it("returns the user when authenticated", () => {
    const mockUser = {
      name: "Test User",
      email: "test@example.com",
      image: "https://avatars.githubusercontent.com/test",
    }

    mockUseSession.mockReturnValue({
      data: { user: mockUser, expires: "2099-01-01" },
      status: "authenticated",
      update: vi.fn(),
    })

    const { result } = renderHook(() => useUser())

    expect(result.current).toEqual(mockUser)
  })
})
