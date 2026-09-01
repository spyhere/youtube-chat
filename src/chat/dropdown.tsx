import { Mode } from "."
import { clickOutside } from "../directives"

type Props = {
  mode: Mode
  onClick: (flag: boolean) => void
  onChangeMode: (mode: Mode) => void
}

export function Dropdown(props: Props) {
  return (
    <div
      use:clickOutside={() => props.onClick(false)}
      class="absolute w-[calc(100%-(--spacing(2)))] h-42.5 bg-white z-10 rounded-lg"
      style="box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px, rgba(0, 0, 0, 0.2) 0px 3px 1px -2px"
      onClick={[props.onClick, false]}
    >
      <div class="flex flex-col h-full py-2">
        <div
          class="flex flex-col grow justify-center px-4 hover:bg-black/20 active:bg-black/28 transition cursor-pointer"
          classList={{ "bg-black/28": props.mode === "chat" }}
          onClick={[props.onChangeMode, "chat"]}
        >
          <span class="text-[14px]">Chat</span>
          <span class="text-[12px] text-zinc-900/60">All messages are visible</span>
        </div>
        <div
          class="flex flex-col grow justify-center px-4 hover:bg-black/20 active:bg-black/28 transition cursor-pointer"
          classList={{ "bg-black/28": props.mode === "participants" }}
          onClick={[props.onChangeMode, "participants"]}
        >
          <span class="text-[14px]">Participants</span>
          <span class="text-[12px] text-zinc-900/60">All users that are in this chat</span>
        </div>
      </div>
    </div>
  )
}

