import { ParticipantT } from "."

type Props = {
  user: ParticipantT
}

export function Participant(props: Props) {
  return (
    <div class="group opacity-0 animate-fade-in flex items-start py-1 px-6 pr-0 hover:bg-black/5 cursor-pointer rounded">
      <div class="shrink-0 mr-3 my-auto">
        <img class="h-7 w-7 rounded-full aspect-square object-cover" src={props.user.avatar} alt="Avatar" />
      </div>

      <div class="flex grow overflow-hidden text-[15px]  text-black mr-0.5">
        <div class="grow content-center">
          <span class="font-bold mr-2 text-neutral-800/60">@{props.user.username}</span>
          <span>0</span>
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

