import { createSignal, For, onCleanup, onMount } from "solid-js";
import { createVirtualizer } from "@tanstack/solid-virtual"
import { layout } from "@chenglou/pretext";
import type { MessageT } from ".";
import { Message } from "./message";
import { FOLLOW_THRESHOLD } from "../constants";
import { throttle } from "../utils";

type Props = {
  messages: MessageT[]
}

const LINE_HEIGHT = 19

export function BodyMessages(props: Props) {
  let scrollElementRef!: HTMLDivElement
  let innerScroll!: HTMLDivElement
  // NOTE: when making the chat resizable make these numbers responsive
  const scrollWidth = 355 - 24
  // NOTE: Try virtua js as well
  const virtualizer = createVirtualizer({
    get count() {
      return props.messages.length
    },
    getScrollElement: () => scrollElementRef,
    estimateSize: index =>
      layout(props.messages[index].prepared, scrollWidth, LINE_HEIGHT).height + 8,
    getItemKey: index => props.messages[index].id,
    overscan: 2
  })

  const isAtBottom = () => {
    const el = virtualizer.scrollElement
    if (!el) {
      return false
    }
    if (el.scrollHeight === el.clientHeight) {
      return false
    }
    return el.scrollHeight - el.scrollTop - el.clientHeight < FOLLOW_THRESHOLD
  }

  // HACK: Can't find a better way to make new messages appear from bottom when chat is empty
  let isChatFull = false
  const checkIsChatFull = () => {
    if (isChatFull) {
      return true
    }
    const el = virtualizer.scrollElement
    if (!el) {
      return false
    }
    if (virtualizer.getTotalSize() <= el.clientHeight) {
      return false
    }
    isChatFull = true
    return true
  }

  const handleFollowChatClick = () => {
    // NOTE: "instant" is safer, with smooth the height of container can change mid air, so it won't reach the end and stick
    virtualizer.scrollToEnd({ behavior: "instant" })
  }

  const [isFollowing, setIsFollowing] = createSignal(true)

  // NOTE: Height transition is 200ms, so throttled functions are being called only 2 times
  const TIMEOUT = 100
  onMount(() => {
    const scrollToEndThrottled = throttle(virtualizer.scrollToEnd, TIMEOUT)
    const ro = new ResizeObserver((_: ResizeObserverEntry[]) => {
      if (isFollowing()) {
        scrollToEndThrottled()
      }
    })
    ro.observe(innerScroll)

    const onScrollThrottled = throttle((_: Event) => setIsFollowing(isAtBottom()), TIMEOUT)
    scrollElementRef.addEventListener("scroll", onScrollThrottled)
    onCleanup(() => {
      scrollElementRef.removeEventListener("scroll", onScrollThrottled)
      ro.unobserve(innerScroll)
    })
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
        style={!checkIsChatFull() ? { "justify-content": "flex-end" } : {}}
        ref={scrollElementRef}
      >
        <div
          ref={innerScroll}
          style={{
            flex: "none",
            height: `${virtualizer.getTotalSize()}px`,
            position: 'relative',
            transition: "height 200ms ease-out",
            "overflow-y": "clip",
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
                  avatar={props.messages[it.index].avatar}
                  message={props.messages[it.index].text}
                  username={props.messages[it.index].username}
                />
              </div>
            )}
          </For>
        </div>
      </div>
      <button
        onClick={handleFollowChatClick}
        class="absolute bottom-0 p-1 bg-blue-500 shadow-md/20 mb-2 rounded-[50%] fill-white cursor-pointer left-1/2 -translate-x-1/2 transition-transform ease-out delay-200 duration-100"
        style={!isFollowing() ? { transform: "translateY(0)" } : { transform: "translateY(40px)" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M12 3a1 1 0 00-1 1v13.586l-5.293-5.293a1 1 0 10-1.414 1.414L12 21.414l7.707-7.707a1 1 0 10-1.414-1.414L13 17.586V4a1 1 0 00-1-1Z"></path></svg>
      </button>
    </div>
  )
}
