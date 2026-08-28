import { MESSAGE_PROBS } from "./constants"

export const getMessageLen = () => {
  const { SHORT, LONG } = MESSAGE_PROBS
  const maxLen = LONG.LEN
  const k = Math.random()
  if (k < SHORT.PROB) {
    return Math.max(Math.round(Math.random() * SHORT.LEN), 1)
  }
  if (k < SHORT.PROB + LONG.PROB) {
    return Math.min(Math.round((Math.random() + Math.random()) / 2 * maxLen) + 12, maxLen)
  }
  return Math.max(Math.round((Math.random() + Math.random()) / 2 * 35) - 5, SHORT.LEN)
}
