"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Users, Calendar, Globe, Target, Lightbulb, ChevronLeft, ChevronRight, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const subunitData = [
  {
    name: "IEEE CS ISIMM",
    subtitle: "COMPUTER SOCIETY CHAPTER",
    logo: "/subunits_logos/logo-cs.png?height=60&width=120&text=IAS",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    gradient: "from-orange-500 to-orange-600"
  },
  {
    name: "IEEE CIS ISIMM",
    subtitle: "COMPUTATIONAL INTELLIGENCE SOCIETY CHAPTER",
    logo: "/subunits_logos/logo-cis.png?height=60&width=120&text=PES",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    name: "IEEE WIE ISIMM",
    subtitle: "WOMEN IN ENGINEERING AFFINITY GROUP",
    logo: "/subunits_logos/logo-wie.png?height=60&width=120&text=CAS",
    color: "text-purple-400",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    gradient: "from-purple-400 to-purple-500"
  },
  {
    name: "IEEE RAS ISIMM",
    subtitle: "ROBOTICS AND AUTOMATION SOCIETY CHAPTER",
    logo: "/subunits_logos/logo-ras.png?height=60&width=120&text=WIE",
    color: "text-purple-800",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    gradient: "from-purple-700 to-purple-800"
  },
  {
    name: "IEEE IAS/PES ISIMM",
    subtitle: "INDUSTRIAL APPLICATIONS AND POWER ENGINEERING SOCIETY JOINT CHAPTER",
    logo: "/subunits_logos/logo-ias-pes.png?height=60&width=120&text=CS",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    gradient: "from-green-500 to-green-600"
  },
  {
    name: "IEEE EMBS ISIMM",
    subtitle: "ENGINEERING MEDECINE AND BIOLOGY SOCIETY CHAPTER",
    logo: "/subunits_logos/logo-embs.png?height=60&width=120&text=EMBS",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    gradient: "from-purple-500 to-purple-600"
  },
  {
    name: "IEEE SIGHT ISIMM",
    subtitle: "SPECIAL INTEREST GROUP ON HUMANITARIAN TECHNOLOGIES",
    logo: "/subunits_logos/logo-sight.png?height=60&width=120&text=RAS",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    gradient: "from-red-500 to-red-600"
  }
]

const keyGoals = [
  {
    icon: Target,
    title: "Training and Competitions",
    description:
      "It encourages students to attend training sessions and participate in competitions to enhance programming skills.",
    detailedDescription: "Our training and competitions program focuses on developing practical skills through hands-on workshops, coding challenges, and hackathons. We partner with industry experts to provide cutting-edge training in emerging technologies like AI, IoT, and cybersecurity. Students gain real-world experience through competitive programming contests and project-based learning opportunities.",
    activities: ["Programming Workshops", "Hackathons", "Coding Competitions", "Technical Training Sessions"],
    benefits: ["Enhanced Programming Skills", "Industry Recognition", "Portfolio Development", "Networking Opportunities"]
  },
  {
    icon: Users,
    title: "Team Building",
    description:
      "Enhancing team-work skills and fostering collaboration among team members through various activities.",
    detailedDescription: "We believe that great achievements come from great teams. Our team building initiatives focus on developing leadership skills, improving communication, and fostering a collaborative environment. Through structured activities and mentorship programs, students learn to work effectively in diverse teams and develop essential soft skills for their professional careers.",
    activities: ["Leadership Workshops", "Team Retreats", "Mentorship Programs", "Collaborative Projects"],
    benefits: ["Leadership Development", "Communication Skills", "Conflict Resolution", "Team Dynamics"]
  },
  {
    icon: Calendar,
    title: "Organizing Events",
    description:
      "Planning and executing various events, workshops, and seminars to provide valuable learning experiences and networking opportunities.",
    detailedDescription: "Event organization is at the heart of our community engagement. We plan and execute a diverse range of events including technical conferences, industry meetups, cultural celebrations, and networking sessions. Our events provide platforms for knowledge sharing, professional development, and community building within the engineering ecosystem. From small workshops to large-scale conferences, we ensure every event delivers maximum value to our members and the broader engineering community.",
    activities: ["Technical Conferences", "Industry Meetups", "Cultural Events", "Networking Sessions", "Workshops & Seminars", "Hackathons & Competitions"],
    benefits: ["Event Management Skills", "Professional Networking", "Community Building", "Organizational Experience", "Leadership Development", "Communication Skills"]
  },
  {
    icon: Lightbulb,
    title: "Inspiring Creativity",
    description:
      "Inspire and nurture the creative potential of students, encouraging their innovative spirit and communication skills.",
    detailedDescription: "Innovation and creativity are the driving forces behind technological advancement. We inspire students to think outside the box through design thinking workshops, innovation challenges, and creative problem-solving sessions. Our programs encourage students to develop innovative solutions to real-world problems while building their creative confidence.",
    activities: ["Design Thinking Workshops", "Innovation Challenges", "Creative Problem Solving", "Idea Generation Sessions"],
    benefits: ["Creative Thinking", "Innovation Skills", "Problem Solving", "Confidence Building"]
  },
]

