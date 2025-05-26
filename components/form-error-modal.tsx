"use client"

import { X, AlertTriangle, Mail, Phone } from "lucide-react"

interface FormErrorModalProps {
  isOpen: boolean
  onClose: () => void
  error: string
  onRetry?: () => void
}

export default function FormErrorModal({ isOpen, onClose, error, onRetry }: FormErrorModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl max-w-md w-full border border-red-500/30">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Submission Error</h3>
                <p className="text-gray-400 text-sm">We encountered an issue</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Error Message */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
            <p className="text-red-300 text-sm leading-relaxed">{error}</p>
          </div>

          {/* Alternative Contact Methods */}
          <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
            <h4 className="text-white font-semibold mb-3">Contact us directly:</h4>
            <div className="space-y-3">
              <a
                href="tel:+250788123456"
                className="flex items-center space-x-3 text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+250 788 123 456</span>
              </a>
              <a
                href="mailto:info@blackbenz.com"
                className="flex items-center space-x-3 text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>info@blackbenz.com</span>
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {onRetry && (
              <button
                onClick={onRetry}
                className="flex-1 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300"
              >
                Try Again
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
