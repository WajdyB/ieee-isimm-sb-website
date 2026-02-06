"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Users, Calendar, Globe, Target, Lightbulb } from "lucide-react"
import { Event } from "@/types/event"

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
    name: "IEEE SIGHT ISIMM",
    subtitle: "SPECIAL INTEREST GROUP ON HUMANITARIAN TECHNOLOGIES",
    logo: "/subunits_logos/logo-sight.png?height=60&width=120&text=RAS",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    gradient: "from-red-500 to-red-600"
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
    name: "IEEE IAS/PES ISIMM",
    subtitle: "INDUSTRIAL APPLICATIONS AND POWER ENGINEERING SOCIETY JOINT CHAPTER",
    logo: "/subunits_logos/logo-ias-pes.png?height=60&width=120&text=CS",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    gradient: "from-green-500 to-green-600"
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
    name: "IEEE EMBS ISIMM",
    subtitle: "ENGINEERING MEDECINE AND BIOLOGY SOCIETY CHAPTER",
    logo: "/subunits_logos/logo-embs.png?height=60&width=120&text=EMBS",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    gradient: "from-purple-500 to-purple-600"
  },
  {
    name: "IEEE CIS ISIMM",
    subtitle: "COMPUTATIONAL INTELLIGENCE SOCIETY CHAPTER",
    logo: "/subunits_logos/logo-cis.png?height=60&width=120&text=PES",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    gradient: "from-blue-500 to-blue-600"
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
  { name: "Ahmed Benzarti", position: "Chairman", image: "/committee/ahmed_benzarti.png?height=150&width=150" },
  { name: "Ons Guidara", position: "Vice Chair", image: "/committee/ons_guidara.png?height=150&width=150" },
  { name: "Yasmine Bregui", position: "General Secretary", image: "/committee/yasmine_bregui.png?height=150&width=150" },
  { name: "Mahdi Saadaoui", position: "Treasurer", image: "/committee/mahdi_saadaoui.png?height=150&width=150" },
  { name: "Nadine Hedhli", position: "Webmaster", image: "/committee/nadine_hedhli.png?height=150&width=150" },
  { name: "Razi Ben Khelifa", position: "Marketing Manager", image: "/committee/razi_ben_khelifa.png?height=150&width=150" },
  { name: "Yasmine Dallegi", position: "HR Manager", image: "/committee/yasmine_dallegi.png?height=150&width=150" },
]

