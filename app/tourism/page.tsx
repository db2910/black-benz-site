"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Twitter, Linkedin, ChevronLeft, ChevronRight, X, Calendar, Menu } from "lucide-react"
import FormErrorModal from "@/components/form-error-modal"
import FormSuccessModal from "@/components/form-success-modal"

// Tourism attractions data with multiple images
const tourismAttractions = [
  {
    id: 1,
    name: "Volcanoes National Park",
    description:
      "Home to endangered mountain gorillas, lush rainforests, and breathtaking volcanic landscapes. Experience the thrill of gorilla trekking in their natural habitat.",
    images: [
      "/pictures/volca1.jpg",
      "/pictures/volca2.jpg",
      "/pictures/volca3.jpg",
      "/pictures/volca4.jpg",
      "/placeholder.svg?height=500&width=800",
    ],
  },
  {
    id: 2,
    name: "Nyungwe Forest National Park",
    description:
      "Explore one of Africa's oldest rainforests, home to chimpanzees and diverse primate species. Walk among the treetops on the thrilling canopy walkway.",
    images: [
      "/pictures/nyung1.jpg",
      "/pictures/nyung2.jpg",
      "/pictures/nyung3.jpg",
      "/pictures/nyung4.jpg",
    ],
  },
  {
    id: 3,
    name: "Akagera National Park",
    description:
      "Discover Rwanda's stunning savanna park offering classic safari experiences. Spot the Big Five and enjoy rich birdlife in this beautiful wilderness.",
    images: [
      "/pictures/aka1.jpg",
      "/pictures/aka2.jpg",
      "/pictures/aka3.jpg",
      "/pictures/aka4.jpg",
      "/pictures/aka5.jpg",
    ],
  },
  {
    id: 4,
    name: "Lake Kivu",
    description:
      "Relax by the serene shores of one of Africa's Great Lakes. Enjoy boat trips, kayaking, beautiful beaches, and stunning sunsets over crystal-clear waters.",
    images: [
      "/pictures/kivu1.jpg",
      "/pictures/kivu2.jpg",
      "/pictures/kivu3.jpg",
      "/pictures/kivu4.jpg",
      "/pictures/kivu5.jpg",
    ],
  },
  {
    id: 5,
    name: "Kigali Genocide Memorial",
    description:
      "A poignant and important site for reflection and learning about Rwanda's history. Honor the victims of the 1994 Genocide against the Tutsi in this moving memorial.",
    images: [
      "/pictures/gen1.jpg",
      "/pictures/gen2.jpg",
      "/pictures/gen3.jpg",
      "/pictures/gen4.jpg",
    ],
  },
]

export default function TourismPage() {
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{ [key: number]: number }>({})
  const [showFullScreen, setShowFullScreen] = useState(false)
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [selectedAttraction, setSelectedAttraction] = useState<string>("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    selectedAttraction: "",
    preferredDate: "",
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


  // Initialize current image indexes
  useEffect(() => {
    const initialIndexes: { [key: number]: number } = {}
    tourismAttractions.forEach((attraction) => {
      initialIndexes[attraction.id] = 0
    })
    setCurrentImageIndexes(initialIndexes)
  }, [])

  // Auto-play slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndexes((prev) => {
        const newIndexes = { ...prev }
        tourismAttractions.forEach((attraction) => {
          newIndexes[attraction.id] = (prev[attraction.id] + 1) % attraction.images.length
        })
        return newIndexes
      })
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [])

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const nextImage = (attractionId: number) => {
    const attraction = tourismAttractions.find((a) => a.id === attractionId)
    if (attraction) {
      setCurrentImageIndexes((prev) => ({
        ...prev,
        [attractionId]: (prev[attractionId] + 1) % attraction.images.length,
      }))
    }
  }

  const prevImage = (attractionId: number) => {
    const attraction = tourismAttractions.find((a) => a.id === attractionId)
    if (attraction) {
      setCurrentImageIndexes((prev) => ({
        ...prev,
        [attractionId]: (prev[attractionId] - 1 + attraction.images.length) % attraction.images.length,
      }))
    }
  }

  const goToImage = (attractionId: number, imageIndex: number) => {
    setCurrentImageIndexes((prev) => ({
      ...prev,
      [attractionId]: imageIndex,
    }))
  }

  const openFullScreen = (imageUrl: string) => {
    setFullScreenImage(imageUrl)
    setShowFullScreen(true)
  }

  const closeFullScreen = () => {
    setShowFullScreen(false)
    setFullScreenImage(null)
  }

  const openBookingForm = (attractionName: string) => {
    setSelectedAttraction(attractionName)
    setFormData((prev) => ({
      ...prev,
      selectedAttraction: `Tour: ${attractionName}`,
    }))
    setShowBookingForm(true)
  }

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
          formType: "tourism-booking",
        }),
      })

      const result = await response.json()

      if (result.success) {
        setShowBookingForm(false)
        setFormData({ name: "", email: "", phone: "", selectedAttraction: "", preferredDate: "", message: "" })
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

  const retrySubmission = () => {
    setShowErrorModal(false)
    // The form will still be open, so user can try again
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="min-h-screen bg-white">
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
          <Link href="/tourism" className="text-white hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-colors duration-300 hover:underline decoration-yellow-400 underline-offset-4">
            Tourism
          </Link>
          <Link href="/contact-us" className="text-gray-300 hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-colors duration-300 hover:underline decoration-yellow-400 underline-offset-4">
            Contact Us
          </Link>
        </div>
      </div>

      {/* Social Icons + Hamburger */}
      <div className="flex items-center space-x-4">
        <a href="https://www.instagram.com/black_benz_services/" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 hover:scale-110 transition-all duration-300">
          <Instagram size={20} />
        </a>
        
        <a href="https://x.com/BlackBenzServic" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 hover:scale-110 transition-all duration-300">
          <Twitter size={20} />
        </a>
        

        {/* Hamburger on small */}
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
      <Link href="/" onClick={() => setMenuOpen(false)} className="text-white text-2xl font-medium hover:text-yellow-400">
        Home
      </Link>
      <Link href="/car-rental" onClick={() => setMenuOpen(false)} className="text-white text-2xl font-medium hover:text-yellow-400">
        Car Rental
      </Link>
      <Link href="/tourism" onClick={() => setMenuOpen(false)} className="text-white text-2xl font-medium hover:text-yellow-400">
        Tourism
      </Link>
      <Link href="/contact-us" onClick={() => setMenuOpen(false)} className="text-white text-2xl font-medium hover:text-yellow-400">
        Contact Us
      </Link>
    </div>
  )}
</nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-100 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Explore Rwanda's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Hidden Gems
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the Land of a Thousand Hills with our premium tourism services. From mountain gorillas to pristine
            lakes, experience unforgettable adventures in Rwanda's most spectacular destinations.
          </p>
        </div>
      </section>

      {/* Tourist Attraction Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12">
            {tourismAttractions.map((attraction, index) => (
              <div
                key={attraction.id}
                className={`w-full max-w-6xl mx-auto bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200 hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-500 group ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } flex flex-col lg:flex`}
                style={{ width: "90%" }}
              >
                {/* Image Slideshow */}
                <div className="relative lg:w-1/2 h-80 lg:h-96 overflow-hidden group">
                  <div className="relative w-full h-full">
                    <Image
                      src={attraction.images[currentImageIndexes[attraction.id] || 0] || "/placeholder.svg"}
                      alt={`${attraction.name} ${(currentImageIndexes[attraction.id] || 0) + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                      onClick={() =>
                        openFullScreen(attraction.images[currentImageIndexes[attraction.id] || 0] || "/placeholder.svg")
                      }
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={() => prevImage(attraction.id)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => nextImage(attraction.id)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Dots Navigation */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {attraction.images.map((_, imageIndex) => (
                      <button
                        key={imageIndex}
                        onClick={() => goToImage(attraction.id, imageIndex)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          imageIndex === (currentImageIndexes[attraction.id] || 0)
                            ? "bg-yellow-400 w-6"
                            : "bg-white/60 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 text-center lg:text-left group-hover:text-yellow-600 transition-colors duration-300">
                    {attraction.name}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8 text-center lg:text-left">
                    {attraction.description}
                  </p>
                  <div className="flex justify-center lg:justify-start">
                    <button
                      onClick={() => openBookingForm(attraction.name)}
                      className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-400/25 flex items-center space-x-2"
                    >
                      <Calendar className="w-5 h-5" />
                      <span>Book a Trip</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Screen Image Modal */}
      {showFullScreen && fullScreenImage && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <button
            onClick={closeFullScreen}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white hover:text-yellow-400 transition-all duration-300 p-3 rounded-full backdrop-blur-sm"
          >
            <X className="w-8 h-8" />
          </button>
          <Image
            src={fullScreenImage || "/placeholder.svg"}
            alt="Full screen view"
            width={1200}
            height={800}
            className="max-w-full max-h-full object-contain cursor-pointer"
            onClick={closeFullScreen}
          />
        </div>
      )}

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Plan Your Rwanda Trip</h3>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors"
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
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Selected Attraction</label>
                  <select
                    value={formData.selectedAttraction}
                    onChange={(e) => setFormData((prev) => ({ ...prev, selectedAttraction: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors"
                  >
                    {tourismAttractions.map((attraction) => (
                      <option key={attraction.id} value={`Tour: ${attraction.name}`}>
                        Tour: {attraction.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Date of Visit</label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, preferredDate: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message / Additional Requests (Optional)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                    placeholder="Number of people, special requirements, or any questions..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Trip Inquiry"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
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
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white p-3 rounded-full shadow-lg hover:shadow-yellow-400/25 transform hover:scale-110 transition-all duration-300"
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
                    href="https://www.instagram.com/black_benz_services/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    <Instagram size={20} />
                  </a>
                  
                  <a
                    href="https://x.com/BlackBenzServic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    <Twitter size={20} />
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
