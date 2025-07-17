'use client';
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Countdown from "@/components/countdown";
import BirthdayCelebration from "@/components/birthday-celebration";
import Confetti from "@/components/confetti";
import Loader from "@/components/Loader";
import { MoveRight, PartyPopper } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isBirthday, setIsBirthday] = useState(false);
  const [showForYouBtn, setShowForYouBtn] = useState(false);
  const audioRef = useRef(null);

  const birthdayDate = new Date("2025-07-26T00:00:00+05:30");

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const startCelebration = () => {
    setShowForYouBtn(false);
    setIsBirthday(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.8;
      audioRef.current.play().catch((e) => {
        console.log("Autoplay prevented, user interaction needed", e);
      });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-200 flex flex-col items-center justify-center p-4 overflow-hidden text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-yellow-600"
      >
        Happy Birthday, Megha! 🎉
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-10 max-w-md"
      >
        <p className="italic text-yellow-600">
          “Not by chance or luck. <br />
          It took one deep-hearted train journey. <br />
          Now, bestoesss for life!!💛
        </p>
      </motion.div>

      {isBirthday && <Confetti />}

      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 5 }}
          >
            🌻
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-3xl mx-auto mt-10"
      >
        <motion.div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-xl shadow-yellow-200 p-10 border-4 border-yellow-400"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}>
          <AnimatePresence mode="wait">
            {isBirthday ? (
              <BirthdayCelebration key="celebration" />
            ) : (
              <Countdown key="countdown" targetDate={birthdayDate} onCountdownEnd={() => setShowForYouBtn(true)} />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {showForYouBtn && (
        <motion.div
          key="start-button"
          className="flex flex-col items-center justify-center mt-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            onClick={startCelebration}
            className="bg-gradient-to-r z-10 from-yellow-400 to-yellow-500 shadow-lg hover:shadow-xl transition-all rounded-full font-medium text-white py-4 px-8 cursor-pointer border-2 border-white flex items-center gap-3"
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -5, 0], scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <PartyPopper className="w-6 h-6" />
            <span className="text-xl">For you</span>
            <MoveRight className="w-5 stroke-3 h-6" />
          </motion.button>
        </motion.div>
      )}

      <audio ref={audioRef} src="/Kabhi Kabhi.mp3" preload="auto" loop />

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xl"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 5 }}
          >
            ☀️
          </motion.div>
        ))}
      </div>

      <p className="mt-12 text-sm text-yellow-700">Made with love, Barath 💛</p>
    </main>
  );
}