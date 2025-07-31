"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Linkedin, Instagram, Globe } from "lucide-react"

const subunits = [
  {
    id: 1,
    name: "Computer Society Chapter",
    logo: "/subunits_logos/logo-cs.png",
    description:
      "Advancing computing technologies and providing members with essential information about the latest developments in computer science and engineering. Focus on software development, artificial intelligence, and emerging technologies.",
    color: "orange",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-600",
    links: {
      facebook: "https://www.facebook.com/ieee.cs.isimm",
      linkedin: "",
      instagram: "https://www.instagram.com/ieee.cs.isimm/?hl=fr",
      website: "https://ieee-isimm-cs-website.vercel.app/",
    },
  },
  {
    id: 2,
    name: "Computational Intelligence Society Chapter",
    logo: "/subunits_logos/logo-cis.png",
    description:
      "Dedicated to advancing computational intelligence and machine learning technologies. Focus on neural networks, fuzzy systems, evolutionary computation, and their applications in solving real-world problems.",
    color: "blue",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
    links: {
      facebook: "https://www.facebook.com/IEEE.CIS.ISIMM",
      linkedin: "https://www.linkedin.com/company/isimm-cis/",
      instagram: "https://www.instagram.com/ieee.cis.isimm/?hl=fr",
      website: "",
    },
  },
  {
    id: 3,
    name: "Women in Engineering Affinity Group",
    logo: "/subunits_logos/logo-wie.png",
    description:
      "Empowering women in engineering and technology fields. Promoting diversity, inclusion, and professional development opportunities for women in STEM through mentorship, networking, and leadership programs.",
    color: "purple",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-400",
    links: {
      facebook: "https://www.facebook.com/IEEEWIEISIMMSA",
      linkedin: "",
      instagram: "https://www.instagram.com/ieee_wie_isimm_sag/?hl=fr",
      website: "https://ieee-isimm-wie-website.vercel.app/",
    },
  },
  {
    id: 4,
    name: "Industry Applications Society & Power and Energy Society Joint Chapter",
    logo: "/subunits_logos/logo-ias-pes.png",
    description:
      "Combining industrial applications and power engineering expertise. Focus on industrial automation, power systems, renewable energy, and sustainable technologies for modern industry challenges.",
    color: "green",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-600",
    links: {
      facebook: "https://www.facebook.com/profile.php?id=61561012416766",
      linkedin: "",
      instagram: "https://www.instagram.com/ieee_ias_pes_isimm_sbjc/?hl=fr",
      website: "https://ias-pes-isimm.ieee.tn/",
    },
  },
  {
    id: 5,
    name: "Engineering in Medicine & Biology",
    logo: "/subunits_logos/logo-embs.png",
    description:
      "Creating a vibrant community focused on biomedical engineering and healthcare technology. Advancing the application of engineering principles to medicine and biology for improved healthcare solutions.",
    color: "purple",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-600",
    links: {
      facebook: "https://www.facebook.com/profile.php?id=61573780411122",
      linkedin: "",
      instagram: "https://www.instagram.com/ieee.embs.isimm/?hl=fr",
      website: "",
    },
  },
  {
    id: 6,
    name: "Robotics & Automation Society",
    logo: "/subunits_logos/logo-ras.png",
    description:
      "Focused on robotics, automation, and artificial intelligence. Our chapter emphasizes innovation and practical applications in automation fields, from industrial robotics to autonomous systems.",
    color: "purple",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-800",
    links: {
      facebook: "https://www.facebook.com/profile.php?id=100087961737133",
      linkedin: "",
      instagram: "https://www.instagram.com/ieee_ras_isimm/?hl=fr",
      website: "",
    },
  },
  {
    id: 7,
    name: "Special Interest Group In Humanitarian Technology",
    logo: "/subunits_logos/logo-sight.png",
    description:
      "Dedicated to applying technology for humanitarian purposes and addressing global challenges. Focus on sustainable development, disaster relief, and technology solutions that benefit communities worldwide.",
    color: "red",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-600",
    links: {
      facebook: "https://www.facebook.com/profile.php?id=100091680498696",
      linkedin: "",
      instagram: "https://www.instagram.com/ieee.sight.isimm/?hl=fr",
      website: "https://ieee-isimm-sight-website.vercel.app/",
    },
  },
]

export default function SubunitsPage() {
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
              Our <span className="text-sky-500">Subunits</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover our diverse technical societies and affinity groups working together to advance technology for
              humanity
            </p>
          </div>
        </div>
      </section>

      {/* Subunits Grid - Following original card design */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subunits.map((subunit, index) => (
              <div
                key={subunit.id}
                className={`${subunit.bgColor} rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 ${subunit.borderColor} animate-on-scroll`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1 pr-4">
                      <h3 className={`text-xl font-bold ${subunit.textColor} mb-2 leading-tight`}>
                        {subunit.name}
                      </h3>
                    </div>
                    <div className="flex-shrink-0">
                      <Image
                        src={subunit.logo}
                        alt={`${subunit.name} Logo`}
                        width={80}
                        height={80}
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed text-sm">{subunit.description}</p>

                  <div className="flex justify-center space-x-3 pt-4 border-t border-gray-200">
                    <Link
                      href={subunit.links.facebook}
                      target="_blank"
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-200 shadow-sm"
                    >
                      <Facebook className="h-5 w-5" />
                    </Link>
                    <Link
                      href={subunit.links.linkedin}
                      target="_blank"
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                    <Link
                      href={subunit.links.instagram}
                      target="_blank"
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-pink-500 hover:text-white transition-all duration-200 shadow-sm"
                    >
                      <Instagram className="h-5 w-5" />
                    </Link>
                    <Link
                      href={subunit.links.website}
                      target="_blank"
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-all duration-200 shadow-sm"
                    >
                      <Globe className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Following original design */}
      <section className="py-20 bg-gradient-to-r from-sky-500 to-sky-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join a Subunit</h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Each subunit offers unique opportunities for learning, networking, and professional development. Find your
              passion and connect with like-minded engineers and technologists.
            </p>
            <Link 
              href="/contact" 
              className="bg-white text-sky-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-block"
            >
              Get Involved Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
