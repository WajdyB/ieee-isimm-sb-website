"use client"

import { useEffect, useRef } from "react"
import { Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const timelineEvents = [
  {
    id: 7,
    date: "2024 - Present",
    title: "Today...",
    description:
      "While many days hold special occasions and events for our Student Branch, it goes without saying that everyday is a special one. IEEE is not just an organization, it develops to be a lifestyle that fosters an endearing sense of belonging. Whether it's organizing events, participating in various events, it certainly is a remarkable one with you... as part of IEEE.",
    type: "present",
    logo: null,
  },
  {
    id: 6,
    date: "22-23-24, December 2024",
    title: "Tunisian Students and Young Professionals Congress 12",
    description:
      "Our latest participation in TSYP Congress 12, representing the culmination of our journey and achievements. This event showcased our continued growth and strong leadership in the Tunisian IEEE community, marking another successful year of advancement.",
    type: "event",
    logo: "/timeline/tsyp-12-logo.png",
  },
  {
    id: 5,
    date: "18-19-20, December 2023",
    title: "Tunisian Students and Young Professionals Congress 11",
    description:
      "Continuing our tradition of excellence at TSYP Congress 11, we demonstrated our ongoing commitment to innovation and collaboration. This event reinforced our position as a leading student branch in Tunisia and showcased our latest technological achievements.",
    type: "event",
    logo: "/timeline/tsyp-11-logo.png",
  },
  {
    id: 4,
    date: "19-20-21, December 2022",
    title: "Tunisian Students and Young Professionals Congress X",
    description:
      "A milestone year as we celebrated the 10th edition of TSYP Congress. Our participation showcased our growth and maturity as a student branch, with strong leadership representation that highlighted our commitment to excellence.",
    type: "event",
    logo: "/timeline/tsyp-10-logo.png",
  },
  {
    id: 3,
    date: "19-20-21, December 2021",
    title: "Tunisian Students and Young Professionals Congress 9.0",
    description:
      "Building on our previous experience, we participated in TSYP Congress 9.0. This event strengthened our connections with other student branches and expanded our network within the Tunisian IEEE community.",
    type: "event",
    logo: "/timeline/tsyp-9-logo.png",
  },
  {
    id: 2,
    date: "14-15-16, Mars 2021",
    title: "Tunisian Students and Young Professionals Congress 8.0",
    description:
      "Our first participation in the prestigious TSYP Congress 8.0, where we connected with fellow IEEE members across Tunisia. This event marked our entry into the national IEEE community and established our presence in the Tunisian engineering ecosystem.",
    type: "event",
    logo: "/timeline/tsyp-8-logo.png",
  },
  {
    id: 1,
    date: "19, February 2019",
    title: "Foundation of the IEEE ISIMM Student Branch",
    description:
      "A historic day marking the birth of IEEE ISIMM Student Branch. This foundation established our commitment to advancing technology for humanity and created a platform for engineering students to develop professionally, network, and contribute to the global IEEE community.",
    type: "foundation",
    logo: null,
  },
]

export default function TimelinePage() {
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

  const getEventColor = (type: string) => {
    switch (type) {
      case "foundation":
        return "bg-green-500"
      case "event":
        return "bg-blue-500"
      case "gathering":
        return "bg-purple-500"
      case "collaboration":
        return "bg-pink-500"
      case "present":
        return "bg-sky-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-sky-500">Story</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
              6 years of glory and unforgettable memories!
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Journey through the milestones that shaped our organization
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-sky-200"></div>

              {/* Timeline Events */}
              <div className="space-y-12">
                {timelineEvents.map((event, index) => (
                  <div key={event.id} className="relative animate-on-scroll">
                    {/* Timeline Dot */}
                    <div
                      className={`absolute left-6 w-4 h-4 rounded-full ${getEventColor(event.type)} border-4 border-white shadow-lg z-10`}
                    ></div>

                    {/* Content */}
                    <div className="ml-20">
                      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <Calendar className="w-5 h-5 text-sky-500 mr-2" />
                            <span className="text-sky-600 font-semibold">{event.date}</span>
                          </div>
                          {event.logo && (
                            <div className="flex-shrink-0">
                              <Image
                                src={event.logo}
                                alt={`${event.title} Logo`}
                                width={60}
                                height={60}
                                className="w-12 h-12 object-contain"
                              />
                            </div>
                          )}
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-4">{event.title}</h3>

                        <p className="text-gray-600 leading-relaxed">{event.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-sky-500 to-sky-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Be Part of Our Story</h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Join us in writing the next chapter of IEEE ISIMM Student Branch. Together, we can create new milestones
              and continue our legacy of excellence in engineering and technology.
            </p>
            <Link 
              href="/contact" 
              className="bg-white text-sky-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-block"
            >
              Join Our Journey
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
