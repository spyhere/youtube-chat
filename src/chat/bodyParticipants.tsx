import { createVirtualizer } from "@tanstack/solid-virtual"
import type { ParticipantT } from "."
import { For } from "solid-js"
import { Participant } from "./participant"

type Props = {
  participants: ParticipantT[]
}
export function BodyParticipants(props: Props) {
  let scrollElementRef!: HTMLDivElement

  const virtualizer = createVirtualizer({
    get count() {
      return props.participants.length
    },
    getScrollElement: () => scrollElementRef,
    estimateSize: () => 80,
    getItemKey: index => props.participants[index].username,
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
        [&::-webkit-scrollbar-thumb]:min-h-7.5"
        ref={scrollElementRef}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            position: "relative",
            width: "100%"
          }}
        >
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
                <Participant
                  user={props.participants[it.index]}
                />
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  )
}

