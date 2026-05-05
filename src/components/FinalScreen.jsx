"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"
import confetti from "canvas-confetti"
import { proposalMessage } from "@/data"

export default function FinalScreen() {
  const [cardOpen, setCardOpen] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const [typingComplete, setTypingComplete] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const messageRef = useRef(null)

  useEffect(() => {
    if (cardOpen && !typingComplete) {
      let currentIndex = 0
      const typingInterval = setInterval(() => {
        if (currentIndex < proposalMessage.length) {
          setDisplayedText(proposalMessage.slice(0, currentIndex + 1))
          currentIndex++

          if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight
          }
        } else {
          setTypingComplete(true)
          clearInterval(typingInterval)
        }
      }, 30)

      return () => clearInterval(typingInterval)
    }
  }, [cardOpen, typingComplete, proposalMessage])

  // 🎉 Birthday Confetti Blast
  const handleCelebrate = () => {
    setShowOverlay(true)

    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 20,
        angle: 60,
        spread: 100,
        origin: { x: 0, y: 1 },
      })

      confetti({
        particleCount: 20,
        angle: 120,
        spread: 100,
        origin: { x: 1, y: 1 },
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-6 relative z-10"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >

      {/* Main content */}
      <div className="max-w-xl w-full mx-auto text-center">
        <AnimatePresence mode="wait">
          {!cardOpen ? (
            <motion.div key="closed" exit={{ opacity: 0 }}>

              <motion.div
                className="mb-8 flex justify-center"
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <img src="/gif/msg.gif" className="w-28" alt="envelope" />
              </motion.div>

              <h1 className="text-3xl md:text-4xl text-pink-200 mb-8 font-semibold">
                A Special Birthday Message 🎂
              </h1>

              <div
                className="cursor-pointer hover:scale-105 bg-gradient-to-r from-purple-950/15 via-pink-950/20 to-fuchsia-950/15 backdrop-blur-md border border-pink-500/30 rounded-3xl p-8"
                onClick={() => setCardOpen(true)}
              >
                <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4 fill-current" />
                <p className="text-lg text-pink-300">
                  Tap to open your surprise 💌
                </p>
              </div>

            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-r from-purple-950/15 via-pink-950/20 to-fuchsia-950/15 backdrop-blur-md border border-pink-500/30 rounded-3xl p-8">

                <div
                  ref={messageRef}
                  className="h-80 overflow-y-auto text-left"
                >
                  <div className="text-pink-200 whitespace-pre-line">
                    {displayedText}
                    {!typingComplete && <span className="text-pink-400">|</span>}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🎉 Birthday Button */}
        <AnimatePresence>
          {typingComplete && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-10"
            >
              <h2 className="text-2xl md:text-3xl text-pink-300 mb-6 font-semibold">
                Ready to celebrate? 🎉
              </h2>

              <button
                onClick={handleCelebrate}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 text-xl rounded-full hover:scale-105 transition"
              >
                🎂 Celebrate 🎉
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🎊 Final Birthday Overlay */}
      {showOverlay && (
        <motion.div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center">

            <h1 className="text-4xl md:text-5xl font-bold text-pink-400 mb-4">
              🎉 Happy Birthday 🎂
            </h1>

            <p className="text-xl text-pink-200">
              Wishing you joy, happiness & lots of cake! 💖
            </p>

          </div>
        </motion.div>
      )}

    </motion.div>
  )
}