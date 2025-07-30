"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Calendar, MapPin, Users, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock events data - in real app, this would come from your database
const eventsData = [
  {
    id: 1,
    title: "Engineering Innovation Summit",
    description:
      "Annual summit bringing together students, faculty, and industry professionals to showcase innovations.",
    date: "2024-03-15",
    location: "ISIMM Campus",
    attendees: 200,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  },
  {
    id: 2,
    title: "Technical Workshop Series",
    description: "Hands-on workshops covering emerging technologies and engineering practices.",
    date: "2024-02-28",
    location: "Engineering Labs",
    attendees: 75,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  },
  {
    id: 3,
    title: "Student Research Symposium",
    description: "Platform for students to present their research projects and innovations to the community.",
    date: "2024-02-10",
    location: "Main Auditorium",
    attendees: 150,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  },
  {
    id: 4,
    title: "Industry Networking Night",
    description: "An evening of networking and professional connections with industry leaders and alumni.",
    date: "2024-01-25",
    location: "Student Center",
    attendees: 120,
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
  },
  {
    id: 5,
    title: "Robotics Competition",
    description: "Annual robotics competition where teams design and build autonomous robots.",
    date: "2024-01-12",
    location: "Engineering Building",
    attendees: 90,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  },
  {
    id: 6,
    title: "Professional Development Workshop",
    description: "Workshop focusing on career development, resume building, and interview skills.",
    date: "2023-12-15",
    location: "Conference Room",
    attendees: 60,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  },
]

export default function EventsPage() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<(typeof eventsData)[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  const openLightbox = (event: (typeof eventsData)[0]) => {
    setSelectedEvent(event)
    setCurrentImageIndex(0)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedEvent(null)
    setCurrentImageIndex(0)
    document.body.style.overflow = "unset"
  }

  const nextImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex((prev) => (prev === selectedEvent.images.length - 1 ? 0 : prev + 1))
    }
  }

  const prevImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedEvent.images.length - 1 : prev - 1))
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-sky-500">Events</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover our past events and see the impact we're making in the engineering community
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventsData.map((event, index) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll cursor-pointer"
                onClick={() => openLightbox(event)}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={event.images[0] || "/placeholder.svg"}
                    alt={event.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-sky-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-sky-500">{event.images.length} photos</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-sky-500 transition-colors duration-200">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-sky-500" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-sky-500" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-sky-500" />
                      {event.attendees} attendees
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors duration-200"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {/* Image Navigation */}
            {selectedEvent.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors duration-200"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors duration-200"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
              </>
            )}

            {/* Main Image */}
            <div className="relative h-96">
              <Image
                src={selectedEvent.images[currentImageIndex] || "/placeholder.svg"}
                alt={selectedEvent.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Event Details */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{selectedEvent.title}</h2>
              <p className="text-gray-600 mb-4">{selectedEvent.description}</p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-sky-500" />
                  {formatDate(selectedEvent.date)}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-sky-500" />
                  {selectedEvent.location}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-sky-500" />
                  {selectedEvent.attendees} attendees
                </div>
              </div>

              {/* Image Thumbnails */}
              {selectedEvent.images.length > 1 && (
                <div className="mt-6">
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {selectedEvent.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                          index === currentImageIndex ? "border-sky-500" : "border-transparent"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${selectedEvent.title} ${index + 1}`}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-sky-500 to-sky-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Don't miss out on our upcoming events and activities. Follow us on social media and join our mailing list
              for the latest updates.
            </p>
            <Button size="lg" variant="secondary">
              Subscribe to Updates
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
