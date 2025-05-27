"use client"

import { X, CheckCircle, Mail, Phone } from "lucide-react"

interface FormSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  message: string
  isPartialSuccess?: boolean
}

export default function FormSuccessModal({ isOpen, onClose, message, isPartialSuccess }: FormSuccessModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl max-w-md w-full border border-green-500/30">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {isPartialSuccess ? "Partially Successful" : "Success!"}
                </h3>
                <p className="text-gray-400 text-sm">Your submission was received</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Success Message */}
          <div
            className={`${isPartialSuccess ? "bg-yellow-500/10 border-yellow-500/30" : "bg-green-500/10 border-green-500/30"} border rounded-lg p-4 mb-6`}
          >
            <p className={`${isPartialSuccess ? "text-yellow-300" : "text-green-300"} text-sm leading-relaxed`}>
              {message}
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
            <h4 className="text-white font-semibold mb-3">What happens next?</h4>
            <ul className="text-gray-300 text-sm space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-yellow-400 mt-1">•</span>
                <span>Our team will review your submission</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-yellow-400 mt-1">•</span>
                <span>We'll contact you within 2-4 hours</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-yellow-400 mt-1">•</span>
                <span>We'll provide detailed information and pricing</span>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
            <h4 className="text-white font-semibold mb-3">Need immediate assistance?</h4>
            <div className="space-y-3">
              <a
                href="tel:+250788123456"
                className="flex items-center space-x-3 text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+250 788 306 454</span>
              </a>
              <a
                href="mailto:info@blackbenz.com"
                className="flex items-center space-x-3 text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>blackbenz110@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
