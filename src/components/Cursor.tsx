'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function Cursor() {
  const [visible, setVisible] = useState(false)
  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)
  const x = useSpring(rawX, { stiffness: 500, damping: 40 })
  const y = useSpring(rawY, { stiffness: 500, damping: 40 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const leave = () => setVisible(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', leave)
    }
  }, [visible, rawX, rawY])

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] hidden sm:block"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: '#1f3a5f',
        mixBlendMode: 'difference',
        opacity: visible ? 1 : 0,
      }}
    />
  )
}
