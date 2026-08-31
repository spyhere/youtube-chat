import { onCleanup, onMount } from "solid-js"
import { CHAT_PROBS, MESSAGE_SIZE, OWNER_AVATAR } from "../constants"
import { Body } from "./body"
import { Footer } from "./footer"
import { Header } from "./header"
import { createStore } from "solid-js/store"
import { genLorem, getMessageLen, genUser, destroyUser } from "../utils"
import { prepare, PreparedText } from "@chenglou/pretext"

export type Participant = {
  username: string
  avatar: string
}

export type MessageT = {
  avatar: string
  id: number
  text: string
  prepared: PreparedText
  username: string
}

export function Chat() {
  const [participants, setParticipants] = createStore<Participant[]>([genUser(), genUser(), genUser(), genUser()])
  const [messages, setMessages] = createStore<MessageT[]>([])
  const onSubmit = (input: string) => {
    setMessages(messages.length, {
      id: messages.length,
      avatar: OWNER_AVATAR,
      prepared: prepare(input, MESSAGE_SIZE),
      text: input,
      username: "Me",
    })
  }

  onMount(() => {
    let timer: ReturnType<typeof setTimeout>
    const produceMessage = () => {
      timer = setTimeout(() => {
        if (participants.length == 0) {
          produceMessage()
          return
        }
        const user = participants[Math.floor(Math.random() * participants.length)]
        const msg = genLorem(getMessageLen())
        setMessages(messages.length, {
          id: messages.length,
          avatar: user.avatar,
          prepared: prepare(msg, MESSAGE_SIZE),
          text: msg,
          username: user.username,
        })
        produceMessage()
      }, Math.random() * CHAT_PROBS.MESSAGE_FREQ)
    }
    produceMessage()
    onCleanup(() => clearTimeout(timer))

    let joinTimer: ReturnType<typeof setTimeout>
    const joinUser = () => {
      joinTimer = setTimeout(() => {
        if (participants.length >= CHAT_PROBS.MAX_PARTICIPANTS) {
          joinUser()
          return
        }
        const decidedToJoin = Math.random() <= CHAT_PROBS.JOIN
        if (!decidedToJoin) {
          joinUser()
          return
        }
        setParticipants(participants.length, genUser())
        joinUser()
      }, Math.random() * CHAT_PROBS.JOIN_FREQ)
    }
    joinUser()
    onCleanup(() => clearTimeout(joinTimer))

    let leaveTimer: ReturnType<typeof setTimeout>
    const kickUser = () => {
      leaveTimer = setTimeout(() => {
        const decidedToLeave = Math.random() <= CHAT_PROBS.LEAVE
        if (!decidedToLeave || participants.length < CHAT_PROBS.MIN_PARTICIPANTS) {
          kickUser()
          return
        }
        const index = Math.round(Math.random() * participants.length)
        destroyUser(participants[index])
        setParticipants(arr => arr.filter((_, idx) => idx != index))
        kickUser()
      }, Math.random() * CHAT_PROBS.LEAVE_FREQ)
    }
    kickUser()
    onCleanup(() => clearTimeout(leaveTimer))
  })

  return (
    <div class="w-100 h-150 bg-white flex flex-col rounded-lg border border-black/20">
      <Header />
      <div class="flex flex-1 flex-col">
        <div class="h-px w-full bg-black/20" />
        <div class="flex-1 relative">
          <Body
            messages={messages}
          />
        </div>
        <div class="border-t border-black/20">
          <Footer onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  )
}
