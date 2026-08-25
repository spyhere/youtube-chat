import { createSignal, onCleanup, onMount, Show } from "solid-js"

export function Footer() {
  let editableRef!: HTMLDivElement
  let wrapperRef!: HTMLDivElement
  const [inputCount, setInputCount] = createSignal(0)

  const onInput = (e: InputEvent) => {
    const input = (e.currentTarget as HTMLDivElement).textContent
    setInputCount(input.length)
  }

  // Forced hack since stupid contenteditable cannot lose focus when clicking outside, it moves caret instead.
  onMount(() => {
    const handleDocumentMouseDown = (e: MouseEvent) => {
      if (
        document.activeElement === editableRef &&
        !wrapperRef.contains(e.target as Node)
      ) {
        // This makes the browser stop moving the caret
        e.preventDefault();
        editableRef.blur();
      }
    };

    // useCapture "true" makes this fire earlier than anything from DOM Tree
    document.addEventListener("mousedown", handleDocumentMouseDown, true);
    onCleanup(() => {
      document.removeEventListener("mousedown", handleDocumentMouseDown, true);
    });
  });

  const hasInput = () => inputCount() > 0
  return (
    <div class="flex flex-row items-center px-6 py-1.5 text-[14px]">
      <Show when={hasInput()}>
        <img class="h-6 w-6 mr-3 rounded-full aspect-square object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZf3Xlgb6dIbE9wUkxoK0xdEQ3VMzdaYTviCM96GHFSA&s=10" alt="Avatar" />
      </Show>
      <div
        style={hasInput() ? { "border-radius": "8px" } : {}}
        class="flex-1 flex items-center justify-end flex-wrap bg-black/5 rounded-[18px] pl-3 transition-[border-radius] ease-out duration-200"
      >
        <div
          class="relative flex grow shrink cursor-text"
          ref={wrapperRef}
        >
          <Show when={!hasInput()}>
            <label class="absolute py-0.5 text-[14px] text-zinc-900/60 cursor-text pointer-events-none">Chat...</label>
          </Show>
          <div
            class="mr-3 max-h-9 min-h-4 w-full outline-none caret-black overflow-x-hidden overflow-y-auto break-all"
            contentEditable
            onInput={onInput}
            ref={editableRef}
          ></div>
        </div>
        <div class="ml-1.5">
          <div class="w-9 h-9 p-1.5 rounded-full active:bg-black/20 cursor-pointer">
            <button class="bg-none outline-none cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;">
                <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1Zm0 2a9 9 0 110 18.001A9 9 0 0112 3ZM9 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3Zm6 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3Zm-.525 5.475a3.5 3.5 0 01-4.95 0 1 1 0 10-1.414 1.414 5.5 5.5 0 007.778 0 1 1 0 00-1.414-1.414Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/*Donations icon -->*/}
      <div class="flex items-center">
        <Show when={!hasInput()}>
          <div class="ml-3">
            <div class="w-9 h-9 p-1.5 rounded-[18px] bg-black/5 active:bg-black/20 cursor-pointer">
              <button class="bg-none outline-none cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;">
                  <path d="M21.5 4h-19A1.5 1.5 0 001 5.5v13A1.5 1.5 0 002.5 20h19a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0021.5 4ZM3 18V6h18v12H3Zm9-11.5a1 1 0 00-1 1v.638c-.357.101-.689.26-.979.49A2.35 2.35 0 009.13 10.5c-.007.424.112.84.342 1.197.21.31.497.563.831.734.546.29 1.23.411 1.693.502.557.109.899.19 1.117.315.087.048.11.082.114.09.004.005.028.044.028.162 0 .024-.008.118-.165.235-.162.122-.5.27-1.09.27-.721 0-1.049-.21-1.181-.323a.7.7 0 01-.132-.15l-.01-.018.005.013.006.014.002.009a.996.996 0 00-1.884.64l.947-.316-.003.001c-.9.3-.942.315-.943.317l.001.003.003.006.004.015.012.032c.045.111.1.218.162.321.146.236.324.444.535.624.357.306.841.566 1.476.702v.605a1 1 0 002 0v-.614c1.29-.289 2.245-1.144 2.245-2.386 0-.44-.103-.852-.327-1.212-.22-.355-.52-.6-.82-.77-.555-.316-1.244-.445-1.719-.539-.568-.111-.915-.185-1.143-.305a.5.5 0 01-.1-.07l-.004-.002V10.6a.401.401 0 01-.012-.1c0-.158.053-.244.14-.314.109-.086.34-.19.74-.19.373-.001.73.144.997.404a.995.995 0 001.518-1.286l-.699.58.698-.582v-.001l-.002-.001-.002-.003-.006-.006-.016-.018a2.984 2.984 0 00-.178-.182A3.44 3.44 0 0013 8.154V7.5a1 1 0 00-1-1Z"></path>
                </svg>
              </button>
            </div>
          </div>
        </Show>

        {/*Reactions icon -->*/}
        <div class="ml-3">
          <div class="w-9 h-9 my-3 rounded-[18px] bg-black/5 flex items-center justify-center active:bg-black/20">
            <button class="bg-none outline-none cursor-pointer w-full h-full flex items-center justify-center p-0 border-0">
              <Show
                when={hasInput()}
                fallback={(
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" aria-hidden="true" style="pointer-events: none; display: inherit; width: 24px; height: 24px;">
                    <path d="M16.25 2.5A6.56 6.56 0 0012 4.062 6.56 6.56 0 007.75 2.5C3.927 2.5 1 5.732 1 9.5c0 4.436 2.807 7.696 5.225 9.698a23.597 23.597 0 004.837 3.072l.095.044.029.013.01.004.005.003c.269-.61.535-1.222.799-1.834.797 1.834.799 1.834.799 1.834l.001-.001.003-.002.01-.004.03-.013.095-.044c.08-.037.19-.089.33-.157a23.6 23.6 0 004.507-2.915C20.193 17.196 23 13.936 23 9.5c0-3.768-2.927-7-6.75-7Zm0 2c2.623 0 4.75 2.239 4.75 5 0 7.089-9 11-9 11s-9-3.911-9-11c0-2.761 2.127-5 4.75-5a4.58 4.58 0 012.922 1.058A5 5 0 0112 7.265a5 5 0 011.328-1.707A4.58 4.58 0 0116.25 4.5Zm-3.453 17.834L12 20.5l-.797 1.834.797.347.797-.347Z"></path>
                  </svg>
                )}
              >
                <span class="w-6 h-6">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;">
                    <path d="m21.5 12.867 1.496-.865-1.495-.866L4.65 1.38c-1.513-.876-3.26.7-2.544 2.295l3.743 8.327-3.743 8.325c-.717 1.594 1.03 3.172 2.543 2.296l16.85-9.756ZM7.59 11 4.185 3.421l13.089 7.58H7.59Zm.003 2h9.688L4.185 20.581l3.408-7.58Z"></path>
                  </svg>
                </span>
              </Show>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
