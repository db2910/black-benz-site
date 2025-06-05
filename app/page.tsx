"use client"

import type React from "react"
import Head from "next/head"


import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import LoadingScreen from "@/components/loading-screen"
import FormErrorModal from "@/components/form-error-modal"
import FormSuccessModal from "@/components/form-success-modal"
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  ChevronLeft,
  ChevronRight,
  Users,
  Settings,
  Zap,
  Fuel,
  Eye,
  Calendar,
  X,
  Menu,
} from "lucide-react"

const cars = [
  {
    id: 2,
    name: "Mercedes-Benz S-Class",
    image: "/pictures/sclass9.jpeg",
    features: [
      { icon: Users, text: "5 Seats" },
      { icon: Settings, text: "Automatic" },
      { icon: Zap, text: "3.0L V6 Turbo" },
      { icon: Fuel, text: "Petrol" },
    ],
    description: "The pinnacle of luxury sedans, offering unparalleled comfort and cutting-edge technology.",
    gallery: [
      "/pictures/sclass7.jpeg",
      "/pictures/sclass8.jpeg",
      "/pictures/sclass6.jpeg",
      "/pictures/sclass10.jpeg",
    ],
  },
  {
    id: 3,
    name: "Toyota Land Cruiser TXL",
    image: "/pictures/txl3.jpeg",
    features: [
      { icon: Users, text: "7 Seats" },
      { icon: Settings, text: "Automatic" },
      { icon: Zap, text: "4.4L V8 Twin-Turbo" },
      { icon: Fuel, text: "Petrol" },
    ],
    description: "a mid-range, well-equipped SUV with a robust off-road capability, featuring a sleek and sophisticated black paint job, offering both practicality and a stylish presence.",
    gallery: [
      "/pictures/txl1.jpeg",
      "/pictures/txl4.jpeg",
      "/pictures/txl2.jpeg",
      "/pictures/txl5.jpeg",
      "/pictures/txl6.jpeg",
    ],
  },
  {
    id: 4,
    name: "Mercedens-Benz V-Class",
    image: "/pictures/vclass11.jpeg",
    features: [
      { icon: Users, text: "5 Seats" },
      { icon: Settings, text: "Automatic" },
      { icon: Zap, text: "3.0L V6 TFSI" },
      { icon: Fuel, text: "Petrol" },
    ],
    description: "Experience luxury and versatility redefined. This spacious MPV offers premium comfort, flexible seating, and advanced technology for family adventures or executive travel.",
    gallery: [
      "/pictures/vclass10.jpeg",
      "/pictures/vclass5.jpeg",
      "/pictures/vclass6.jpeg",
      "/pictures/vclass7.jpeg",
      "/pictures/vclass8.jpeg",
      "/pictures/vclass9.jpeg",
    ],
  },
  {
    id: 6,
    name: "SUV Black Benz",
    image: "/pictures/sbenz5.jpeg",
    features: [
      { icon: Users, text: "5 Seats" },
      { icon: Settings, text: "Automatic" },
      { icon: Zap, text: "3.0L V6 Turbo" },
      { icon: Fuel, text: "Petrol" },
    ],
    description: "Sports car performance meets SUV practicality in this exceptional vehicle.",
    gallery: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
  },
  /*{
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
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
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
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
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
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
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
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
  },*/
]

