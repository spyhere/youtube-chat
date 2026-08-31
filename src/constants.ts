export const OWNER_AVATAR = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZf3Xlgb6dIbE9wUkxoK0xdEQ3VMzdaYTviCM96GHFSA&s=10"

export const MESSAGE_SIZE = "13px Roboto"

export const MARKS_PROB = {
  _NONE: 0.85,
  _DOT: 0.1,
  _QUESTION: 0.04,
  _MULTIPLE_QUESTIONS: 0.01,
  MAX_QUESTION: 5,
  MULTIPLE_QUESTIONS: function() {
    return this._MULTIPLE_QUESTIONS
  },
  QUESTION: function() {
    return this._MULTIPLE_QUESTIONS + this._QUESTION
  },
  DOT: function() {
    return this._MULTIPLE_QUESTIONS + this._QUESTION + this._DOT
  }
}

export const CHAR = {
  LAT: {
    LOW_START: 97,
    LOW_END: 122
  },
}

export const MESSAGE_PROBS = {
  SHORT: {
    PROB: 0.15,
    LEN: 7
  },
  LONG: {
    PROB: 0.03,
    LEN: 80
  }
}

export const USERNAME_PROBS = {
  MIN_LEN: 4,
  MAX_LEN: 10,
  NUM_PROBS: 0.80,
  NUM_MAX: 5
}

export const CHAT_PROBS = {
  MAX_PARTICIPANTS: 12,
  MIN_PARTICIPANTS: 2,
  JOIN: 0.3,
  LEAVE: 0.2,
  MESSAGE_FREQ: 3500,
  JOIN_FREQ: 5000,
  LEAVE_FREQ: 6000
}

