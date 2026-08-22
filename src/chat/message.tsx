export function Message() {
  return (
    <div class="group flex items-start text-[13px] py-1 px-6 pr-0 hover:bg-black/5 cursor-pointer rounded">
      <div class="shrink-0 mr-3">
        <img class="h-6 w-6 rounded-full aspect-square object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRebMyeUntdaLB8BSH2TWx3GcPoCUzBww7rZFXe2wi5GQ&s=10" alt="Avatar" />
      </div>

      <div class="flex overflow-hidden text-black mr-0.5">
        <div>
          <span class="font-bold mr-2 text-neutral-800/60">@Username</span>
          <span class="wrap-break-word">Hello! This is a replicated YouTube chat message. sdsdsdsd sd sds sd sd sds ds dsdadasd asd asd asd asd asd asd </span>
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
