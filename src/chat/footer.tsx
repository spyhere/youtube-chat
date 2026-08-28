import { createSignal, onCleanup, onMount, Show } from "solid-js"
import { DonateIco, ReactionsIco, SendIco, SmileIco } from "../icons"
import { OWNER_AVATAR } from "../constants"

type Props = {
  onSubmit: (input: string) => void
}

export function Footer(props: Props) {
  let editableRef!: HTMLDivElement
  let wrapperRef!: HTMLDivElement
  const [inputCount, setInputCount] = createSignal(0)

  const onInput = (e: InputEvent) => {
    const input = (e.currentTarget as HTMLDivElement).textContent
    setInputCount(input.length)
  }

  const onSubmit = () => {
    props.onSubmit(editableRef.textContent)
    editableRef.innerText = ""
    setInputCount(0)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
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
        <img class="h-6 w-6 mr-3 rounded-full aspect-square object-cover" src={OWNER_AVATAR} alt="Avatar" />
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
            on:keydown={handleKeyDown}
            ref={editableRef}
          ></div>
        </div>
        <div class="ml-1.5">
          <div class="w-9 h-9 p-1.5 rounded-full active:bg-black/20 cursor-pointer">
            <button class="bg-none outline-none cursor-pointer">
              <SmileIco />
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
                <DonateIco />
              </button>
            </div>
          </div>
        </Show>

        {/*Reactions icon -->*/}
        <div class="ml-3">
          <div class="w-9 h-9 my-3 rounded-[18px] bg-black/5 flex items-center justify-center active:bg-black/20">
            <button
              class="bg-none outline-none cursor-pointer w-full h-full flex items-center justify-center p-0 border-0"
              onClick={onSubmit}
            >
              <Show
                when={hasInput()}
                fallback={<ReactionsIco />}
              >
                <span class="w-6 h-6">
                  <SendIco />
                </span>
              </Show>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
