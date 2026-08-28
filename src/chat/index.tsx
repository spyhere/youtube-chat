import { OWNER_AVATAR } from "../constants"
import { Body } from "./body"
import { Footer } from "./footer"
import { Header } from "./header"
import { createStore } from "solid-js/store"

export type MessageT = {
  id: number
  username: string
  text: string
  avatar: string
}

export function Chat() {
  const [messages, setMessages] = createStore<MessageT[]>([])
  const onSubmit = (input: string) => {
    setMessages(messages.length, {
      id: messages.length,
      avatar: OWNER_AVATAR,
      username: "Me",
      text: input
    })
  }

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
