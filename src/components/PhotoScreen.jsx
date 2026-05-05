"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, ArrowRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import Image from "next/image"
import { photos, photoScreenHeading, photoScreenSubtext, photosScreenEndText } from "@/data"

export default function PhotoScreen({ onNext }) {
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        // Show button after a delay
        const timer = setTimeout(() => {
            setShowButton(true)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])


    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center px-4 py-6 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >

            {/* Header section */}
            <motion.div
                className="text-center max-w-3xl mx-auto mb-10"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
            >
                <h1 className="text-2xl md:text-3xl bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text leading-relaxed mb-4 font-semibold">
                    {photoScreenHeading}
                </h1>

                <motion.p
                    className="text-lg text-rose-200 italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    {photoScreenSubtext && photoScreenSubtext.trim().length !== 0 && photoScreenSubtext}
                </motion.p>
            </motion.div>

            {/* Photo carousel */}
            <motion.div
                className="w-full max-w-4xl mx-auto flex items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
            >
                <Swiper
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    coverflowEffect={{
                        depth: 120,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    navigation={true}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    className="photo-swiper"

                >
                    {photos.map((photo) => (
                        <SwiperSlide key={photo.id} style={{ width: "300px", }}>
                            <motion.div
                                className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
                                transition={{ duration: 0.3 }}
                            >
                                <div className="w-full h-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center relative">
                                    <Image
                                        fill
                                        sizes="300px"
                                        src={photo.src}
                                        alt="Our memory"
                                        className="w-full h-full object-cover p-2 rounded-2xl"
                                    />

                                    <div className="absolute inset-0 flex items-center justify-center text-white">
                                        <Heart className="w-16 h-16 fill-current opacity-25 text-pink-400" />
                                    </div>

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>

            {/* button */}
            <motion.div
                className="text-center mt-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: showButton ? 1 : 0, y: showButton ? 0 : 50 }}
                transition={{ duration: 0.8 }}
            >
                <motion.p
                    className="text-pink-300/80 text-sm mb-6"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                    {photosScreenEndText && photosScreenEndText.trim().length !== 0 && photosScreenEndText}
                </motion.p>

                <button
                    onClick={onNext}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center mx-auto pointer-events-auto"
                    style={{
                        boxShadow: "0 0 30px rgba(236, 72, 153, 0.4)",
                    }}
                >
                    See the Message
                    <ArrowRight className="w-5 h-5 ml-2" />
                </button>
            </motion.div>
        </motion.div>
    )
}
