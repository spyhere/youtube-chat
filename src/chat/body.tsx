import { Message } from "./message";
import { createMemo, For } from "solid-js";
import { createVirtualizer } from "@tanstack/solid-virtual"
import { layout, prepare } from "@chenglou/pretext";

type Props = {
  messages: { id: number, username: string, text: string }[]
}

const LINE_HEIGHT = 19

export function Body(props: Props) {
  let scrollElementRef!: HTMLDivElement
  // NOTE: when making the chat resizable make these numbers responsive
  const scrollWidth = 355 - 24

  const textHandle = createMemo(() => props.messages.map(it => prepare(it.text, "13px Roboto")))

  // NOTE: Try virtua js as well
  const virtualizer = createVirtualizer({
    get count() {
      return props.messages.length
    },
    getScrollElement: () => scrollElementRef,
    estimateSize: index =>
      layout(textHandle()[index], scrollWidth, LINE_HEIGHT).height + 8,
    getItemKey: index => props.messages[index].id,
    followOnAppend: "smooth",
    anchorTo: "end",
    scrollEndThreshold: 80,
    overscan: 2
  })

  return (
    <div class="flex flex-col absolute bottom-0 h-full w-full  text-white overflow-hidden">
      <div
        class="flex flex-col flex-1 overflow-y-auto min-h-0 space-y-1
        [&::-webkit-scrollbar]:w-4.75 
        [&::-webkit-scrollbar-thumb]:bg-gray-400 
        [&::-webkit-scrollbar-thumb]:border-2
        [&::-webkit-scrollbar-thumb]:border-solid 
        [&::-webkit-scrollbar-thumb]:min-h-7.5
        "
        ref={scrollElementRef}
      >
        <div
          style={{
            flex: "none",
            height: `${virtualizer.getTotalSize()}px`,
            position: 'relative',
            width: '100%',
          }}>
          <For each={virtualizer.getVirtualItems()}>
            {it => (
              <div
                // BUG: Tanstack "data-index" bug - https://github.com/TanStack/virtual/issues/930
                ref={(el) => queueMicrotask(() => virtualizer.measureElement(el))}
                data-index={it.index}
                style={{
                  position: 'absolute',
                  transform: `translateY(${it.start}px)`,
                  width: '100%',
                }}
              >
                <Message
                  avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRebMyeUntdaLB8BSH2TWx3GcPoCUzBww7rZFXe2wi5GQ&s=10"
                  message={props.messages[it.index].text}
                  username={props.messages[it.index].username}
                />
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  )
}
