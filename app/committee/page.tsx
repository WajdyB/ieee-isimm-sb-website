"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Mail, Linkedin } from "lucide-react"

const committeeMembers = [
  {
    name: "Mohamed Yasser Bdioui",
    position: "Chairman",
    image: "/committee/yasser-bdioui.png?height=300&width=300",
    facebook: "https://www.facebook.com/yasser0202",
    email: "yasserbdioui@ieee.org ",
    linkedin: "",
  },
  {
    name: "Maram Haggui",
    position: "Vice Chair",
    image: "/committee/maram-haggui.png?height=300&width=300",
    facebook: "https://www.facebook.com/maaram.haggui",
    email: "hagguimaram6@gmail.com",
    linkedin: "https://www.linkedin.com/in/maram-haggui-aa39292b3/",
  },
  {
    name: "Firas Hamdi",
    position: "Secretary",
    image: "/committee/firas-hamdi.png?height=300&width=300",
    facebook: "https://www.facebook.com/firas.hamdi.92372",
    email: "",
    linkedin: "",
  },
  {
    name: "Mahdi Saadaoui",
    position: "Treasurer",
    image: "/committee/mahdi-saadaoui.png?height=300&width=300",
    facebook: "https://www.facebook.com/FAKE.MAHDI",
    email: "",
    linkedin: "",
  },
  {
    name: "Farah Tayari",
    position: "HR Manager",
    image: "/committee/farah-tayari.png?height=300&width=300",
    facebook: "https://www.facebook.com/farah.tayari.7",
    email: "",
    linkedin: "",
  },
  {
    name: "Mahdi Guedria",
    position: "Webmaster",
    image: "/committee/mahdi-guedria.png?height=300&width=300",
    facebook: "https://www.facebook.com/mahdi.guedria.2025",
    email: "",
    linkedin: "",
  },
  {
    name: "May Mohsni",
    position: "External Relations Manager",
    image: "/committee/may-mohsni.png?height=300&width=300",
    facebook: "https://www.facebook.com/may.mohsni.7",
    email: "",
    linkedin: "",
  },
]

export default function CommitteePage() {
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
              Executive <span className="text-sky-500">Committee</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Meet the dedicated leaders driving our mission forward and fostering innovation in the engineering
              community
            </p>
          </div>
        </div>
      </section>

      {/* Committee Members */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {committeeMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-500/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-4">
                      <Link
                        href={member.facebook}
                        target="_blank"
                        className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors duration-200"
                      >
                        <Facebook className="h-5 w-5 text-white" />
                      </Link>
                      <Link
                        href={`mailto:${member.email}`}
                        className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors duration-200"
                      >
                        <Mail className="h-5 w-5 text-white" />
                      </Link>
                      <Link
                        href={member.linkedin}
                        target="_blank"
                        className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors duration-200"
                      >
                        <Linkedin className="h-5 w-5 text-white" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-sky-500 transition-colors duration-200">
                    <Link href={member.facebook} target="_blank">
                      {member.name}
                    </Link>
                  </h3>
                  <p className="text-sky-500 font-medium mb-4">{member.position}</p>
                  <div className="flex justify-center space-x-3">
                    <Link
                      href={member.facebook}
                      target="_blank"
                      className="text-gray-400 hover:text-sky-500 transition-colors duration-200"
                    >
                      <Facebook className="h-5 w-5" />
                    </Link>
                    <Link
                      href={`mailto:${member.email}`}
                      className="text-gray-400 hover:text-sky-500 transition-colors duration-200"
                    >
                      <Mail className="h-5 w-5" />
                    </Link>
                    <Link
                      href={member.linkedin}
                      target="_blank"
                      className="text-gray-400 hover:text-sky-500 transition-colors duration-200"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Message */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Leadership Message</h2>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <p className="text-lg text-gray-600 mb-6 leading-relaxed italic">
                "Our executive committee is committed to creating an environment where every student can thrive and
                contribute to advancing technology for humanity. We believe that through collaboration, innovation, and
                dedication, we can make a meaningful impact in our community and beyond."
              </p>
              <div className="flex items-center justify-center">
                <Image
                  src="/committee/yasser-bdioui.png?height=80&width=80"
                  alt="Chair"
                  width={80}
                  height={80}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Mohamed Yasser Bdioui</p>
                  <p className="text-sky-500">Chair, IEEE ISIMM Student Branch</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-sky-500 to-sky-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Want to Get Involved?</h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Join our team and help us advance technology for humanity. We're always looking for passionate individuals
              to contribute to our mission and make a difference in the engineering community.
            </p>
            <Link 
              href="/contact" 
              className="bg-white text-sky-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