const executiveMembers = [
  { name: "Mohamed Yasser Bdioui", position: "Chairman", image: "/committee/yasser-bdioui.png?height=150&width=150" },
  { name: "Maram Haggui", position: "Vice Chair", image: "/committee/maram-haggui.png?height=150&width=150" },
  { name: "Firas Hamdi", position: "Secretary", image: "/committee/firas-hamdi.png?height=150&width=150" },
  { name: "Mahdi Saadaoui", position: "Treasurer", image: "/committee/mahdi-saadaoui.png?height=150&width=150" },
  { name: "Farah Tayari", position: "HR Manager", image: "/committee/farah-tayari.png?height=150&width=150" },
  { name: "Mahdi Guedria", position: "Webmaster", image: "/committee/mahdi-guedria.png?height=150&width=150" },
  { name: "May Mohsni", position: "External Relations Manager", image: "/committee/may-mohsni.png?height=150&width=150" },
]

const galleryImages = [
  { id: 1, src: "/gallery-home/1.JPG?height=300&width=400&text=Gallery+1", alt: "Gallery 1" },
  { id: 2, src: "/gallery-home/2.jpg?height=300&width=400&text=Gallery+2", alt: "Gallery 2" },
  { id: 3, src: "/gallery-home/3.jpg?height=300&width=400&text=Gallery+3", alt: "Gallery 3" },
  { id: 4, src: "/gallery-home/4.jpg?height=300&width=400&text=Gallery+4", alt: "Gallery 4" },
  { id: 5, src: "/gallery-home/5.jpg?height=300&width=400&text=Gallery+5", alt: "Gallery 5" },
  { id: 6, src: "/gallery-home/6.jpg?height=300&width=400&text=Gallery+6", alt: "Gallery 6" },
  { id: 7, src: "/gallery-home/7.jpg?height=300&width=400&text=Gallery+7", alt: "Gallery 7" },
  { id: 8, src: "/gallery-home/8.jpg?height=300&width=400&text=Gallery+8", alt: "Gallery 8" },
]

