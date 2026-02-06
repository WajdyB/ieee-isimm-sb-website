"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-2">
            <h3 className="text-xl font-bold mb-4">IEEE ISIMM Student Branch</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Advancing technology for humanity through innovation, collaboration, and professional development among
              engineering students.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/IEEEISIMMSB"
                target="_blank"
                className="bg-sky-500 p-2 rounded-full hover:bg-sky-600 transition-colors duration-200"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/ieee_isimm_sb/?hl=fr"
                target="_blank"
                className="bg-sky-500 p-2 rounded-full hover:bg-sky-600 transition-colors duration-200"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/ieee-isimm-sb/"
                target="_blank"
                className="bg-sky-500 p-2 rounded-full hover:bg-sky-600 transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-sky-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-sky-400 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/committee" className="text-muted-foreground hover:text-sky-400 transition-colors duration-200">
                  Executive Committee
                </Link>
              </li>
              <li>
                <Link href="/subunits" className="text-muted-foreground hover:text-sky-400 transition-colors duration-200">
                  Chapters & Affinity Groups
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-muted-foreground hover:text-sky-400 transition-colors duration-200">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/timeline" className="text-muted-foreground hover:text-sky-400 transition-colors duration-200">
                  Timeline
                </Link>
              </li>
              <li>
                <Link href="/awards" className="text-muted-foreground hover:text-sky-400 transition-colors duration-200">
                  Awards
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-muted-foreground hover:text-sky-400 transition-colors duration-200">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-sky-400 transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-sky-400" />
                <span className="text-muted-foreground text-sm">sb-isimm@ieee.org</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-sky-400" />
                <span className="text-muted-foreground text-sm">+216 94 660 522</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-sky-400 mt-0.5" />
                <span className="text-muted-foreground text-sm">ISIMM Campus, Monastir, Tunisia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <div className="flex items-center justify-center gap-3">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} IEEE ISIMM Student Branch. All rights reserved.
            </p>
            <Link
              href="https://github.com/WajdyB"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 transition-colors duration-200 inline-flex"
              aria-label="Developer GitHub Profile"
            >
              <Github className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
