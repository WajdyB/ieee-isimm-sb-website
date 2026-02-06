"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Aymen Ben Hassine",
    position: "IEEE ISIMM SB Founding Chairman - 2019-2020",
    image: "/testimonials/aymen-ben-hassine.png",
    testimonial:
      "Being the founding chairman of IEEE ISIMM Student Branch was both an honor and a challenge. We started with a vision to create a community where engineering students could grow, innovate, and make a difference. Building something from the ground up taught me that great achievements begin with small steps and unwavering commitment. I'm proud to see how far we've come.",
  },
  {
    id: 2,
    name: "Rihab Hmida",
    position: "IEEE ISIMM SB Chairwoman - 2020-2021",
    image: "/testimonials/rihab-hmida.png",
    testimonial:
      "Being the Chairwoman of IEEE ISIMM SB was the most rewarding experience of my student life. This role pushed me beyond my comfort zone, developing leadership skills I never knew I had. The responsibility of leading such a dynamic team taught me the true meaning of collaboration and perseverance.",
  },
  {
    id: 3,
    name: "Abdelhedi Ayed",
    position: "IEEE ISIMM SB Chairman - 2021-2022",
    image: "/testimonials/abdelhedi-ayed.png",
    testimonial:
      "My journey as Chairman of IEEE ISIMM SB was truly transformative. I learned the importance of strategic thinking, effective communication, and building lasting relationships. The experience of managing diverse projects while fostering a supportive environment for our members was incredibly rewarding.",
  },
  {
    id: 4,
    name: "Mohamed Aziz Ben Hmidene",
    position: "IEEE ISIMM SB Chairman - 2022-2023",
    image: "/testimonials/med-aziz-ben-hmidene.png",
    testimonial:
      "Leading IEEE ISIMM SB was a defining moment in my academic journey. The opportunity to innovate, inspire, and impact the engineering community was unparalleled. I discovered my passion for mentoring others and creating opportunities for growth. The friendships forged during this time remain my most valuable connections.",
  },
  {
    id: 5,
    name: "Louay Jabeur",
    position: "IEEE ISIMM SB Chairman - 2023-2024",
    image: "/testimonials/louay-jabeur.png",
    testimonial:
      "Serving as Chairman of IEEE ISIMM SB was an extraordinary experience that shaped my leadership philosophy. I learned to balance innovation with tradition, to listen before leading, and to create spaces where every voice matters. The most rewarding part was watching our members grow and succeed.",
  },
  {
    id: 6,
    name: "Yasser Bdioui",
    position: "IEEE ISIMM SB Chairman - 2024-2025",
    image: "/testimonials/yasser-bdioui.png",
    testimonial:
      "Leading IEEE ISIMM SB has been an incredible journey of growth and discovery. Every challenge we face together strengthens our community and every achievement we celebrate reinforces our commitment to excellence. I'm honored to guide this exceptional team as we write new chapters in our branch's legacy and create lasting impact in the engineering world.",
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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Former Chairs <span className="text-sky-500">Testimonials</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Hear from the leaders who shaped our journey and inspired generations of engineers
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Dialogue Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-16">
            {testimonials.map((testimonial, index) => {
              const isLeft = index % 2 === 0

              return (
                <div
                  key={testimonial.id}
                  className={`animate-on-scroll flex flex-col md:flex-row gap-6 items-start ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Profile Image */}
                  <div className="flex-shrink-0 mx-auto md:mx-0">
                    <div className="relative">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-sky-100 shadow-lg">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={160}
                          height={160}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Quote Icon Badge */}
                      <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center shadow-lg">
                        <Quote className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Speech Bubble */}
                  <div className="flex-1 relative">
                    {/* Triangle Pointer */}
                    <div
                      className={`absolute top-8 ${
                        isLeft ? "-left-3 md:-left-4" : "-left-3 md:-right-4 md:left-auto"
                      }`}
                    >
                      <div
                        className={`w-0 h-0 ${
                          isLeft
                            ? "border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent border-r-[20px] border-r-white md:border-r-white"
                            : "border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent border-r-[20px] border-r-white md:border-r-0 md:border-l-[20px] md:border-l-white"
                        }`}
                        style={{ filter: "drop-shadow(-2px 0px 3px rgba(0,0,0,0.05))" }}
                      />
                    </div>

                    {/* Bubble Content */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                      {/* Testimonial Text */}
                      <p className="text-gray-700 leading-relaxed mb-6 italic">
                        "{testimonial.testimonial}"
                      </p>

                      {/* Author Info */}
                      <div className={`border-t border-gray-100 pt-4 ${isLeft ? "text-left" : "text-left md:text-right"}`}>
                        <h4 className="font-bold text-gray-900 text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-sky-600 font-medium text-sm mt-1">
                          {testimonial.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center group animate-on-scroll">
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-4xl font-bold text-sky-500 mb-2">6</div>
                <p className="text-gray-600 font-medium">Former Chairs</p>
              </div>
            </div>
            <div className="text-center group animate-on-scroll">
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-4xl font-bold text-sky-500 mb-2">6</div>
                <p className="text-gray-600 font-medium">Years of Leadership</p>
              </div>
            </div>
            <div className="text-center group animate-on-scroll">
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-4xl font-bold text-sky-500 mb-2">100%</div>
                <p className="text-gray-600 font-medium">Dedication</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-sky-500 to-sky-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Share a Remarkable Moment</h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Have you experienced an unforgettable moment with IEEE ISIMM SB? We'd love to hear your story! 
              Share your experience, inspire others, and become part of our community's legacy.
            </p>
            <button 
              onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSd4nN-1TI45gglBtIlJhQhurgcMMrLr8x_bdEAbs1rH9uNTog/viewform', '_blank')}
              className="bg-white text-sky-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center gap-2"
            >
              <Quote className="w-5 h-5" />
              Share Your Story
            </button>
            <p className="text-sm mt-4 opacity-75">
              Your feedback helps us grow and improve our community
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
