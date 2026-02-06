"use client"

import { useEffect, useRef, useState } from "react"
import { Rocket, Users, Trophy, Lightbulb, Globe, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Milestone data structure
interface Milestone {
  id: number
  date?: string
  title: string
  description: string
  iconKey: "rocket" | "users" | "trophy" | "lightbulb" | "globe"
}

// Timeline milestones data
const milestones: Milestone[] = [
  {
    id: 1,
    date: "19/02/2019",
    title: "We are born",
    description: "Foundation of IEEE ISIMM Student Branch",
    iconKey: "rocket"
  },
  {
    id: 2,
    title: "Growing the IEEE family",
    description: "We spread IEEE knowledge and made the family bigger and bigger",
    iconKey: "users"
  },
  {
    id: 3,
    title: "Skills unlocked",
    description: "We enhanced our soft and hard skills through workshops and seminars",
    iconKey: "lightbulb"
  },
  {
    id: 4,
    title: "Competing & pushing limits",
    description: "We challenged ourselves and others through IEEE competitions nationally and internationally",
    iconKey: "trophy"
  },
  {
    id: 5,
    title: "Our own SIGHT Day Congress",
    description: "We had the privilege of organizing our own version of the SIGHT Day Congress",
    iconKey: "globe"
  }
]

// Icon mapping
const iconMap = {
  rocket: Rocket,
  users: Users,
  trophy: Trophy,
  lightbulb: Lightbulb,
  globe: Globe
}

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

  const Icon = (iconKey: Milestone["iconKey"]) => iconMap[iconKey]

  return (
    <div className="min-h-screen">
      {/* Hero Section - Matching other pages */}
      <section className="bg-gradient-to-br from-sky-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-sky-500">Journey</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              From foundation to future - A story of growth, innovation, and impact
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 md:-ml-px"></div>

              {/* Milestones */}
              <div className="space-y-12">
                {milestones.map((milestone, index) => {
                  const isLeft = index % 2 === 0
                  const IconComponent = Icon(milestone.iconKey)

                  return (
                    <div key={milestone.id} className="relative animate-on-scroll">
                      {/* Mobile Layout */}
                      <div className="md:hidden flex gap-6">
                        {/* Icon Node */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-full bg-white border-4 border-gray-200 flex items-center justify-center shadow-md relative z-10">
                            <IconComponent className="w-7 h-7 text-gray-600" />
                          </div>
                        </div>

                        {/* Card */}
                        <div className="flex-1 bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                          {milestone.date && (
                            <div className="text-sm font-semibold text-sky-600 mb-2">
                              {milestone.date}
                            </div>
                          )}
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {milestone.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden md:grid md:grid-cols-2 md:gap-8 md:items-center">
                        {isLeft ? (
                          <>
                            {/* Card Left */}
                            <div className="text-right pr-8">
                              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 inline-block text-left">
                                {milestone.date && (
                                  <div className="text-sm font-semibold text-sky-600 mb-3">
                                    {milestone.date}
                                  </div>
                                )}
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                  {milestone.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                  {milestone.description}
                                </p>
                              </div>
                            </div>

                            {/* Icon Node Center */}
                            <div className="absolute left-1/2 -ml-10 w-20 h-20 rounded-full bg-white border-4 border-gray-200 flex items-center justify-center shadow-lg z-10">
                              <IconComponent className="w-9 h-9 text-gray-600" />
                            </div>

                            {/* Empty Space */}
                            <div></div>
                          </>
                        ) : (
                          <>
                            {/* Empty Space */}
                            <div></div>

                            {/* Icon Node Center */}
                            <div className="absolute left-1/2 -ml-10 w-20 h-20 rounded-full bg-white border-4 border-gray-200 flex items-center justify-center shadow-lg z-10">
                              <IconComponent className="w-9 h-9 text-gray-600" />
                            </div>

                            {/* Card Right */}
                            <div className="text-left pl-8">
                              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 inline-block">
                                {milestone.date && (
                                  <div className="text-sm font-semibold text-sky-600 mb-3">
                                    {milestone.date}
                                  </div>
                                )}
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                  {milestone.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                  {milestone.description}
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Section - Matching other pages style */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Icon & Title */}
            <div className="text-center mb-12 animate-on-scroll">
              <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-sky-500" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                The journey is <span className="text-sky-500">far from ending</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Every milestone we've reached has prepared us for the next challenge. Together, we continue to innovate, 
                inspire, and impact the engineering community.
              </p>
            </div>

            {/* Next Challenges Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 group animate-on-scroll">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-sky-100 transition-colors duration-300">
                  <Trophy className="h-8 w-8 text-gray-600 group-hover:text-sky-500 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">More Competitions</h3>
                <p className="text-gray-600 leading-relaxed">
                  Representing Tunisia on global stages and pushing boundaries
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 group animate-on-scroll">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-sky-100 transition-colors duration-300">
                  <Users className="h-8 w-8 text-gray-600 group-hover:text-sky-500 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Growing Community</h3>
                <p className="text-gray-600 leading-relaxed">
                  Expanding our reach to inspire more engineering students
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 group animate-on-scroll">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-sky-100 transition-colors duration-300">
                  <Lightbulb className="h-8 w-8 text-gray-600 group-hover:text-sky-500 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation Projects</h3>
                <p className="text-gray-600 leading-relaxed">
                  Building cutting-edge solutions for tomorrow's challenges
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Matching other pages */}
      <section className="py-20 bg-gradient-to-r from-sky-500 to-sky-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Be Part of Our Journey</h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Join us in writing the next chapter of IEEE ISIMM Student Branch. Together, we can create new milestones
              and continue our legacy of excellence in engineering and technology.
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-white text-sky-500 hover:bg-gray-100">
              <Link href="https://docs.google.com/forms/d/e/1FAIpQLSf0m5l1VVyXbZ0R96UV5C53vz1mc8G80nxB8v_T32lfT93qDQ/viewform" target="_blank" rel="noopener noreferrer">
                Join Our Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
