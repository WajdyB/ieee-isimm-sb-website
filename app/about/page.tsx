"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Target, Eye, Heart, Users, Lightbulb, Globe } from "lucide-react"
import { aboutGalleryImages } from "@/components/about-gallery"

export default function AboutPage() {
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
              About <span className="text-sky-500">IEEE ISIMM</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover our journey, mission, and commitment to advancing technology for humanity
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll">
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 text-sky-500 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                To foster technological innovation and professional development among engineering students at ISIMM. We
                provide a dynamic platform for learning, networking, and collaboration that prepares our members to
                become leaders in their fields and contribute meaningfully to society through engineering excellence and
                ethical practice.
              </p>
              <div className="flex items-center mb-6">
                <Eye className="h-8 w-8 text-sky-500 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                To be the premier student organization that bridges the gap between academic learning and professional
                practice. We envision a community where students are empowered to innovate, collaborate, and lead in
                solving the world's most pressing challenges through engineering and technology.
              </p>
            </div>
            <div className="animate-on-scroll">
              <div className="relative">
                <div className="absolute inset-0 bg-sky-200 rounded-3xl transform -rotate-6"></div>
                <Image
                  src="/logos/logo-isimm-sb.png?height=500&width=600"
                  alt="IEEE ISIMM Mission"
                  width={600}
                  height={500}
                  className="relative rounded-3xl shadow-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Excellence",
                description:
                  "We strive for excellence in all our endeavors, from academic pursuits to professional development.",
              },
              {
                icon: Users,
                title: "Collaboration",
                description:
                  "Building strong partnerships among students, faculty, and industry to foster innovation and growth.",
              },
              {
                icon: Lightbulb,
                title: "Innovation",
                description:
                  "Encouraging creative thinking and innovative solutions to address real-world engineering challenges.",
              },
              {
                icon: Globe,
                title: "Global Impact",
                description:
                  "Contributing to technological advancement that benefits society and improves quality of life worldwide.",
              },
              {
                icon: Target,
                title: "Professional Growth",
                description:
                  "Providing opportunities for continuous learning and professional development throughout our members' careers.",
              },
              {
                icon: Eye,
                title: "Ethical Leadership",
                description:
                  "Promoting ethical practices and responsible leadership in engineering and technology development.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group animate-on-scroll"
              >
                <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-sky-200 transition-colors duration-300">
                  <value.icon className="h-8 w-8 text-sky-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey in Pictures</h2>
            <p className="text-xl text-gray-600">Moments that define our community and achievements</p>
          </div>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
            {aboutGalleryImages.map((img, i) => (
              <div key={i} className="relative group overflow-hidden rounded-lg animate-on-scroll bg-white shadow-lg break-inside-avoid mb-6">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={300}
                  height={300}
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-300"
                  priority={i < 8}
                />
                <div className="absolute inset-0 bg-sky-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="text-white text-center">
                    <p className="font-semibold">{img.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-sky-500 to-sky-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Be part of a dynamic network of engineering students and professionals who are shaping the future of
              technology. Together, we can make a meaningful impact and advance technology for the benefit of humanity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="https://www.facebook.com/IEEEISIMMSB" 
                target="_blank"
                className="bg-white text-sky-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-block text-center"
              >
                Get Involved
              </Link>
              <Link 
                href="/contact" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-sky-500 transition-colors duration-200 inline-block text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
