import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles, Star } from "lucide-react"

function Loader() {
  const [randomPositions, setRandomPositions] = useState([]);

  useEffect(() => {
    const positions = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setRandomPositions(positions);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-200 overflow-hidden">
      {/* Floating background icons */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-10]">
        {randomPositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, Math.random() * 10 - 5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          >
            {i % 5 === 0 ? (
              <Star className={`w-${4 + (i % 4)} h-${4 + (i % 4)} text-yellow-400 fill-yellow-200 opacity-70`} />
            ) : i % 5 === 1 ? (
              <Sparkles className={`w-${4 + (i % 4)} h-${4 + (i % 4)} text-yellow-300 opacity-70`} />
            ) : (
              <Heart
                className={`w-${4 + (i % 4)} h-${4 + (i % 4)} ${i % 3 === 0
                  ? "text-yellow-300"
                  : i % 3 === 1
                    ? "text-yellow-400"
                    : "text-yellow-500"
                  } ${i % 2 === 0 ? "fill-yellow-100" : "fill-yellow-200"} opacity-70`}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Main loading card */}
      <motion.div
        className="relative z-10 bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-lg shadow-yellow-100 p-8 border-4 border-yellow-400 flex flex-col items-center max-w-xs mx-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center space-x-3 mb-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            >
              <Heart
                className={`w-8 h-8 ${i === 0
                  ? "text-yellow-400 fill-yellow-200"
                  : i === 1
                    ? "text-yellow-500 fill-yellow-300"
                    : "text-yellow-600 fill-yellow-400"
                  }`}
              />
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-xl font-bold text-center text-yellow-600 mb-3"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          Loading something special...
        </motion.p>

        <div className="flex justify-center space-x-4 mt-5">
          {["🎂", "🌻", "🎁", "💛", "☀️"].map((emoji, i) => (
            <motion.span
              key={i}
              className="text-xl"
              animate={{
                rotate: [-10, 10, -10],
                scale: [1, 1.2, 1],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Loader