export default function HomePage() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const excomRef = useRef<HTMLDivElement>(null)
  const [isGalleryHovered, setIsGalleryHovered] = useState(false)
  const [isExcomHovered, setIsExcomHovered] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<typeof keyGoals[0] | null>(null)
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false)

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

  // Auto-scroll animation for gallery
  useEffect(() => {
    if (!galleryRef.current) return

    const galleryContainer = galleryRef.current
    let animationId: number
    let scrollPosition = 0
    const scrollSpeed = 1 // pixels per frame

    const animateGallery = () => {
      if (!isGalleryHovered && galleryContainer) {
        scrollPosition += scrollSpeed
        if (scrollPosition >= galleryContainer.scrollWidth - galleryContainer.clientWidth) {
          scrollPosition = 0
        }
        galleryContainer.scrollLeft = scrollPosition
      }
      animationId = requestAnimationFrame(animateGallery)
    }

    animationId = requestAnimationFrame(animateGallery)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isGalleryHovered])

  // Auto-scroll animation for executive committee
  useEffect(() => {
    if (!excomRef.current) return

    const excomContainer = excomRef.current
    let animationId: number
    let scrollPosition = 0
    const scrollSpeed = 0.8 // pixels per frame (slightly slower than gallery)

    const animateExcom = () => {
      if (!isExcomHovered && excomContainer) {
        scrollPosition += scrollSpeed
        if (scrollPosition >= excomContainer.scrollWidth - excomContainer.clientWidth) {
          scrollPosition = 0
        }
        excomContainer.scrollLeft = scrollPosition
      }
      animationId = requestAnimationFrame(animateExcom)
    }

    animationId = requestAnimationFrame(animateExcom)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isExcomHovered])

  const openGoalModal = (goal: typeof keyGoals[0]) => {
    console.log('Opening modal for goal:', goal.title)
    setSelectedGoal(goal)
    setIsGoalModalOpen(true)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Original Design */}
      <section className="relative bg-gradient-to-br from-sky-50 to-white py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Advancing <span className="text-sky-500">Technology</span> for Humanity
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                The IEEE ISIMM Student Branch is a vibrant community of engineering students working together to advance
                technology for humanity. Through events, workshops, and collaboration, we foster professional and
                technical development for future innovators who will shape tomorrow's world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-sky-500 hover:bg-sky-600">
                  <Link href="/about">
                    Learn More <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/events">View Events</Link>
                </Button>
              </div>
            </div>
            <div className="animate-slide-in-right">
              <div className="relative">
                <div className="absolute inset-0 bg-sky-200 rounded-3xl transform rotate-6"></div>
                <Image
                  src="/logos/logo-isimm-sb.png?height=500&width=600"
                  alt="IEEE ISIMM Student Branch Members"
                  width={600}
                  height={500}
                  className="relative rounded-3xl shadow-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Redesigned Chapters & Affinity Groups Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="text-sky-500">CHAPTERS & AFFINITY GROUPS</span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700">Our Diverse Technical Communities</h3>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Discover our specialized chapters and affinity groups, each dedicated to advancing specific areas of technology and engineering.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-on-scroll">
            {subunitData.map((subunit, index) => (
              <div 
                key={index} 
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${subunit.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative p-6 flex items-center justify-between">
                  {/* Left side - Chapter name and subtitle */}
                  <div className="flex-1 pr-4">
                    <h3 className={`font-bold text-lg ${subunit.color} mb-2 group-hover:scale-105 transition-transform duration-300`}>
                      {subunit.name}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">
                      {subunit.subtitle}
                    </p>
                  </div>
                  
                  {/* Right side - Logo */}
                  <div className="flex-shrink-0">
                    <Image
                      src={subunit.logo}
                      alt={subunit.name}
                      width={100}
                      height={100}
                      className="w-20 h-20 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                
                {/* Hover effect border */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-current ${subunit.color} opacity-0 group-hover:opacity-20 transition-all duration-500`}></div>
              </div>
            ))}
          </div>
          
          {/* Call to action */}
          <div className="text-center mt-16 animate-on-scroll">
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Ready to join one of our specialized communities? Each chapter offers unique opportunities for learning, networking, and professional development.
            </p>
            <Button asChild className="bg-sky-500 hover:bg-sky-600">
              <Link href="/subunits">
                Explore All Chapters <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Auto-scrolling Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="text-sky-500">GALLERY</span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700">6 years of glory and unforgettable memories!</h3>
          </div>
          
          <div 
            className="relative"
            onMouseEnter={() => setIsGalleryHovered(true)}
            onMouseLeave={() => setIsGalleryHovered(false)}
          >
            {/* Auto-scrolling Gallery Container */}
            <div 
              ref={galleryRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Duplicate images for seamless loop */}
              {[...galleryImages, ...galleryImages].map((image, index) => (
                <div key={`${image.id}-${index}`} className="flex-shrink-0 w-80 group/item">
                  <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={320}
                      height={240}
                      className="w-full h-60 object-cover group-hover/item:scale-110 transition-transform duration-300"
                    />

                  </div>
                </div>
              ))}
            </div>
            
            {/* Hover indicator */}
            {isGalleryHovered && (
              <div className="absolute top-4 right-4 bg-sky-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Paused
              </div>
            )}
          </div>
        </div>
      </section>

      {/* IEEE Community Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="text-sky-500">IEEE COMMUNITY</span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700">Connecting with the Global IEEE Network</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-sky-50 rounded-xl p-8 animate-on-scroll">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">IEEE Tunisia Section</h4>
                </div>
                <div className="flex-shrink-0">
                  <Image
                    src="/logos/tunisia_section_logo.png"
                    alt="IEEE Tunisia Section Logo"
                    width={80}
                    height={80}
                    className="w-16 h-16 object-contain"
                  />
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                IEEE Tunisia Section represents the broader IEEE community in Tunisia, connecting professionals, researchers, 
                and students across the country. Our student branch collaborates closely with the Tunisia Section to advance 
                technology and engineering excellence in our region.
              </p>
              <Button asChild variant="outline" className="mt-4 bg-transparent">
                <Link href="https://ieee.tn/" target="_blank">
                  Visit IEEE Tunisia Section
                </Link>
              </Button>
            </div>
            <div className="bg-sky-50 rounded-xl p-8 animate-on-scroll">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center mr-4">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">IEEE Global</h4>
                </div>
                <div className="flex-shrink-0">
                  <Image
                    src="/logos/ieee-logo.jpg"
                    alt="IEEE Global Logo"
                    width={80}
                    height={80}
                    className="w-16 h-16 object-contain"
                  />
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                IEEE is the world's largest technical professional organization dedicated to advancing technology for the 
                benefit of humanity. With over 400,000 members in 160 countries, IEEE provides access to cutting-edge 
                research, professional development, and global networking opportunities.
              </p>
              <Button asChild variant="outline" className="mt-4 bg-transparent">
                <Link href="https://www.ieee.org/" target="_blank">
                  Visit IEEE Global
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Goals Section with Interactive Modals */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="text-sky-500">IEEE ISIMM SB GOALS</span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700">Four Key Goals & Objectives</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyGoals.map((goal, index) => {
              console.log(`Rendering goal ${index}:`, goal.title, goal.description)
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 animate-on-scroll cursor-pointer transform hover:-translate-y-2"
                  onClick={() => openGoalModal(goal)}
                >
                  <div className="w-16 h-16 rounded-lg bg-sky-100 flex items-center justify-center mx-auto mb-6">
                    <goal.icon className="w-8 h-8 text-sky-500" />
                  </div>
                  <h4 className="text-lg font-bold mb-4 text-gray-900">
                    {goal.title}
                  </h4>
                  <p className="leading-relaxed text-sm text-gray-600">
                    {goal.description}
                  </p>
                  <div className="mt-4">
                    <span className="text-xs font-medium text-sky-500">
                      Click to learn more →
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Goal Details Modal */}
      <Dialog open={isGoalModalOpen} onOpenChange={setIsGoalModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedGoal && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                    <selectedGoal.icon className="w-6 h-6 text-sky-500" />
                  </div>
                  <span className="text-xl font-bold">{selectedGoal.title}</span>
                </DialogTitle>
                <DialogDescription className="text-lg text-gray-600 mt-4 leading-relaxed">
                  {selectedGoal.detailedDescription}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 mt-6">
                {/* Activities Section */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-lg">Key Activities</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedGoal.activities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-sky-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits Section */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-lg">Student Benefits</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedGoal.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to Action */}
                <div className="bg-sky-50 rounded-lg p-6">
                  <p className="text-sm text-gray-600 mb-4">
                    Ready to get involved in our <strong>{selectedGoal.title.toLowerCase()}</strong> initiatives?
                  </p>
                  <Button className="bg-sky-500 hover:bg-sky-600 w-full">
                    Join Our Programs
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Auto-scrolling Executive Committee Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="text-sky-500">ISIMM SB EXCOM</span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700">Together We Lead Change</h3>
          </div>
          
          <div 
            className="relative"
            onMouseEnter={() => setIsExcomHovered(true)}
            onMouseLeave={() => setIsExcomHovered(false)}
          >
            {/* Auto-scrolling Executive Committee Container */}
            <div 
              ref={excomRef}
              className="flex gap-8 overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Duplicate members for seamless loop */}
              {[...executiveMembers, ...executiveMembers].map((member, index) => (
                <div key={`${member.name}-${index}`} className="flex-shrink-0 text-center group/item">
                  <div className="relative mb-4">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto shadow-lg">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-sky-500/20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-900 group-hover/item:text-sky-600 transition-colors duration-200">
                    {member.name}
                  </h4>
                  <p className="text-sky-600 text-sm">{member.position}</p>
                </div>
              ))}
            </div>
            
            {/* Hover indicator */}
            {isExcomHovered && (
              <div className="absolute top-4 right-4 bg-sky-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Paused
              </div>
            )}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild className="bg-sky-500 hover:bg-sky-600">
              <Link href="/committee">
                Meet The Team <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 bg-sky-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              <span className="text-sky-500">JOIN US!</span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-8">
              Networking, Mentorship, and Cutting-Edge Resources!
            </h3>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Expand Your Network</h4>
                <p className="text-gray-600 text-sm">
                  Connect Globally and Cultivate Relationships with IEEE ISIMM SB.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">IEEE ISIMM Community</h4>
                <p className="text-gray-600 text-sm">
                  Whatever your discipline at ISIMM, IEEE ISIMM SB meets all technical needs.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Advance Your Career</h4>
                <p className="text-gray-600 text-sm">Boost your professional growth with top industry connections.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-sky-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">
                    Join a community of over 450,000 technology and engineering professionals.
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-sky-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">
                    Access resources and opportunities to stay updated on technology changes.
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-sky-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">
                    Network with professionals in your local area or specific technical fields.
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-sky-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Mentor the next generation of engineers and technologists.</span>
                </li>
              </ul>

              <Button className="bg-sky-500 hover:bg-sky-600">Register now to IEEE ISIMM SB</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
