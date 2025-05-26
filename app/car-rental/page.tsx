"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Users,
  Settings,
  Zap,
  Fuel,
  Eye,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Menu, 
} from "lucide-react"

import FormErrorModal from "@/components/form-error-modal"
import FormSuccessModal from "@/components/form-success-modal"

// Extended car data with more vehicles
const allCars = [
  {
    id: 1,
    name: "Mercedes-Benz G-Wagon",
    image: "/pictures/wagon1.jpg",
    features: [
      { icon: Users, text: "5 Seats" },
      { icon: Settings, text: "Automatic" },
      { icon: Zap, text: "4.0L V8 Bi-Turbo" },
      { icon: Fuel, text: "Petrol" },
    ],
    description: "The ultimate luxury SUV combining rugged capability with unmatched comfort and style.",
    gallery: [
      "/pictures/wagon3.jpg",
      "/pictures/wagon4.jpg",
      "/pictures/wagon5.jpg",
    ],
  },
  {
    id: 2,
    name: "Mercedes-Benz S-Class",
    image: "/pictures/sclass1.jpg",
    features: [
      { icon: Users, text: "5 Seats" },
      { icon: Settings, text: "Automatic" },
      { icon: Zap, text: "3.0L V6 Turbo" },
      { icon: Fuel, text: "Petrol" },
    ],
    description: "The pinnacle of luxury sedans, offering unparalleled comfort and cutting-edge technology.",
    gallery: [
      "/pictures/sclass2.jpg",
      "/pictures/sclass3.jpg",
      "/pictures/sclass4.jpg",
    ],
  },
  {
    id: 3,
    name: "Toyota Land Cruiser TXL",
    image: "/pictures/txl1.jpeg",
    features: [
      { icon: Users, text: "7 Seats" },
      { icon: Settings, text: "Automatic" },
      { icon: Zap, text: "4.4L V8 Twin-Turbo" },
      { icon: Fuel, text: "Petrol" },
    ],
    description: "a mid-range, well-equipped SUV with a robust off-road capability, featuring a sleek and sophisticated black paint job, offering both practicality and a stylish presence.",
    gallery: [
      "/pictures/txl2.jpeg",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
  },
  {
    id: 4,
    name: "Mercedens-Benz V-Class",
    image: "/pictures/vclass1.jpeg",
    features: [
      { icon: Users, text: "5 Seats" },
      { icon: Settings, text: "Automatic" },
      { icon: Zap, text: "3.0L V6 TFSI" },
      { icon: Fuel, text: "Petrol" },
    ],
    description: "Experience luxury and versatility redefined. This spacious MPV offers premium comfort, flexible seating, and advanced technology for family adventures or executive travel.",
    gallery: [
      "/pictures/vclass2.jpeg",
      "/pictures/vclass3.jpeg",
      "/pictures/vclass4.jpeg",
    ],
  },
  {
    id: 5,
    name: "Range Rover Vogue",
    image: "/pictures/range1.jpeg",
    features: [
      { icon: Users, text: "5 Seats" },
      { icon: Settings, text: "Automatic" },
      { icon: Zap, text: "5.0L V8 Supercharged" },
      { icon: Fuel, text: "Petrol" },
    ],
    description: "The ultimate expression of luxury and capability, perfect for any terrain.",
    gallery: [
      "/pictures/range2.jpeg",
      "/pictures/range3.jpeg",
      "/pictures/range4.jpeg",
    ],
  },
  {
    id: 6,
    name: "SUV Black Benz",
    image: "/pictures/sbenz1.jpeg",
    features: [
      { icon: Users, text: "5 Seats" },
      { icon: Settings, text: "Automatic" },
      { icon: Zap, text: "3.0L V6 Turbo" },
      { icon: Fuel, text: "Petrol" },
    ],
    description: "Sports car performance meets SUV practicality in this exceptional vehicle.",
    gallery: [
      "/pictures/sbenz2.jpeg",
      "/pictures/sbenz3.jpeg",
      "/pictures/sbenz4.jpeg",
    ],
  },
  {
    id: 7,
    name: "Bentley Bentayga",
    image: "/placeholder.svg?height=400&width=600",
    features: [
      { icon: Users, text: "5 Seats" },
      { icon: Settings, text: "Automatic" },
      { icon: Zap, text: "4.0L V8 Twin-Turbo" },
      { icon: Fuel, text: "Petrol" },
    ],
    description: "Handcrafted luxury SUV offering unmatched refinement and bespoke comfort.",
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: 8,
    name: "Lamborghini Urus",
    image: "/placeholder.svg?height=400&width=600",
    features: [
      { icon: Users, text: "5 Seats" },
      { icon: Settings, text: "Automatic" },
      { icon: Zap, text: "4.0L V8 Twin-Turbo" },
      { icon: Fuel, text: "Petrol" },
    ],
    description: "The world's first Super Sport Utility Vehicle, combining luxury with extreme performance.",
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: 9,
    name: "Rolls-Royce Cullinan",
    image: "/placeholder.svg?height=400&width=600",
    features: [
      { icon: Users, text: "5 Seats" },
      { icon: Settings, text: "Automatic" },
      { icon: Zap, text: "6.75L V12 Twin-Turbo" },
      { icon: Fuel, text: "Petrol" },
    ],
    description: "The pinnacle of luxury SUVs, offering effortless performance and supreme comfort.",
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: 10,
    name: "Maserati Levante",
    image: "/placeholder.svg?height=400&width=600",
    features: [
      { icon: Users, text: "5 Seats" },
      { icon: Settings, text: "Automatic" },
      { icon: Zap, text: "3.0L V6 Twin-Turbo" },
      { icon: Fuel, text: "Petrol" },
    ],
    description: "Italian luxury and performance combined in this distinctive and elegant SUV.",
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: 11,
    name: "Tesla Model X",
    image: "/placeholder.svg?height=400&width=600",
    features: [
      { icon: Users, text: "7 Seats" },
      { icon: Settings, text: "Automatic" },
      { icon: Zap, text: "Electric Dual Motor" },
      { icon: Fuel, text: "Electric" },
    ],
    description: "Revolutionary electric SUV with falcon-wing doors and cutting-edge technology.",
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: 12,
    name: "Jaguar F-PACE",
    image: "/placeholder.svg?height=400&width=600",
    features: [
      { icon: Users, text: "5 Seats" },
      { icon: Settings, text: "Automatic" },
      { icon: Zap, text: "3.0L V6 Supercharged" },
      { icon: Fuel, text: "Petrol" },
    ],
    description: "British luxury SUV combining performance, style, and practicality in perfect harmony.",
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
]

export default function CarRentalPage() {
  const [displayedCars, setDisplayedCars] = useState(allCars.slice(0, 6))
  const [showGallery, setShowGallery] = useState(false)
  const [selectedCar, setSelectedCar] = useState<(typeof allCars)[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    selectedCar: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isPartialSuccess, setIsPartialSuccess] = useState(false)

  const [menuOpen, setMenuOpen] = useState(false);

  const loadMoreCars = () => {
    const currentLength = displayedCars.length
    const nextCars = allCars.slice(currentLength, currentLength + 6)
    setDisplayedCars([...displayedCars, ...nextCars])
  }

  const openGallery = (car: (typeof allCars)[0]) => {
    setSelectedCar(car)
    setCurrentImageIndex(0)
    setShowGallery(true)
    setIsZoomed(false)
  }

  const closeGallery = () => {
    setShowGallery(false)
    setSelectedCar(null)
    setIsZoomed(false)
  }

  const nextImage = () => {
    if (selectedCar) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedCar.gallery.length)
    }
  }

  const prevImage = () => {
    if (selectedCar) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedCar.gallery.length) % selectedCar.gallery.length)
    }
  }

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
  }

  const openBookingForm = (car: (typeof allCars)[0]) => {
    setFormData((prev) => ({
      ...prev,
      selectedCar: car.name,
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
          formType: "car-booking",
        }),
      })

      const result = await response.json()

      if (result.success) {
        setShowBookingForm(false)
        setFormData({ name: "", email: "", phone: "", selectedCar: "", message: "" })
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

  // Handle scroll for back to top button
  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
                <Link href="/car-rental" className="text-white hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-colors duration-300 hover:underline decoration-yellow-400 underline-offset-4">
                  Car Rental
                </Link>
                <Link href="/tourism" className="text-gray-300 hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-colors duration-300 hover:underline decoration-yellow-400 underline-offset-4">
                  Tourism
                </Link>
                <Link href="/contact-us" className="text-gray-300 hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-colors duration-300 hover:underline decoration-yellow-400 underline-offset-4">
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Social + Hamburger */}
            {/* Social + Hamburger */}
