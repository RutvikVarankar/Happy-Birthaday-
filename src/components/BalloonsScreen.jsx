"use client"

import { motion } from "motion/react"
import { ArrowRight, Heart } from "lucide-react"
import { balloonScreenEndText, balloonScreenHeading, balloonScreenSubtext } from "@/data"

export default function BalloonsScreen({ onNext }) {

  const cakes = [
    { text: "HAPPY", delay: 3 },
    { text: "BIRTHDAY", delay: 4.5 },
    { text: "NIVEDITA", delay: 6 }
  ]

  // 🎉 Confetti Component
  const Confetti = ({ side = "left" }) => {
    const particles = Array.from({ length: 100 }) // 🔥 MORE particles

    return (
      <div
        className={`pointer-events-none absolute bottom-0 ${side === "left" ? "left-0" : "right-0"
          }`}
      >
        {particles.map((_, i) => {
          const isTriangle = i % 3 === 0 // 🔺 every 3rd particle is triangle

          // 🎯 Wide spread toward center
          const spreadX =
            side === "left"
              ? 250 + Math.random() * 500   // go RIGHT (wide)
              : -(250 + Math.random() * 500) // go LEFT (wide)

          const spreadY = -(300 + Math.random() * 300) // go UP high

          const colors = [
            "#facc15",
            "#f472b6",
            "#60a5fa",
            "#34d399",
            "#fb7185",
            "#a78bfa"
          ]

          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: isTriangle ? 0 : 8,
                height: isTriangle ? 0 : 10,
                backgroundColor: isTriangle ? "transparent" : colors[i % 6],
                clipPath: isTriangle
                  ? "polygon(50% 0%, 0% 100%, 100% 100%)" // 🔺 triangle
                  : "none",
                borderLeft: isTriangle ? "5px solid transparent" : "none",
                borderRight: isTriangle ? "5px solid transparent" : "none",
                borderBottom: isTriangle
                  ? `10px solid ${colors[i % 6]}`
                  : "none",
              }}
              initial={{
                x: 0,
                y: 0,
                opacity: 0,
                rotate: 0,
                scale: 0.5,
              }}
              animate={{
                x: spreadX,
                y: spreadY,
                opacity: [0, 1, 1, 0],
                rotate: Math.random() * 720,
                scale: [0.5, 1, 1],
              }}
              transition={{
                delay: 8,
                duration: 3,
                ease: "easeOut",
              }}
            />
          )
        })}
      </div>
    )
  }
  const CakeComponent = ({ cake }) => (
    <motion.div
      className="relative flex items-center justify-center will-change-transform"
      initial={{ y: "100vh", scale: 0.3, opacity: 0 }}
      animate={{
        y: 0,
        scale: 1,
        opacity: 1,
        rotate: [-5, 5, -5],
      }}
      transition={{
        y: { delay: cake.delay, duration: 2, ease: "easeOut" },
        scale: { duration: 1.5, ease: "backOut" },
        opacity: { duration: 1 },
        rotate: {
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <div className="relative">

        {/* String */}
        <svg
          className="absolute top-[87.6%] left-1/2"
          width="2"
          height="100"
          viewBox="0 0 2 110"
        >
          <path
            d="M1 0 Q 3 30, 1 60 T 1 110"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>

        {/* Cake Container */}
        <motion.div
          className="relative w-40 h-40 md:w-52 md:h-52 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative flex flex-col items-center justify-end">

            {/* 🕯️ Candles (flame above stick) */}
            <div className="absolute -top-10 flex gap-2 z-10">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse mb-1" />
                  <div className="w-1.5 h-5 bg-white rounded-sm" />
                </div>
              ))}
            </div>

            {/* Glow */}
            <div className="absolute inset-0 bg-yellow-400/30 blur-3xl rounded-full z-30 pointer-events-none" />

            {/* 🎂 Cake Layers */}
            <div className="w-20 h-10 bg-pink-400 rounded-md shadow-md z-40" />
            <div className="w-28 h-12 bg-orange-400 rounded-md shadow-md -mt-3 z-40" />
            <div className="w-36 h-14 bg-yellow-400 rounded-md shadow-md -mt-3 z-40" />

            {/* Text */}
            <span className="absolute text-white font-bold text-lg md:text-xl z-50 text-center">
              {cake.text}
            </span>

          </div>
        </motion.div>
      </div>
    </motion.div>
  )

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-6 relative z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >

      {/* Heading */}
      <motion.div
        className="text-center max-w-2xl mx-auto mt-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h1 className="text-3xl md:text-4xl bg-gradient-to-r from-purple-400 via-rose-400 to-fuchsia-400 text-transparent bg-clip-text leading-tight font-semibold">
          {balloonScreenHeading}
        </h1>

        <motion.p
          className="text-pink-200/80 text-lg mt-4 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          {balloonScreenSubtext && balloonScreenSubtext.trim().length !== 0 && balloonScreenSubtext}
        </motion.p>
      </motion.div>

      {/* Cakes */}
      <div className="grid grid-cols-3 items-center gap-6 h-72">
        {cakes.map((cake, index) =>
          <CakeComponent key={index} cake={cake} />
        )}
      </div>

      {/* 🎉 Confetti */}
      <Confetti side="left" />
      <Confetti side="right" />

      {/* Button */}
      <motion.div
        className="text-center mt-10 flex flex-col items-center"
        initial={{ y: 50, scale: 0.8, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{
          delay: 8.5,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        <motion.p
          className="text-pink-300/80 text-sm mb-6"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {balloonScreenEndText && balloonScreenEndText.trim().length !== 0 && balloonScreenEndText}
        </motion.p>

        <motion.button
          onClick={onNext}
          className="bg-gradient-to-r from-pink-500 via-pink-600 to-red-500 hover:from-pink-600 hover:via-pink-700 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-2xl flex items-center justify-center pointer-events-none animate-fadeInButton"
          style={{
            boxShadow: "0 0 30px rgba(236, 72, 153, 0.4)",
            animation: "fadeInButton 1s ease forwards 8.5s"
          }}
        >
          <Heart className="w-5 h-5 mr-2 fill-current" />
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </motion.button>
      </motion.div>

    </motion.div>
  )
}