import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { genLorem } from "./loremGen";

const origRandom = Math.random

describe("genLorem", () => {
  beforeAll(() => {
    Math.random = () => 0
  })
  afterAll(() => {
    Math.random = origRandom
  })
  it("chould correctly chop lorem", () => {
    expect(genLorem(2)).toBe("Nam scelerisque.")
    expect(genLorem(6)).toBe("Nam scelerisque in nisl sed feugiat.")
    expect(genLorem(7)).toBe("Nam scelerisque in nisl sed feugiat. Aliquam.")
  })
})

