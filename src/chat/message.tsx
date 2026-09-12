import { Show } from "solid-js"
import type { MessageT } from "."

type Props = {
  message: MessageT
  scrollToMsg: (idx: number, prevIdx: number) => void
}

export function Message(props: Props) {
  const { message } = props
  return (
    <div class="group opacity-0 animate-fade-in flex items-start text-[13px] py-1 px-6 pr-0 hover:bg-black/5 cursor-pointer rounded">
      <div class="shrink-0 mr-3">
        <img class="h-6 w-6 rounded-full aspect-square object-cover" src={message.avatar} alt="Avatar" />
      </div>

      <div class="flex grow overflow-hidden text-black mr-0.5">
        <div class="grow">
          <Show
            when={message.refText}
            fallback={
              <>
                <span class="font-bold mr-2 text-neutral-800/60">@{message.username}</span>
                <span class="wrap-break-word">{message.text}</span>
              </>
            }
          >
            <div>
              <span class="font-bold mr-2 text-neutral-800/60">@{message.username}</span>
              <span class="inline-block w-2.5 h-2.5 mr-2">
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 1H12L16 5L12 9H11V6H5C3.34315 6 2 7.34315 2 9C2 10.6569 3.34315 12 5 12H12V14H5C2.23858 14 0 11.7614 0 9C0 6.23858 2.23858 4 5 4H11V1Z" fill="#000000"></path> </g></svg>
              </span>
              <span class="inline-block font-bold mr-2 text-[10px] text-neutral-800/60">@{message.refUser}</span>
              <span
                class="block ml-1 p-0.5 rounded-sm text-[10px] wrap-break-word italic text-neutral-800/60 hover:bg-black/8"
                onClick={() => props.scrollToMsg(message.refId!, message.id)}
              >
                [{message.refText}]
              </span>
            </div>
            <span class="wrap-break-word">{message.text}</span>
          </Show>
        </div>

        <div class="invisible group-hover:visible">
          <button class="h-10 w-10 rounded-full flex justify-center items-center transition cursor-pointer active:bg-black/20">
            <div class="h-6 w-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;">
                <path d="M12 4a2 2 0 100 4 2 2 0 000-4Zm0 6a2 2 0 100 4 2 2 0 000-4Zm0 6a2 2 0 100 4 2 2 0 000-4Z"></path>
              </svg>
            </div>
          </button>
        </div>
      </div>

    </div>
  )
}
