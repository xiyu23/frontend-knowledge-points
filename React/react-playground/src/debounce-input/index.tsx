import { useState, useEffect, useCallback } from 'react'
import { useDebouncedValue } from './useDebouncedValue'

export function DebouncedInput() {
  const [val, setVal] = useState('')
  const onInput = useCallback((e) => {
    // 实时更新
    console.log('onInput: ', e.target.value)
    setVal(e.target.value)
  }, [])
  const debouncedVal = useDebouncedValue(val, 500)

  useEffect(() => {
    console.log(`input val changed to ${debouncedVal}`)
  }, [debouncedVal])


  return <input value={val} onInput={onInput} />
}