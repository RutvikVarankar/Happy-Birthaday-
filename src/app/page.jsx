"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import RainEffect from "@/components/RainEffect"
import FirstScreen from "@/components/FirstScreen"
import QuestionScreen from "@/components/QuestionScreen"
import BalloonsScreen from "@/components/BalloonsScreen"
import PhotoScreen from "@/components/PhotoScreen"
import FinalScreen from "@/components/FinalScreen"
import CuteLoader from "@/components/CuteLoader"
import FloatingHearts from "@/components/FloatingHearts"
import Music from "@/components/Music"
import { questionOne } from "@/data"

export default function ProposalSite() {
  const [currentScreen, setCurrentScreen] = useState("loader")
  const [isLoading, setIsLoading] = useState(true)
  const [musicStarted, setMusicStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setCurrentScreen("first")
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const nextScreen = (screen) => {
    if (!musicStarted) {
      setMusicStarted(true)
    }
    setCurrentScreen(screen)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200/80 via-blue-100/70 to-sky-300/60 relative overflow-hidden">

      {/* Dots background */}
      <div className="fixed inset-0 bg-[radial-gradient(circle,rgba(135,206,250,0.3)_1px,transparent_1px)] bg-[size:40px_40px] opacity-70" />

      {/* Radial gradients for background */}
      <div className="fixed inset-0 z-0 blur-[120px] opacity-20" style={{
        backgroundImage: "radial-gradient(circle at 20% 25%, rgba(135, 206, 250, 0.4), transparent 40%)",
      }} />

      <div className="fixed inset-0 z-0 blur-[120px] opacity-20" style={{
        backgroundImage: "radial-gradient(circle at 80% 80%, rgba(100, 149, 237, 0.4), transparent 40%)",
      }} />

      <div className="fixed inset-0 z-0 blur-[140px] opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 50% 50%, rgba(173, 216, 230, 0.3), transparent 40%)",
      }} />

      {!isLoading && <RainEffect />}

      <FloatingHearts />

      <Music shouldPlay={musicStarted} />

      <AnimatePresence mode="wait">
        {isLoading && <CuteLoader key="loader" onComplete={() => setCurrentScreen("first")} />}

        {currentScreen === "first" && <FirstScreen key="first" onNext={() => nextScreen("question1")} />}

        {currentScreen === "question1" && (
          <QuestionScreen
            key="question1"
            question={questionOne}
            onYes={() => nextScreen("balloons")}
            isFirst={true}
          />
        )}

        {currentScreen === "balloons" && <BalloonsScreen key="balloons" onNext={() => nextScreen("photos")} />}

        {currentScreen === "photos" && <PhotoScreen key="photos" onNext={() => nextScreen("final")} />}

        {currentScreen === "final" && <FinalScreen key="final" />}
      </AnimatePresence>

      {/* Watermark */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1,
          delay: 1,
        }}
        className="fixed bottom-4 right-4 text-slate-700/60 pointer-events-none z-50 font-light">
        @SahilDesai
      </motion.div>
    </div>
  )
}