export default function HomePage() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const excomRef = useRef<HTMLDivElement>(null)
  const [isExcomHovered, setIsExcomHovered] = useState(false)

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

  return (
    <div className="min-h-screen">
      {/* Hero Section - Original Design */}
      <section className="relative bg-gradient-to-br from-sky-50 to-white py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Advancing <span className="text-sky-500">Technology</span> for Humanity
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
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
      
      {/* Facebook Video Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              <span className="text-sky-500">OUR STORY</span>
            </h2>
            <h3 className="text-2xl font-semibold text-muted-foreground mb-8">
              Discover IEEE ISIMM Student Branch's Mission & Goals
            </h3>
            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Watch our comprehensive video showcasing the mission, goals, and achievements of IEEE ISIMM Student Branch. 
              Learn about our commitment to advancing technology for humanity and fostering professional development.
            </p>
            
            {/* Facebook Video Embed */}
            <div className="relative w-full max-w-3xl mx-auto">
              <div className="relative pb-[56.25%] h-0 rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fieeeisimmsb%2Fvideos%2F1055199485479244&show_text=false&width=560&t=0"
                  width="100%"
                  height="100%"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="IEEE ISIMM Student Branch Mission & Goals"
                ></iframe>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Can't see the video? 
                <a 
                  href="https://www.facebook.com/ieeeisimmsb/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sky-500 hover:text-sky-600 ml-1 underline"
                >
                  Visit our Facebook page
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Redesigned Chapters & Affinity Groups Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              <span className="text-sky-500">CHAPTERS & AFFINITY GROUPS</span>
            </h2>
            <h3 className="text-2xl font-semibold text-muted-foreground">Our Diverse Technical Communities</h3>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Discover our specialized chapters and affinity groups, each dedicated to advancing specific areas of technology and engineering.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-on-scroll">
            {subunitData.map((subunit, index) => (
              <div 
                key={index} 
                className="group relative bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${subunit.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative p-6 flex items-center justify-between">
                  {/* Left side - Chapter name and subtitle */}
                  <div className="flex-1 pr-4">
                    <h3 className={`font-bold text-lg ${subunit.color} mb-2 group-hover:scale-105 transition-transform duration-300`}>
                      {subunit.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">
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
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
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

      {/* IEEE Community Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              <span className="text-sky-500">IEEE COMMUNITY</span>
            </h2>
            <h3 className="text-2xl font-semibold text-foreground">Connecting with the Global IEEE Network</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-popover rounded-xl p-8 animate-on-scroll">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground">IEEE Tunisia Section</h4>
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
              <p className="text-muted-foreground leading-relaxed">
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
            <div className="bg-popover rounded-xl p-8 animate-on-scroll">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center mr-4">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground">IEEE Global</h4>
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
              <p className="text-muted-foreground leading-relaxed">
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
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              <span className="text-sky-500">IEEE ISIMM SB GOALS</span>
            </h2>
            <h3 className="text-2xl font-semibold text-foreground">Four Key Goals & Objectives</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyGoals.map((goal, index) => {
              return (
                <div
                  key={index}
                  className="bg-card rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 animate-on-scroll transform hover:-translate-y-2"
                >
                  <div className="w-16 h-16 rounded-lg bg-sky-100 flex items-center justify-center mx-auto mb-6">
                    <goal.icon className="w-8 h-8 text-sky-500" />
                  </div>
                  <h4 className="text-lg font-bold mb-4 text-foreground">
                    {goal.title}
                  </h4>
                  <p className="leading-relaxed text-sm text-muted-foreground">
                    {goal.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Auto-scrolling Executive Committee Preview */}
      <section className="py-20 bg-background">
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
                <div key={`${member.name}-${index}`} className="flex-shrink-0 w-72 md:w-80 text-center group/item">
                  <div className="relative mb-6">
                    <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden mx-auto shadow-xl ring-4 ring-sky-50 transition-all duration-300 group-hover/item:ring-sky-200">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-sky-500/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-foreground group-hover/item:text-sky-600 transition-colors duration-200">
                    {member.name}
                  </h4>
                  <p className="text-sky-600 font-medium">{member.position}</p>
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

      {/* Recent Events Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="text-sky-500">RECENT EVENTS</span>
            </h2>
            <h3 className="text-2xl font-semibold text-muted-foreground">Latest Activities & Achievements</h3>
          </div>
          
          <RecentEvents />
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
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

            <div className="bg-card rounded-xl p-8 shadow-lg">
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

              <Button asChild className="bg-sky-500 hover:bg-sky-600">
                <Link href="https://docs.google.com/forms/d/e/1FAIpQLSf0m5l1VVyXbZ0R96UV5C53vz1mc8G80nxB8v_T32lfT93qDQ/viewform" target="_blank" rel="noopener noreferrer">
                  Register now to IEEE ISIMM SB
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Recent Events Component
function RecentEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRecentEvents = async () => {
      try {
        const response = await fetch('/api/events')
        const data = await response.json()
        
        if (data.success) {
          // Get only the 3 most recent events
          const recentEvents = data.data.slice(0, 3)
          setEvents(recentEvents)
        }
      } catch (error) {
        console.error('Error fetching recent events:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecentEvents()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500 mx-auto"></div>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No recent events to display.</p>
      </div>
    )
  }

  return (
    <div>
          <div className="grid md:grid-cols-3 gap-8">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-card rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
          >
            <div className="relative overflow-hidden bg-popover">
              <Image
                src={event.images && event.images.length > 0 ? event.images[0] : "/placeholder.svg"}
                alt={event.title}
                width={400}
                height={250}
                className="w-full h-auto max-h-48 object-contain group-hover:scale-105 transition-transform duration-300"
                unoptimized={event.images && event.images.length > 0 && event.images[0].startsWith('data:')}
              />
              <div className="absolute inset-0 bg-sky-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-sky-500 transition-colors duration-200">
                {event.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{formatDate(event.date)}</span>
                <span>{event.attendees} attendees</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Button asChild className="bg-sky-500 hover:bg-sky-600 text-white">
          <Link href="/events">
            View All Events →
          </Link>
        </Button>
      </div>
    </div>
  )
}
