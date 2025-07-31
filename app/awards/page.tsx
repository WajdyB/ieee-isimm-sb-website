"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Trophy } from "lucide-react"

interface Award {
  id: number
  title: string
  description: string
  year: string
  image: string
  achievement: string
  impact: string
}

const awards: Award[] = [
  {
    id: 1,
    title: "First place in the SMC & EdSoc technical challenge in TSYP11",
    description: "Our team demonstrated exceptional problem-solving skills and innovative thinking in the Systems, Man, and Cybernetics Society & Education Society technical challenge. This victory showcases our deep understanding of complex engineering systems and our ability to apply theoretical knowledge to real-world challenges.",
    year: "2023",
    image: "/awards/smc-technical-challenge.jpg",
    achievement: "Outperformed 20+ competing teams with innovative solutions",
    impact: "Inspired 50+ students to pursue advanced engineering studies"
  },
  {
    id: 2,
    title: "First place in the EMBS technical challenge in TSYP11",
    description: "We achieved the highest honor in the Engineering in Medicine and Biology Society challenge, demonstrating cutting-edge knowledge in biomedical engineering and healthcare technology. This recognition highlights our commitment to advancing technology that directly improves human health and well-being.",
    year: "2023",
    image: "/awards/embs-technical-challenge.jpg",
    achievement: "Developed breakthrough biomedical engineering solutions",
    impact: "Pioneered new approaches in healthcare technology innovation"
  },
  {
    id: 3,
    title: "First place in the WIE ACT technical challenge",
    description: "Our victory in the Women in Engineering Affinity Group Annual Congress of Tunisiatechnical challenge represents our commitment to promoting diversity and inclusion in engineering. This achievement demonstrates that excellence knows no gender boundaries and inspires more women to pursue careers in technology and engineering.",
    year: "2024",
    image: "/awards/wie-act-technical-challenge-first-place.jpg",
    achievement: "Championed gender diversity in engineering excellence",
    impact: "Empowered 100+ female students to pursue engineering careers"
  },
  {
    id: 4,
    title: "Winners of the Sight Day Congree 2.0",
    description: "We emerged victorious in the prestigious Sight Day Congress 2.0, showcasing our leadership in organizing and executing large-scale technical events. This recognition celebrates our ability to bring together the engineering community and create meaningful learning experiences for all participants.",
    year: "2024",
    image: "/awards/sdc-winners.jpg",
    achievement: "Successfully organized and won a major technical congress",
    impact: "Created networking opportunities for 200+ engineering professionals"
  }
]

export default function AwardsPage() {
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
           <div className="max-w-4xl mx-auto text-center">
             <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
               Our <span className="text-sky-600">Awards</span> & Recognition
             </h1>
             <p className="text-xl text-gray-600 leading-relaxed">
               Celebrating the achievements and recognition earned by IEEE ISIMM Student Branch 
               for our commitment to excellence, innovation, and community service.
             </p>
           </div>
         </div>
       </section>

      {/* Awards Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          

                     <div className="space-y-8 mb-12">
             {awards.map((award, index) => (
               <div
                 key={award.id}
                 className="group animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-700"
                 style={{ transitionDelay: `${index * 100}ms` }}
               >
                                   <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative h-96 md:h-80 md:w-[500px] flex-shrink-0">
                        <Image
                          src={award.image}
                          alt={award.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.jpg"
                          }}
                        />
                      </div>
                                             <div className="p-6 flex-1">
                         <div className="flex items-center gap-2 mb-3">
                           <Trophy className="h-6 w-6 text-sky-500" />
                           <span className="text-gray-500 text-sm">{award.year}</span>
                         </div>
                         <h3 className="text-xl font-bold text-gray-900 mb-3">{award.title}</h3>
                         <p className="text-gray-600 leading-relaxed">{award.description}</p>
                       </div>
                    </div>
                  </div>
               </div>
             ))}
           </div>

                     {/* Statistics Section */}
           <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-8 mb-12">
             <div className="text-center mb-8">
               <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Impact</h3>
               <p className="text-gray-600">Numbers that tell our story of success</p>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               <div className="text-center">
                 <div className="text-3xl font-bold text-sky-600 mb-2">+4</div>
                 <div className="text-sm text-gray-600">Awards Won</div>
               </div>
               <div className="text-center">
                 <div className="text-3xl font-bold text-sky-600 mb-2">6</div>
                 <div className="text-sm text-gray-600">Years of Commitment</div>
               </div>
               <div className="text-center">
                 <div className="text-3xl font-bold text-sky-600 mb-2">1000+</div>
                 <div className="text-sm text-gray-600">Students Impacted</div>
               </div>
               <div className="text-center">
                 <div className="text-3xl font-bold text-sky-600 mb-2">+10</div>
                 <div className="text-sm text-gray-600">Projects Completed</div>
               </div>
             </div>
           </div>
        </div>
      </section>

      
    </div>
  )
} 