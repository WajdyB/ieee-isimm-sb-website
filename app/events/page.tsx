"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Calendar, MapPin, Users, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Event } from "@/types/event"

export default function EventsPage() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
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

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events')
        const data = await response.json()
        
        if (data.success) {
          setEvents(data.data)
        }
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const openLightbox = (event: Event) => {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    )
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
          {events.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Events Yet</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We haven't added any events yet. Check back soon for upcoming events and activities!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                  onClick={() => openLightbox(event)}
                >
                  <div className="relative overflow-hidden bg-gray-50">
                    <Image
                      src={event.images && event.images.length > 0 ? event.images[0] : "/placeholder.svg"}
                      alt={event.title}
                      width={400}
                      height={250}
                      className="w-full h-auto max-h-64 object-contain group-hover:scale-105 transition-transform duration-300"
                      unoptimized={event.images && event.images.length > 0 && event.images[0].startsWith('data:')}
                    />
                    <div className="absolute inset-0 bg-sky-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    {event.images && event.images.length > 0 && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-medium text-sky-500">{event.images.length} photos</span>
                      </div>
                    )}
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
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-gray-800/80 backdrop-blur-sm p-2 rounded-full hover:bg-gray-700/80 transition-colors duration-200"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {/* Image Navigation */}
            {selectedEvent.images && selectedEvent.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 backdrop-blur-sm p-2 rounded-full hover:bg-gray-700/80 transition-colors duration-200"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 backdrop-blur-sm p-2 rounded-full hover:bg-gray-700/80 transition-colors duration-200"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
              </>
            )}

            {/* Main Image */}
            <div className="relative bg-gray-50 flex items-center justify-center min-h-96">
              <Image
                src={selectedEvent.images && selectedEvent.images.length > 0 
                  ? selectedEvent.images[currentImageIndex] 
                  : "/placeholder.svg"}
                alt={selectedEvent.title}
                width={800}
                height={600}
                className="max-w-full max-h-96 object-contain"
                unoptimized={selectedEvent.images && selectedEvent.images.length > 0 && selectedEvent.images[currentImageIndex].startsWith('data:')}
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
              {selectedEvent.images && selectedEvent.images.length > 1 && (
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
                          src={image}
                          alt={`${selectedEvent.title} ${index + 1}`}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain bg-gray-100"
                          unoptimized={image.startsWith('data:')}
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
          <div className="max-w-4xl mx-auto text-center">
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
