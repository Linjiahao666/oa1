import { debounce } from "@/utils/common";

type anyFn = (...args: any) => any;

const eventMap = new Map<string, Set<anyFn>>();
const debounceMap = new Map<anyFn, anyFn>();

function _addEvent(type: string, callback: anyFn) {
  const set = eventMap.get(type);
  if (!set) {
    eventMap.set(type, new Set());
  }
  (eventMap.get(type) as Set<anyFn>).add(callback);
}

export function ga(type: string, callback: anyFn) {
  const d = debounce(callback, 100);
  _addEvent(type, d);
  debounceMap.set(callback, d);
  window.addEventListener(type, d);
  return d;
}

export function gr(type: string, callback: anyFn) {
  const d = debounceMap.get(callback);
  if (d) {
    window.removeEventListener(type, d);
    debounceMap.delete(callback);
  }
}
export function removeAll() {
  eventMap.forEach((set, type) => {
    set.forEach((callback) => {
      window.removeEventListener(type, callback);
    });
  });
  eventMap.clear();
}


