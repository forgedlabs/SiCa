"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    // Handle scroll effect for navbar background
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isMenuOpen])

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || isMenuOpen ? "bg-white border-b border-gray-100 py-4" : "bg-white/90 backdrop-blur-sm py-4 border-b border-gray-100"}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="font-serif text-xl font-bold tracking-widest z-50 relative">
                    #SICA
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest items-center">
                    <Link href="#story" className="hover:text-gray-500 transition-colors">Our Story</Link>
                    <Link href="#schedule" className="hover:text-gray-500 transition-colors">Schedule</Link>
                    <Link href="#hotels" className="hover:text-gray-500 transition-colors">Hotels</Link>
                    <Link href="/faq" className="hover:text-gray-500 transition-colors">FAQ</Link>
                    <Link href="/rsvp" className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors">
                        RSVP
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden z-50 relative p-2 -mr-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Mobile Menu Overlay */}
                <div className={`fixed inset-0 bg-white z-40 flex flex-col justify-center items-center transition-all duration-300 ease-in-out md:hidden ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
                    <div className="flex flex-col gap-8 text-center text-lg uppercase tracking-widest">
                        <Link
                            href="#story"
                            className="hover:text-gray-500 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Our Story
                        </Link>
                        <Link
                            href="#schedule"
                            className="hover:text-gray-500 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Schedule
                        </Link>
                        <Link
                            href="#hotels"
                            className="hover:text-gray-500 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Hotels
                        </Link>
                        <Link
                            href="/faq"
                            className="hover:text-gray-500 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            FAQ
                        </Link>
                        <Link
                            href="/rsvp"
                            className="bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors mt-4"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            RSVP
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
