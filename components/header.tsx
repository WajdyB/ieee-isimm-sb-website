"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Executive Committee", href: "/committee" },
    { name: "Events", href: "/events" },
    { name: "Subunits", href: "/subunits" },
    { name: "Timeline", href: "/timeline" },
    { name: "Awards", href: "/awards" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-sky-100 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logos/logo-isimm-sb.png?height=60&width=150"
              alt="IEEE ISIMM Logo"
              width={180}
              height={75}
              className="h-16 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-sky-500 font-medium transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* IEEE Tunisia Section Logo */}
          <div className="hidden md:flex items-center">
            <Image
              src="/logos/tunisia_section_logo.png?height=60&width=150"
              alt="IEEE Tunisia Section"
              width={180}
              height={75}
              className="h-16 w-auto"
            />
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-sky-100">
            <div className="flex flex-col space-y-3 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-sky-500 font-medium transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="flex justify-center mt-4 pt-4 border-t border-sky-100">
              <Image
                src="/logos/tunisia_section_logo.png?height=50&width=120"
                alt="IEEE Tunisia Section"
                width={120}
                height={50}
                className="h-14 w-auto"
              />
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
