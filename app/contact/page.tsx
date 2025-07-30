"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is IEEE?",
    answer:
      "IEEE is the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity. IEEE and its members inspire a global community to innovate for a better tomorrow through highly cited publications, conferences, technology standards, and professional and educational activities.",
  },
  {
    question: "How do I join the IEEE ISIMM Student Branch?",
    answer:
      "To join our student branch, you need to be a student at ISIMM and have an IEEE membership. You can apply through our website or contact us directly. We welcome students from all engineering disciplines who are passionate about technology and innovation.",
  },
  {
    question: "What are the benefits of joining?",
    answer:
      "Members enjoy access to exclusive workshops, networking events, technical resources, career development opportunities, and the chance to work on innovative projects. You'll also be part of a global community of engineers and technologists.",
  },
  {
    question: "How often do you organize events?",
    answer:
      "We organize various events throughout the academic year, including technical workshops, seminars, competitions, and social activities. On average, we host 2-3 events per month, ranging from small technical sessions to large conferences.",
  },
  {
    question: "Can I propose an event or project idea?",
    answer:
      "We encourage members to propose new ideas for events, projects, or initiatives. You can submit your proposals through our contact form or discuss them directly with our executive committee during our regular meetings.",
  },
]

export default function ContactPage() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

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

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Create email content
      const emailContent = `
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}
Message: ${formData.message}
      `
      
      // Send email using mailto link (fallback method)
      const mailtoLink = `mailto:contact@ieee-isimm.org?subject=${encodeURIComponent(`Contact Form: ${formData.subject}`)}&body=${encodeURIComponent(emailContent)}`
      
      // Open default email client
      window.open(mailtoLink)
      
      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" })
      alert("Thank you for your message! We will get back to you soon.")
    } catch (error) {
      console.error("Error sending message:", error)
      alert("There was an error sending your message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Following original design */}
      <section className="bg-gradient-to-br from-sky-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Contact <span className="text-sky-500">Us</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Get in touch with us through different channels. We're here to help and answer any questions you may have.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods - Following original stats design */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 animate-on-scroll">
            <div className="text-center group">
              <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-sky-200 transition-colors duration-300">
                <Phone className="h-8 w-8 text-sky-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-sky-600 font-medium">+216 ** *** ***</p>
            </div>

            <div className="text-center group">
              <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-sky-200 transition-colors duration-300">
                <Mail className="h-8 w-8 text-sky-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-sky-600 font-medium">contact@ieee-isimm.org</p>
            </div>

            <div className="text-center group">
              <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-sky-200 transition-colors duration-300">
                <MapPin className="h-8 w-8 text-sky-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-sky-600 font-medium">ISIMM Campus, Monastir, Tunisia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map - Following original design */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-on-scroll">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                  <p className="text-gray-600 mb-6">
                    We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your name"
                          className="border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          className="border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Enter subject"
                        className="border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Enter your message"
                        rows={5}
                        className="border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-sky-500 hover:bg-sky-600" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="animate-on-scroll">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Us</h2>
                  <p className="text-gray-600 mb-6">Visit us at our campus location in Monastir, Tunisia</p>
                  <div className="rounded-lg h-64 mb-6 overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.4448952247403!2d10.838162475595718!3d35.76444637256052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130212d6df016097%3A0x528cc1e524eece77!2sInstitut%20Sup%C3%A9rieur%20d&#39;Informatique%20et%20de%20Math%C3%A9matiques%20de%20Monastir!5e0!3m2!1sfr!2stn!4v1753899673779!5m2!1sfr!2stn"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="ISIMM Campus Location"
                      className="rounded-lg"
                    ></iframe>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-sky-500 mr-3" />
                      <span className="text-gray-700">
                        Higher Institute of Mathematics and Computer Science Of Monastir
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-sky-500 mr-3" />
                      <span className="text-gray-700">Monday - Friday: 8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-sky-500 mr-3" />
                      <span className="text-gray-700">+216 70 011 920</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Following original design */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Find answers to common questions about IEEE ISIMM</p>
          </div>

          <div className="max-w-3xl mx-auto animate-on-scroll">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <Accordion type="single" collapsible className="divide-y divide-gray-200">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="px-6">
                    <AccordionTrigger className="text-left hover:text-sky-600 py-4">
                      <span className="font-semibold">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed pb-4">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
