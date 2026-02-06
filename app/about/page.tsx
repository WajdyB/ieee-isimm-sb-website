"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Target, Eye, Heart, Users, Lightbulb, Globe } from "lucide-react"

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
      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              WHO <span className="text-sky-500">ARE</span> WE
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover our journey, mission, and commitment to advancing technology for humanity
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll">
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 text-sky-500 mr-3" />
                <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                To foster technological innovation and professional development among engineering students at ISIMM. We
                provide a dynamic platform for learning, networking, and collaboration that prepares our members to
                become leaders in their fields and contribute meaningfully to society through engineering excellence and
                ethical practice.
              </p>
              <div className="flex items-center mb-6">
                <Eye className="h-8 w-8 text-sky-500 mr-3" />
                <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
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
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground">The principles that guide everything we do</p>
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
                className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group animate-on-scroll"
              >
                <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-sky-200 transition-colors duration-300">
                  <value.icon className="h-8 w-8 text-sky-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Polaroid Gallery */}
      <section className="py-20 bg-gradient-to-b from-white to-sky-50 relative overflow-hidden">
        {/* Decorative Background Dots - Fixed positions */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute w-2 h-2 bg-gray-400 rounded-full" style={{ left: '10%', top: '15%', opacity: 0.2 }} />
          <div className="absolute w-2 h-2 bg-gray-400 rounded-full" style={{ left: '25%', top: '8%', opacity: 0.15 }} />
          <div className="absolute w-2 h-2 bg-gray-400 rounded-full" style={{ left: '45%', top: '12%', opacity: 0.25 }} />
          <div className="absolute w-2 h-2 bg-gray-400 rounded-full" style={{ left: '65%', top: '5%', opacity: 0.18 }} />
          <div className="absolute w-2 h-2 bg-gray-400 rounded-full" style={{ left: '85%', top: '18%', opacity: 0.22 }} />
          <div className="absolute w-2 h-2 bg-gray-400 rounded-full" style={{ left: '15%', top: '35%', opacity: 0.15 }} />
          <div className="absolute w-2 h-2 bg-gray-400 rounded-full" style={{ left: '35%', top: '42%', opacity: 0.2 }} />
          <div className="absolute w-2 h-2 bg-gray-400 rounded-full" style={{ left: '55%', top: '38%', opacity: 0.18 }} />
          <div className="absolute w-2 h-2 bg-gray-400 rounded-full" style={{ left: '75%', top: '45%', opacity: 0.25 }} />
          <div className="absolute w-2 h-2 bg-gray-400 rounded-full" style={{ left: '92%', top: '32%', opacity: 0.15 }} />
          <div className="absolute w-2 h-2 bg-gray-400 rounded-full" style={{ left: '8%', top: '58%', opacity: 0.22 }} />
          <div className="absolute w-2 h-2 bg-gray-400 rounded-full" style={{ left: '28%', top: '65%', opacity: 0.18 }} />
          <div className="absolute w-2 h-2 bg-gray-400 rounded-full" style={{ left: '48%', top: '62%', opacity: 0.2 }} />
          <div className="absolute w-2 h-2 bg-gray-400 rounded-full" style={{ left: '68%', top: '68%', opacity: 0.15 }} />
          <div className="absolute w-2 h-2 bg-gray-400 rounded-full" style={{ left: '88%', top: '55%', opacity: 0.25 }} />
          <div className="absolute w-2 h-2 bg-gray-400 rounded-full" style={{ left: '12%', top: '82%', opacity: 0.18 }} />
          <div className="absolute w-2 h-2 bg-gray-400 rounded-full" style={{ left: '32%', top: '88%', opacity: 0.2 }} />
          <div className="absolute w-2 h-2 bg-gray-400 rounded-full" style={{ left: '52%', top: '78%', opacity: 0.22 }} />
          <div className="absolute w-2 h-2 bg-gray-400 rounded-full" style={{ left: '72%', top: '85%', opacity: 0.15 }} />
          <div className="absolute w-2 h-2 bg-gray-400 rounded-full" style={{ left: '90%', top: '92%', opacity: 0.25 }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Some of our <span className="text-sky-500">family memories</span>
            </h2>
            <p className="text-xl text-gray-600">
              Moments that bring us together and make us stronger
            </p>
          </div>

          {/* Floating Polaroid Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 max-w-7xl mx-auto">
            {[
              { img: '1.JPG', caption: 'IEEE Day Celebration', rotation: -3 },
              { img: '2.jpg', caption: 'Team Building', rotation: 2 },
              { img: '3.jpg', caption: 'Workshop Session', rotation: -2 },
              { img: '4.jpg', caption: 'Opening Ceremony', rotation: 3 },
              { img: '5.jpg', caption: 'Community Gathering', rotation: -4 },
              { img: '6.jpg', caption: 'TSYP Congress', rotation: 2 },
              { img: '7.jpg', caption: 'IEEE Xtreme', rotation: -3 },
              { img: '8.jpg', caption: 'Technical Challenge', rotation: 4 },
              { img: '9.JPG', caption: 'Networking Event', rotation: -2 },
              { img: '10.jpg', caption: 'Awards Ceremony', rotation: 3 },
              { img: '11.jpg', caption: 'Integration Day', rotation: -3 },
              { img: '12.jpg', caption: 'Happy Moments', rotation: 2 },
              { img: '13.jpg', caption: 'SIGHT Day Congress', rotation: -4 },
              { img: '14.jpg', caption: 'Training Session', rotation: 3 },
              { img: '15.JPG', caption: 'Group Activity', rotation: -2 },
              { img: '16.jpg', caption: 'Competition Day', rotation: 4 },
              { img: '17.jpg', caption: 'Cultural Event', rotation: -3 },
              { img: '18.jpg', caption: 'Teamwork', rotation: 2 },
              { img: '19.jpg', caption: 'Celebration Time', rotation: -2 },
              { img: '20.jpg', caption: 'Conference Day', rotation: 3 },
              { img: '21.jpg', caption: 'Annual Meeting', rotation: -4 },
              { img: '22.jpeg', caption: 'Success Stories', rotation: 2 },
              { img: '23.jpeg', caption: 'Together Strong', rotation: -3 },
              { img: '24.png', caption: 'Memorable Moments', rotation: 3 },
            ].map((photo, index) => (
              <div
                key={index}
                className="animate-on-scroll"
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  transform: `translateY(${(index % 3) * 15}px)` 
                }}
              >
                {/* Polaroid Frame */}
                <div
                  className="polaroid-frame group"
                  style={{
                    transform: `rotate(${photo.rotation}deg)`,
                  }}
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden bg-white p-3 shadow-xl rounded-sm">
                    <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                      <Image
                        src={`/gallery-about/${photo.img}`}
                        alt={photo.caption}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        unoptimized
                      />
                    </div>
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
            <Link 
              href="https://docs.google.com/forms/d/e/1FAIpQLSf0m5l1VVyXbZ0R96UV5C53vz1mc8G80nxB8v_T32lfT93qDQ/viewform" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card text-sky-500 px-8 py-3 rounded-lg font-semibold hover:bg-card/95 transition-colors duration-200 inline-block text-center"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
