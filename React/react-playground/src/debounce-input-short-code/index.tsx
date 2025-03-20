import { useState, useEffect, useCallback } from 'react'

export function DebouncedInputShortCode() {
  const [val, setVal] = useState('')

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      console.log('do sth')
    }, 500)
    return () => window.clearTimeout(timerId)
  }, [val])

  const onInput = useCallback((e) => {
    // 实时更新
    console.log('onInput: ', e.target.value)
    setVal(e.target.value)
  }, [])

  return <input value={val} onInput={onInput} />
}