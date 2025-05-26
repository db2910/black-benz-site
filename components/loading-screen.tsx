"use client"

import { useState, useEffect } from "react"

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          // Add a small delay before hiding the loading screen
          setTimeout(() => {
            setIsVisible(false)
            setTimeout(onLoadingComplete, 500) // Wait for fade out animation
          }, 300)
          return 100
        }
        // Randomize progress increments for more realistic loading
        const increment = Math.random() * 15 + 5
        return Math.min(prev + increment, 100)
      })
    }, 150)

    return () => clearInterval(interval)
  }, [onLoadingComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-yellow-600/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_70%)]"></div>
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Logo with Animation */}
        <div className="relative">
          {/* Outer Ring Animation */}
          <div className="absolute inset-0 w-32 h-32 border-4 border-transparent border-t-yellow-400 border-r-yellow-500 rounded-full animate-spin"></div>

          {/* Inner Ring Animation */}
          <div
            className="absolute inset-2 w-28 h-28 border-4 border-transparent border-b-yellow-500 border-l-yellow-600 rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>

          {/* Logo Container */}
          <div className="relative w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <span className="text-black font-bold text-4xl">BB</span>
          </div>

          {/* Pulsing Glow Effect */}
          <div className="absolute inset-0 w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl opacity-30 animate-pulse"></div>
        </div>

        {/* Brand Name */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2 animate-pulse">Black Benz</h1>
          <p className="text-yellow-400 text-lg font-medium">Premium Luxury Experience</p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 max-w-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-sm">Loading...</span>
            <span className="text-yellow-400 text-sm font-medium">{Math.round(progress)}%</span>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            {/* Progress Bar Fill */}
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-3 h-3 bg-yellow-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>

      {/* Fade Out Animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  )
}
