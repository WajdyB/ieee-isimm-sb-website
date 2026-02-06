"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Star } from "lucide-react"

interface Award {
  id: number
  title: string
  shortDescription: string
  year: string
  image: string
}

const awards: Award[] = [
  {
    id: 1,
    title: "SMC & EdSoc Technical Challenge Winner",
    shortDescription: "First place at TSYP11 for innovative engineering solutions",
    year: "2023",
    image: "/awards/smc-technical-challenge.jpg"
  },
  {
    id: 2,
    title: "EMBS Technical Challenge Winner",
    shortDescription: "Leading the way in biomedical engineering innovation",
    year: "2023",
    image: "/awards/embs-technical-challenge.jpg"
  },
  {
    id: 3,
    title: "WIE ACT Technical Challenge Champion",
    shortDescription: "Championing diversity and excellence in engineering",
    year: "2024",
    image: "/awards/wie-act-technical-challenge-first-place.jpg"
  },
  {
    id: 4,
    title: "SIGHT Day Congress 2.0 Winners",
    shortDescription: "Organizing excellence and community impact recognized",
    year: "2024",
    image: "/awards/sdc-winners.jpg"
  }
]

export default function AwardsPage() {
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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-sky-500">Awards</span> & Recognition
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Celebrating excellence, innovation, and the achievements that define our journey
            </p>
          </div>
        </div>
      </section>

      {/* Awards Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Dynamic Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {awards.map((award, index) => (
              <div
                key={award.id}
                className={`animate-on-scroll group ${
                  index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border border-gray-100">
                  {/* Image Container */}
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={award.image}
                      alt={award.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.jpg"
                      }}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300"></div>
                    
                    {/* Year Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-bold text-gray-900">{award.year}</span>
                      </div>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl md:text-2xl font-bold mb-2 leading-tight">
                        {award.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                        {award.shortDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Impact in Numbers
              </h2>
              <p className="text-xl text-gray-600">
                Achievements that reflect our commitment to excellence
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center group animate-on-scroll">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-4xl font-bold text-sky-500 mb-2">4+</div>
                  <div className="text-sm text-gray-600 font-medium">Major Awards</div>
                </div>
              </div>
              
              <div className="text-center group animate-on-scroll">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-4xl font-bold text-sky-500 mb-2">6</div>
                  <div className="text-sm text-gray-600 font-medium">Years Active</div>
                </div>
              </div>
              
              <div className="text-center group animate-on-scroll">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-4xl font-bold text-sky-500 mb-2">1K+</div>
                  <div className="text-sm text-gray-600 font-medium">Students Impacted</div>
                </div>
              </div>
              
              <div className="text-center group animate-on-scroll">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-4xl font-bold text-sky-500 mb-2">5+</div>
                  <div className="text-sm text-gray-600 font-medium">Projects Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