const tourismAttractions = [
  {
    id: 1,
    name: "Volcanoes National Park",
    image: "/pictures/volca1.jpg",
    description:
      "Embark on an unforgettable journey to encounter majestic mountain gorillas in their natural habitat. A truly once-in-a-lifetime wildlife experience.",
  },
  {
    id: 2,
    name: "Nyungwe Forest National Park",
    image: "/pictures/nyung2.jpg",
    description:
      "Explore one of Africa's oldest rainforests, home to chimpanzees, diverse primate species, and the thrilling canopy walkway offering breathtaking views.",
  },
  {
    id: 3,
    name: "Akagera National Park",
    image: "/pictures/aka2.jpg",
    description:
      "Discover Rwanda's stunning savanna park, offering classic safari experiences with opportunities to see the Big Five and a rich variety of birdlife.",
  },
  {
    id: 4,
    name: "Lake Kivu",
    image: "/pictures/kivu2.jpg",
    description:
      "Relax by the serene shores of Lake Kivu, one of Africa's Great Lakes. Enjoy boat trips, kayaking, beautiful beaches, and stunning sunsets.",
  },
  {
    id: 5,
    name: "Kigali Genocide Memorial",
    image: "/pictures/gen1.jpg",
    description:
      "A poignant and important site for reflection and learning about Rwanda's history, honoring the victims of the 1994 Genocide against the Tutsi.",
  },
]

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentCarIndex, setCurrentCarIndex] = useState(0)
  const [showGallery, setShowGallery] = useState(false)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    selectedCar: "",
    message: "",
  })
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null)
  const [fullScreenImageIndex, setFullScreenImageIndex] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showTourismForm, setShowTourismForm] = useState(false)
  const [tourismFormData, setTourismFormData] = useState({
    name: "",
    email: "",
    phone: "",
    selectedAttraction: "",
    preferredDate: "",
    message: "",
  })
  const [isTourismSubmitting, setIsTourismSubmitting] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isPartialSuccess, setIsPartialSuccess] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)


  const handleLoadingComplete = () => {
    setIsLoading(false)
    setTimeout(() => {
      setIsLoaded(true)
    }, 100)
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const nextCar = () => {
    setCurrentCarIndex((prev) => (prev + 1) % cars.length)
  }

  const prevCar = () => {
    setCurrentCarIndex((prev) => (prev - 1 + cars.length) % cars.length)
  }

  const openBookingForm = () => {
    setFormData((prev) => ({
      ...prev,
      selectedCar: cars[currentCarIndex].name,
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

  const openFullScreenImage = (imageUrl: string, index: number) => {
    setFullScreenImage(imageUrl)
    setFullScreenImageIndex(index)
    setShowGallery(false) // Close the gallery modal when opening full-screen
  }

  const closeFullScreenImage = () => {
    setFullScreenImage(null)
  }

  const nextFullScreenImage = () => {
    const nextIndex = (fullScreenImageIndex + 1) % currentCar.gallery.length
    setFullScreenImageIndex(nextIndex)
    setFullScreenImage(currentCar.gallery[nextIndex])
  }

  const prevFullScreenImage = () => {
    const prevIndex = (fullScreenImageIndex - 1 + currentCar.gallery.length) % currentCar.gallery.length
    setFullScreenImageIndex(prevIndex)
    setFullScreenImage(currentCar.gallery[prevIndex])
  }

  const openTourismForm = (attractionName: string) => {
    setTourismFormData((prev) => ({
      ...prev,
      selectedAttraction: attractionName,
    }))
    setShowTourismForm(true)
  }

  const handleTourismFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsTourismSubmitting(true)

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...tourismFormData,
          formType: "tourism-booking",
        }),
      })

      const result = await response.json()

      if (result.success) {
        setShowTourismForm(false)
        setTourismFormData({ name: "", email: "", phone: "", selectedAttraction: "", preferredDate: "", message: "" })
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
      setIsTourismSubmitting(false)
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

  const currentCar = cars[currentCarIndex]

  // Show loading screen as loading
  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <>
    <Head>
        <title>Black Benz – Premium Luxury Car Rentals</title>
        <link rel="icon" href="/pictures/logo.jpeg" />
      </Head>
    <div className={`min-h-screen bg-black page-content ${isLoaded ? "animate-fadeIn" : "opacity-0"}`}>
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
          <Link href="/" className="text-white hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-colors duration-300 hover:underline decoration-yellow-400 underline-offset-4">
            Home
          </Link>
          <Link href="/car-rental" className="text-gray-300 hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-colors duration-300 hover:underline decoration-yellow-400 underline-offset-4">
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
      <div className="flex items-center space-x-4">
        <a href="https://www.instagram.com/black_benz_services/" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 hover:scale-110 transition-all duration-300">
          <Instagram size={20} />
        </a>
        <a href="https://x.com/BlackBenzServic" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 hover:scale-110 transition-all duration-300">
          <Twitter size={20} />
        </a>
        

        {/* Hamburger (mobile) */}
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
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="/videos/hero-background.mp4" type="video/mp4" />
          {/* Fallback background image */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900"></div>
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight transform transition-all duration-1000 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            We Rent{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Mercedes Benz
            </span>{" "}
            and So Many More Cars
          </h1>

          <p
            className={`text-xl sm:text-2xl md:text-3xl text-gray-200 font-light transform transition-all duration-1000 ease-out delay-300 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            We value the time and quality of travel
          </p>

          {/* Call to Action Button */}
          <div
            className={`mt-10 transform transition-all duration-1000 ease-out delay-500 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <Link
              href="/car-rental"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-black bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-400/25"
            >
              Book A Car
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Car Showcase Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              Explore Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                Fleet
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover our collection of premium luxury vehicles, each offering unmatched comfort and performance
            </p>
          </div>

          {/* Car Slider */}
          <div className="relative">
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Car Image */}
                <div className="relative h-96 lg:h-[500px] overflow-hidden">
                  <img
                    src={currentCar.image || "/placeholder.svg"}
                    alt={currentCar.name}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Car Information */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">{currentCar.name}</h3>

                  <p className="text-gray-300 text-lg mb-8 leading-relaxed">{currentCar.description}</p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {currentCar.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <feature.icon className="w-5 h-5 text-yellow-400" />
                        <span className="text-gray-300">{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setShowGallery(true)}
                      className="flex items-center justify-center px-6 py-3 bg-transparent border-2 border-yellow-400 text-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-black transition-all duration-300 font-semibold"
                    >
                      <Eye className="w-5 h-5 mr-2" />
                      View Gallery
                    </button>
                    <button
                      onClick={openBookingForm}
                      className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 font-semibold"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Book This Car
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevCar}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/80 hover:bg-black text-yellow-400 p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextCar}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/80 hover:bg-black text-yellow-400 p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {cars.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCarIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentCarIndex ? "bg-yellow-400" : "bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tourism Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              Visit{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                Rwanda
              </span>{" "}
              With Us
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover the Land of a Thousand Hills with our premium tourism services and unforgettable experiences
            </p>
          </div>

          {/* Attractions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tourismAttractions.map((attraction) => (
              <div
                key={attraction.id}
                className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-yellow-400/10 transform hover:scale-105 transition-all duration-300 group"
              >
                {/* Attraction Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={attraction.image || "/placeholder.svg"}
                    alt={attraction.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                    {attraction.name}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">{attraction.description}</p>

                  {/* Book Trip Button */}
                  <button
                    onClick={() => openTourismForm(attraction.name)}
                    className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-400/25"
                  >
                    Book a Trip
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">{currentCar.name} Gallery</h3>
                <button
                  onClick={() => setShowGallery(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentCar.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => openFullScreenImage(image, index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${currentCar.name} ${index + 1}`}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

     {/* Full Screen Image Modal */}
{fullScreenImage && (
  <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center backdrop-blur-sm">
    {/* Close Button */}
    <button
      onClick={closeFullScreenImage}
      className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white hover:text-yellow-400 z-60 p-3 rounded-full transition-all duration-300"
      aria-label="Close full screen"
    >
      <X className="w-8 h-8" />
    </button>

    {/* Prev Arrow */}
    <button
      onClick={prevFullScreenImage}
      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white hover:text-yellow-400 z-60 p-3 rounded-full backdrop-blur-sm transition-all duration-300"
      aria-label="Previous image"
    >
      <ChevronLeft className="w-8 h-8" />
    </button>

    {/* Next Arrow */}
    <button
      onClick={nextFullScreenImage}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white hover:text-yellow-400 z-60 p-3 rounded-full backdrop-blur-sm transition-all duration-300"
      aria-label="Next image"
    >
      <ChevronRight className="w-8 h-8" />
    </button>

    {/* The Image Itself */}
    <img
      src={fullScreenImage}
      alt={`${currentCar.name} full screen`}
      className="max-w-full max-h-full object-contain"
      onClick={closeFullScreenImage}
    />

    {/* Counter */}
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-sm px-4 py-2 rounded-full backdrop-blur-sm z-60">
      {fullScreenImageIndex + 1} / {currentCar.gallery.length}
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
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Name *</label>
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
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Email *</label>
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
                    {cars.map((car) => (
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

      {/* Tourism Booking Form Modal */}
      {showTourismForm && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Plan Your Rwanda Trip</h3>
                <button
                  onClick={() => setShowTourismForm(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleTourismFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={tourismFormData.name}
                    onChange={(e) => setTourismFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={tourismFormData.email}
                    onChange={(e) => setTourismFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={tourismFormData.phone}
                    onChange={(e) => setTourismFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Selected Attraction</label>
                  <select
                    value={tourismFormData.selectedAttraction}
                    onChange={(e) => setTourismFormData((prev) => ({ ...prev, selectedAttraction: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors"
                  >
                    {tourismAttractions.map((attraction) => (
                      <option key={attraction.id} value={attraction.name}>
                        {attraction.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Date of Visit</label>
                  <input
                    type="date"
                    value={tourismFormData.preferredDate}
                    onChange={(e) => setTourismFormData((prev) => ({ ...prev, preferredDate: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message / Additional Requests (Optional)
                  </label>
                  <textarea
                    value={tourismFormData.message}
                    onChange={(e) => setTourismFormData((prev) => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                    placeholder="Number of people, special requirements, or any questions..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isTourismSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isTourismSubmitting ? "Sending..." : "Send Trip Inquiry"}
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

      {/* Mobile Menu (Hidden by default, can be toggled) */}
      <div className="md:hidden fixed top-16 left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-gray-800 z-40 hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/" className="block px-3 py-2 text-white hover:text-yellow-400 text-base font-medium">
            Home
          </Link>
          <Link
            href="/car-rental"
            className="block px-3 py-2 text-gray-300 hover:text-yellow-400 text-base font-medium"
          >
            Car Rental
          </Link>
          <Link href="/tourism" className="block px-3 py-2 text-gray-300 hover:text-yellow-400 text-base font-medium">
            Tourism
          </Link>
          <Link
            href="/contact-us"
            className="block px-3 py-2 text-gray-300 hover:text-yellow-400 text-base font-medium"
          >
            Contact Us
          </Link>
        </div>
      </div>

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
  width={100}
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
    </>
  )
}
