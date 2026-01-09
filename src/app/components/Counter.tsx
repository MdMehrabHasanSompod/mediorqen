"use client"
import React, { useEffect, useState, useRef } from 'react'

type propType = {
  end: number
  duration?: number
}

const Counter = ({ end, duration = 2000 }: propType) => {
  const [count, setCount] = useState<number>(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (hasAnimated) return 

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let start = 0
            const increment = end / (duration / 16)
            const timer = setInterval(() => {
              start += increment
              if (start >= end) {
                setCount(end)
                clearInterval(timer)
              } else {
                setCount(Math.floor(start))
              }
            }, 16)

            setHasAnimated(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.5 } 
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return <span ref={ref}>{count}</span>
}

export default Counter
