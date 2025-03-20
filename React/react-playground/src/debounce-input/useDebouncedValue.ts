import { useEffect, useState, useRef } from 'react'
export function useDebouncedValue(val: any, wait: number, isTrailing = true) {
  const [debouncedVal, setDebounceVal] = useState(val)
  const timerIdRef = useRef(-1)
  useEffect(() => {
    if (!isTrailing) {
      // leading, trigger it if there's no timer counting
      if (timerIdRef.current === -1) {
        setDebounceVal(val)
      }
      window.clearTimeout(timerIdRef.current)
      timerIdRef.current = setTimeout(() => {
        timerIdRef.current = -1
      }, wait)
    } else {
      window.clearTimeout(timerIdRef.current)
      timerIdRef.current = setTimeout(() => {
        setDebounceVal(val)
        timerIdRef.current = -1
      }, wait)
    }
  }, [val, wait, isTrailing])

  return debouncedVal
}