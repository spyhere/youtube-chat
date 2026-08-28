type Props = {
  username: string
  avatar: string
  message: string
}

export function Message(props: Props) {
  return (
    <div class="group opacity-0 animate-fade-in flex items-start text-[13px] py-1 px-6 pr-0 hover:bg-black/5 cursor-pointer rounded">
      <div class="shrink-0 mr-3">
        <img class="h-6 w-6 rounded-full aspect-square object-cover" src={props.avatar} alt="Avatar" />
      </div>

      <div class="flex grow overflow-hidden text-black mr-0.5">
        <div class="grow">
          <span class="font-bold mr-2 text-neutral-800/60">@{props.username}</span>
          <span class="wrap-break-word">{props.message}</span>
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
