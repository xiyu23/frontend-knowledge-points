import { useState, useEffect, useCallback, useRef } from 'react'
import { useDebouncedValue } from '../hooks/useDebouncedValue'

function debounce(func: Function, wait: number) {
  let timer = 0
  return () => {
    if (timer > 0) {
      window.clearTimeout(timer)
    }
    timer = window.setTimeout(() => {
      func.apply(this, arguments)
      timer = 0
    }, wait)
  }
}

export function DebouncedInputWithRef() {
  const [val, setVal] = useState('')

  const doSth = () => {
    console.log(`do sth with ${val}`)
  }

  // use ref to keep the up-to-date `doSth` function
  const doSthRef = useRef<(...args: any[]) => any>(null)
  useEffect(() => {
    doSthRef.current = doSth
  }, [val])

  // handler is debounced, it's only set on mount
  // when the time elapsed we will call the function
  // note the function is referenced by ref, so it's up-to-date(can reference newest states inside FC)
  const debouncedHandler = useCallback(debounce(() => {
    doSthRef.current?.()
  }, 500), [])

  const onInput = useCallback((e) => {
    // 实时更新
    console.log('onInput: ', e.target.value)
    setVal(e.target.value)

    // 触发handler
    debouncedHandler()
  }, [debouncedHandler])



  return <input value={val} onInput={onInput} />
}