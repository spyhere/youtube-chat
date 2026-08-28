import { CHAR, USERNAME_PROBS } from "../constants";

export function genUsername(): string {
  const { MIN_LEN, MAX_LEN, NUM_PROBS } = USERNAME_PROBS
  const len = Math.max(Math.round(Math.random() * (MAX_LEN - MIN_LEN)) + MIN_LEN, MIN_LEN)
  let numLen = 0
  if (Math.random() <= NUM_PROBS) {
    numLen = Math.round(Math.random() * 5)
  }

  const { LOW_START, LOW_END } = CHAR.LAT
  const res = new Array<string>(len + numLen)
  for (let i = 0; i < len + numLen; i++) {
    if (i < len) {
      const c = Math.round(Math.random() * (LOW_END - LOW_START)) + LOW_START
      res.push(String.fromCharCode(c))
    } else {
      res.push(String(Math.round(Math.random() * 10)))
    }
  }
  return res.join("")
}

