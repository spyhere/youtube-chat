import { Body } from "./body"
import { Footer } from "./footer"
import { Header } from "./header"

const messages = [
  { id: 1, username: "Username1", text: "Hello! This is a replicated YouTube chat message. sdsdsdsd sd sds sd sd sds ds dsdadasd asd asd asd asd asd asd " },
]

export function Chat() {
  const onSubmit = (input: string) => {
    console.log('input: ', input);
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