<div className="flex items-center space-x-4">
  <a
    href="https://instagram.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-yellow-400 hover:text-yellow-300 hover:scale-110 transition-all duration-300"
  >
    <Instagram size={20} />
  </a>
  <a
    href="https://facebook.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-yellow-400 hover:text-yellow-300 hover:scale-110 transition-all duration-300"
  >
    <Facebook size={20} />
  </a>
  <a
    href="https://twitter.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-yellow-400 hover:text-yellow-300 hover:scale-110 transition-all duration-300"
  >
    <Twitter size={20} />
  </a>
  <a
    href="https://linkedin.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-yellow-400 hover:text-yellow-300 hover:scale-110 transition-all duration-300"
  >
    <Linkedin size={20} />
  </a>

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
            Our Fleet of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Vehicles
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our premium selection of vehicles and book the perfect car for your journey today! From luxury
            sedans to powerful SUVs, we have the ideal vehicle for every occasion.
          </p>
        </div>
      </section>

      {/* Car Display Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Car Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {displayedCars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
              >
                {/* Car Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={car.image || "/placeholder.svg"}
                    alt={car.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors duration-300">
                    {car.name}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{car.description}</p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <feature.icon className="w-4 h-4 text-yellow-500" />
                        <span className="text-gray-700 text-sm">{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => openGallery(car)}
                      className="flex items-center justify-center px-4 py-3 bg-transparent border-2 border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-500 hover:text-white transition-all duration-300 font-semibold"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Gallery
                    </button>
                    <button
                      onClick={() => openBookingForm(car)}
                      className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 font-semibold"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {displayedCars.length < allCars.length && (
            <div className="text-center">
              <button
                onClick={loadMoreCars}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-400/25"
              >
                Load More Vehicles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Gallery Modal */}
      {showGallery && selectedCar && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeGallery}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white hover:text-yellow-400 transition-all duration-300 z-60 p-3 rounded-full backdrop-blur-sm"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white hover:text-yellow-400 transition-all duration-300 z-60 p-3 rounded-full backdrop-blur-sm"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white hover:text-yellow-400 transition-all duration-300 z-60 p-3 rounded-full backdrop-blur-sm"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Zoom Controls */}
          <div className="absolute top-4 left-4 flex space-x-2 z-60">
            <button
              onClick={toggleZoom}
              className="bg-black/50 hover:bg-black/70 text-white hover:text-yellow-400 transition-all duration-300 p-3 rounded-full backdrop-blur-sm"
            >
              {isZoomed ? <ZoomOut className="w-6 h-6" /> : <ZoomIn className="w-6 h-6" />}
            </button>
          </div>

          {/* Main Image */}
          <div className="relative max-w-5xl max-h-[80vh] mx-4">
            <Image
              src={selectedCar.gallery[currentImageIndex] || "/placeholder.svg"}
              alt={`${selectedCar.name} ${currentImageIndex + 1}`}
              width={800}
              height={600}
              className={`object-contain cursor-pointer transition-transform duration-300 ${
                isZoomed ? "scale-150" : "scale-100"
              }`}
              onClick={toggleZoom}
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-sm px-4 py-2 rounded-full backdrop-blur-sm">
            {currentImageIndex + 1} / {selectedCar.gallery.length}
          </div>

          {/* Thumbnail Navigation */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-md overflow-x-auto">
            {selectedCar.gallery.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  index === currentImageIndex ? "border-yellow-400" : "border-gray-600 hover:border-gray-400"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${selectedCar.name} thumbnail ${index + 1}`}
                  width={64}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Car Info */}
          <div className="absolute top-20 left-4 bg-black/50 text-white p-4 rounded-lg backdrop-blur-sm max-w-xs">
            <h3 className="text-xl font-bold text-yellow-400 mb-2">{selectedCar.name}</h3>
            <p className="text-sm text-gray-300">{selectedCar.description}</p>
          </div>
        </div>
      )}

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Book Your Car</h3>
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
                  <label className="block text-sm font-medium text-gray-300 mb-2">Selected Car</label>
                  <select
                    value={formData.selectedCar}
                    onChange={(e) => setFormData((prev) => ({ ...prev, selectedCar: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors"
                  >
                    {allCars.map((car) => (
                      <option key={car.id} value={car.name}>
                        {car.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message (Optional)</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                    placeholder="Any special requests or questions?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Booking Request"}
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
  width={100}
  height={48}
  className="rounded-lg"
/>

                <span className="ml-3 text-white font-semibold text-lg">Black Benz</span>
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
