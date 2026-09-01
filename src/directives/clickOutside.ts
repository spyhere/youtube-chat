import { onCleanup } from "solid-js"

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      clickOutside: () => void
    }
  }
}

export function clickOutside(el: HTMLElement, accessor: () => () => void) {
  const handler = (event: MouseEvent) => {
    if (!el.contains(event.target as Node)) {
      accessor()()
    }
  }
  document.addEventListener("click", handler)
  onCleanup(() => {
    document.removeEventListener("click", handler)
  })
}

