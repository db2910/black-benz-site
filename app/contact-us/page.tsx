"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Twitter, Linkedin, Mail, Phone, MapPin, Send, Clock, Menu, X } from "lucide-react"

import FormErrorModal from "@/components/form-error-modal"
import FormSuccessModal from "@/components/form-success-modal"

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isPartialSuccess, setIsPartialSuccess] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false);


  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          formType: "contact",
        }),
      })

      const result = await response.json()

      if (result.success) {
        setFormData({ name: "", email: "", phone: "", message: "" })
        setSuccessMessage(result.message)
        setIsPartialSuccess(result.partialSuccess || false)
        setShowSuccessModal(true)
      } else {
        setErrorMessage(result.error || "An unexpected error occurred. Please try again.")
        setShowErrorModal(true)
      }
    } catch (error) {
      setErrorMessage("Network error. Please check your connection and try again.")
      setShowErrorModal(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const retrySubmission = () => {
    setShowErrorModal(false)
    // The form will still be open, so user can try again
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Navbar */}
<nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link href="/" className="flex items-center">
        <Image
  src="/pictures/logo.jpeg"
  alt="Black Benz"
  width={95}
  height={48}
  className="rounded-lg"
/>
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex">
        <div className="ml-10 flex items-baseline space-x-8">
          <Link href="/" className="text-gray-300 hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-colors duration-300 hover:underline decoration-yellow-400 underline-offset-4">
            Home
          </Link>
          <Link href="/car-rental" className="text-gray-300 hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-colors duration-300 hover:underline decoration-yellow-400 underline-offset-4">
            Car Rental
          </Link>
          <Link href="/tourism" className="text-gray-300 hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-colors duration-300 hover:underline decoration-yellow-400 underline-offset-4">
            Tourism
          </Link>
          <Link href="/contact-us" className="text-white hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-colors duration-300 hover:underline decoration-yellow-400 underline-offset-4">
            Contact Us
          </Link>
        </div>
      </div>

      {/* Social + Hamburger */}
      <div className="flex items-center space-x-4">
        {/* all four social icons */}
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 hover:scale-110 transition-all duration-300"><Instagram size={20}/></a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 hover:scale-110 transition-all duration-300"><Facebook size={20}/></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 hover:scale-110 transition-all duration-300"><Twitter size={20}/></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 hover:scale-110 transition-all duration-300"><Linkedin size={20}/></a>

        {/* hamburger on small screens */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-yellow-400 hover:text-yellow-300 p-2"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      </div>
    </div>
  </div>

  {/* Mobile Menu Overlay */}
  {menuOpen && (
    <div className="md:hidden fixed inset-0 bg-black/90 z-40 flex flex-col items-center justify-center space-y-8">
      <button
        onClick={() => setMenuOpen(false)}
        className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-300 p-2"
        aria-label="Close menu"
      >
        <X size={28} />
      </button>
      <Link href="/" onClick={() => setMenuOpen(false)} className="text-white text-2xl font-medium hover:text-yellow-400">Home</Link>
      <Link href="/car-rental" onClick={() => setMenuOpen(false)} className="text-white text-2xl font-medium hover:text-yellow-400">Car Rental</Link>
      <Link href="/tourism" onClick={() => setMenuOpen(false)} className="text-white text-2xl font-medium hover:text-yellow-400">Tourism</Link>
      <Link href="/contact-us" onClick={() => setMenuOpen(false)} className="text-white text-2xl font-medium hover:text-yellow-400">Contact Us</Link>
    </div>
  )}
</nav>


      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Touch</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to experience luxury travel in Rwanda? Contact us today and let us help you plan the perfect journey
            with our premium vehicles and tourism services.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Contact{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                    Information
                  </span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  We're here to assist you with all your luxury car rental and tourism needs. Reach out to us through
                  any of the following channels.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                {/* Phone */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300 group">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Phone</h3>
                      <p className="text-gray-300 mb-2">Call us directly for immediate assistance</p>
                      <a
                        href="tel:+250788123456"
                        className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
                      >
                        +250 788 306 454
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300 group">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                      <p className="text-gray-300 mb-2">Send us a detailed message</p>
                      <a
                        href="mailto:info@blackbenz.com"
                        className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
                      >
                        blackbenz110@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300 group">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Location</h3>
                      <p className="text-gray-300 mb-2">Visit our office in Kigali</p>
                      <p className="text-yellow-400 font-medium">Remera Airport Road,KN 206 st</p>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300 group">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Clock className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Business Hours</h3>
                      <div className="space-y-1 text-gray-300">
                        <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                        <p>Saturday: 9:00 AM - 5:00 PM</p>
                        <p>Sunday: 10:00 AM - 4:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6">
                Send Us a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                  Message
                </span>
              </h2>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 resize-none"
                    placeholder="Tell us about your requirements, preferred dates, or any questions you have..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-400/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
                <p className="text-yellow-400 text-sm">
                  <strong>Quick Response:</strong> We typically respond to all inquiries within 2-4 hours during
                  business hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Error Modal */}
      <FormErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        error={errorMessage}
        onRetry={retrySubmission}
      />

      {/* Success Modal */}
      <FormSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={successMessage}
        isPartialSuccess={isPartialSuccess}
      />

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black p-3 rounded-full shadow-lg hover:shadow-yellow-400/25 transform hover:scale-110 transition-all duration-300"
          aria-label="Back to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Logo Column */}
            <div className="flex flex-col items-start">
              <Link href="/" className="flex items-center mb-4">
              <Image
  src="/pictures/logo.jpeg"
  alt="Black Benz"
  width={95}
  height={48}
  className="rounded-lg"
/>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed">
                Premium luxury car rental and tourism services in Rwanda. We value the time and quality of travel.
              </p>
            </div>

            {/* Contacts Column */}
            <div>
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">Contacts</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 text-yellow-400 mt-0.5">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-sm">Remera Airport Road,KN 206 st</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 text-yellow-400">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <a href="tel:+250788123456" className="text-gray-300 text-sm hover:text-yellow-400 transition-colors">
                  +250 788 306 454
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 text-yellow-400">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <a
                    href="mailto:info@blackbenz.com"
                    className="text-gray-300 text-sm hover:text-yellow-400 transition-colors"
                  >
                    blackbenz110@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">Quick Links</h3>
              <div className="space-y-3">
                <Link href="/" className="block text-gray-300 text-sm hover:text-yellow-400 transition-colors">
                  Home
                </Link>
                <Link
                  href="/car-rental"
                  className="block text-gray-300 text-sm hover:text-yellow-400 transition-colors"
                >
                  Car Rental
                </Link>
                <Link href="/tourism" className="block text-gray-300 text-sm hover:text-yellow-400 transition-colors">
                  Tourism
                </Link>
                <Link
                  href="/contact-us"
                  className="block text-gray-300 text-sm hover:text-yellow-400 transition-colors"
                >
                  Contact Us
                </Link>
              </div>

              {/* Social Media Links */}
              <div className="mt-6">
                <h4 className="text-lg font-medium text-white mb-3">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    <Twitter size={20} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="border-t border-gray-800"></div>

        {/* Sub-Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-500 text-sm">Website by Don Beni</p>
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Black Benz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
