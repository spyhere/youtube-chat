// Leading call
export function throttle<T extends (...args: any[]) => any>(f: T, timeout: number) {
  let lastExecuted = 0
  return function(this: ThisParameterType<T>, ...args: unknown[]) {
    const now = performance.now()
    if ((now - lastExecuted) >= timeout) {
      lastExecuted = now
      f.apply(this, args)
    }
  }
}

