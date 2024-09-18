export function throttle(fn: (...args: any[]) => any, delay: number) {
  let timer: any = null
  return function (...args: any[]) {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, delay)
  }
}

export function debounce(fn: (...args: any[]) => any, delay: number) {
  let timer: any = null
  return function (...args: any[]) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, delay)
  }
}