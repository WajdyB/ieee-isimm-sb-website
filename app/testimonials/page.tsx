"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Quote, Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Rihab Hmida",
    position: "IEEE ISIMM SB Chairwoman - 2020-2021",
    image: "/testimonials/rihab-hmida.png?height=100&width=100",
    testimonial:
      "Being the Chairwoman of IEEE ISIMM SB was the most rewarding experience of my student life. This role pushed me beyond my comfort zone, developing leadership skills I never knew I had. The responsibility of leading such a dynamic team taught me the true meaning of collaboration and perseverance. Every challenge we faced together strengthened our bond and made us stronger as a community.",
    rating: 5,
  },
  {
    id: 2,
    name: "Abdelhedi Ayed",
    position: "IEEE ISIMM SB Chairman - 2021-2022",
    image: "/testimonials/abdelhedi-ayed.png?height=100&width=100",
    testimonial:
      "My journey as Chairman of IEEE ISIMM SB was truly transformative. I learned the importance of strategic thinking, effective communication, and building lasting relationships. The experience of managing diverse projects while fostering a supportive environment for our members was incredibly rewarding. The skills I developed here continue to serve me in my professional career.",
    rating: 5,
  },
  {
    id: 3,
    name: "Mohamed Aziz Ben Hmidene",
    position: "IEEE ISIMM SB Chairman - 2022-2023",
    image: "/testimonials/med-aziz-ben-hmidene.png?height=100&width=100",
    testimonial:
      "Leading IEEE ISIMM SB was a defining moment in my academic journey. The opportunity to innovate, inspire, and impact the engineering community was unparalleled. I discovered my passion for mentoring others and creating opportunities for growth. The friendships forged during this time remain my most valuable connections, both personally and professionally.",
    rating: 5,
  },
  {
    id: 4,
    name: "Louay Jabeur",
    position: "IEEE ISIMM SB Chairman - 2023-2024",
    image: "/testimonials/louay-jabeur.png?height=100&width=100",
    testimonial:
      "Serving as Chairman of IEEE ISIMM SB was an extraordinary experience that shaped my leadership philosophy. I learned to balance innovation with tradition, to listen before leading, and to create spaces where every voice matters. The most rewarding part was watching our members grow and succeed, knowing I played a role in their development.",
    rating: 5,
  },
]

export default function TestimonialsPage() {
  const observerRef = useRef<IntersectionObserver | null>(null)

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

  return (
    <div className="min-h-screen">
      {/* Hero Section - Following original design */}
      <section className="bg-gradient-to-br from-sky-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Former Chairs <span className="text-sky-500">Testimonials</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Hear from the previous leaders of IEEE ISIMM Student Branch
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid - Following original card design */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll"
              >
                <div className="p-8">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                      <Quote className="h-6 w-6 text-sky-500" />
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm">"{testimonial.testimonial}"</p>

                  {/* Author Info */}
                  <div className="flex items-center pt-4 border-t border-gray-100">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-sky-600 transition-colors duration-200">
                        {testimonial.name}
                      </h4>
                      <p className="text-sky-600 text-sm font-medium">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Following original design */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 animate-on-scroll">
            <div className="text-center group">
              <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-sky-200 transition-colors duration-300">
                <Quote className="h-8 w-8 text-sky-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">100+</h3>
              <p className="text-gray-600">Success Stories</p>
            </div>
            <div className="text-center group">
              <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-sky-200 transition-colors duration-300">
                <Star className="h-8 w-8 text-sky-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">4.9/5</h3>
              <p className="text-gray-600">Average Rating</p>
            </div>
            <div className="text-center group">
              <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-sky-200 transition-colors duration-300">
                <Quote className="h-8 w-8 text-sky-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">95%</h3>
              <p className="text-gray-600">Would Recommend</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Following original design */}
      <section className="py-20 bg-gradient-to-r from-sky-500 to-sky-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Share Your Experience</h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Have you been part of IEEE ISIMM Student Branch? We'd love to hear about your experience and how it has
              impacted your personal and professional growth. Your story could inspire future members!
            </p>
            <button className="bg-white text-sky-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Share Your Story
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
