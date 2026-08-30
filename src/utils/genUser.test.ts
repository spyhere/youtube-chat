import { describe, expect, it } from "vitest";
import { genUser } from ".";
import { USERNAME_PROBS } from "../constants";

const { MIN_LEN, MAX_LEN, NUM_MAX } = USERNAME_PROBS
describe("genUser", () => {
  it("should have expected length", () => {
    const { username } = genUser()
    expect(username.length).toBeGreaterThanOrEqual(MIN_LEN)
    expect(username.length).toBeLessThanOrEqual(MAX_LEN + NUM_MAX)
  })
})

