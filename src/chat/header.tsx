export function Header() {
  return (
    <div class="h-12 p-2 flex items-center justify-center">
      <div class="flex ml-4 flex-1">
        <div class="cursor-pointer">Top chat</div>
        <div class="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            aria-hidden="true"
            style="pointer-events: none; display: inherit; width: 100%; height: 100%;">
            <path d="M18.707 8.793a1 1 0 00-1.414 0L12 14.086 6.707 8.793a1 1 0 10-1.414 1.414L12 16.914l6.707-6.707a1 1 0 000-1.414Z"></path>
          </svg>
        </div>
      </div>

      <div class="flex">
        <button class="flex items-center h-6 text-[12px]/[24px] px-1.75 border rounded-xl border-black/20 hover:bg-black/20 active:bg-black/28 transition cursor-pointer">
          <div class="w-3 h-3 mr-1">
            <div class="w-full h-full block fill-violet-700">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;">
                <path d="M12 2a1.5 1.5 0 00-1.296 2.253L7.64 9.617 3.996 7.432A1.498 1.498 0 102.19 8.967l1.833 8.25A1 1 0 005 18h14a1 1 0 00.977-.783l1.833-8.249a1.499 1.499 0 10-1.807-1.536l-3.642 2.185-3.065-5.364A1.5 1.5 0 0012 2Zm7 18H5a1 1 0 000 2h14a1 1 0 000-2Z">
                </path>
              </svg>
            </div>
          </div>
          <div class="text-ellipsis overflow-hidden text-[12px]/[24px] font-medium">0XP</div>
        </button>
      </div>

      <div>
        <button class="h-10 w-10 rounded-full flex items-center justify-center hover:bg-black/20 active:bg-black/28 transition cursor-pointer">
          <div class="h-6 w-6 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;">
              <path d="M12 4a2 2 0 100 4 2 2 0 000-4Zm0 6a2 2 0 100 4 2 2 0 000-4Zm0 6a2 2 0 100 4 2 2 0 000-4Z"></path>
            </svg>
          </div>
        </button>
      </div>

      <div>
        <button class="h-10 w-10 rounded-full flex items-center justify-center hover:bg-black/20 active:bg-black/28 transition cursor-pointer">
          <div class="h-6 w-6 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;">
              <path d="M17.293 5.293 12 10.586 6.707 5.293a1 1 0 10-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 001.414 1.414L12 13.414l5.293 5.293a1 1 0 001.414-1.414L13.414 12l5.293-5.293a1 1 0 10-1.414-1.414Z"></path>
            </svg>
          </div>
        </button>
      </div>
    </div>
  )
}
