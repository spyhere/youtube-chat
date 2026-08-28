import { describe, expect, it } from "vitest";
import { genUsername } from "./genUsername";
import { USERNAME_PROBS } from "../constants";

const { MIN_LEN, MAX_LEN, NUM_MAX } = USERNAME_PROBS
describe("genUsername", () => {
  it("should have expected length", () => {
    const randUsername = genUsername()
    expect(randUsername.length).toBeGreaterThanOrEqual(MIN_LEN)
    expect(randUsername.length).toBeLessThanOrEqual(MAX_LEN + NUM_MAX)
  })
})

