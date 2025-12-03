
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Heart, Map } from "lucide-react"
import Hotels from "@/components/Hotels"
import DressCode from "@/components/DressCode"
import Countdown from "@/components/Countdown"

import Navbar from "@/components/Navbar"
import LogoLoop from "@/components/LogoLoop"

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24 pb-12 overflow-hidden">
        <div className="animate-fade-in-up w-full max-w-6xl mx-auto mb-8 md:mb-12">
          <LogoLoop
            logos={[
              { src: "/hero-1.jpg", alt: "Couple Photo 1" },
              { src: "/hero-2.jpg", alt: "Couple Photo 2" },
              { src: "/hero-3.jpg", alt: "Couple Photo 3" }
            ]}
            logoHeight="60vh"
            gap="10vw"
            speed={30}
            direction="left"
            pauseOnHover={false}
            className="hidden md:block"
          />
          {/* Mobile specific LogoLoop with smaller height */}
          <LogoLoop
            logos={[
              { src: "/hero-1.jpg", alt: "Couple Photo 1" },
              { src: "/hero-2.jpg", alt: "Couple Photo 2" },
              { src: "/hero-3.jpg", alt: "Couple Photo 3" }
            ]}
            logoHeight="45vh"
            gap="20px"
            speed={20}
            direction="left"
            pauseOnHover={false}
            className="md:hidden"
          />
        </div>

        <p className="w-full text-center text-gray-500 uppercase tracking-[0.2em] mb-4 text-sm md:text-base">We're getting married</p>
        <h1 className="w-full text-center font-serif text-5xl md:text-8xl mb-6 leading-tight uppercase flex flex-col items-center gap-4">
          <span>Simon</span>
          <span className="text-6xl md:text-9xl font-light">&</span>
          <span>Catherine</span>
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-base md:text-lg font-light mb-12">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
            <span>May 30, 2026</span>
          </div>
          <div className="hidden md:block text-gray-300">|</div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
            <span>Amsterdam, NL</span>
          </div>
        </div>

        <Countdown />

        <div className="mt-8">
          <Link href="/rsvp" className="inline-block bg-black text-white px-10 py-3 md:px-12 md:py-4 text-base md:text-lg uppercase tracking-widest hover:bg-gray-800 transition-colors">
            RSVP Now
          </Link>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl mb-2">The Weekend</h2>
            <p className="text-gray-500 uppercase tracking-widest text-xs">Schedule of Events</p>
          </div>
          <div className="space-y-12">
            <div className="border-b border-gray-100 pb-12">
              <div className="flex flex-col items-center gap-2 mb-4 text-center">
                <h3 className="font-serif text-2xl">Traditional Marriage Ceremony</h3>
                <p className="text-gray-500 uppercase tracking-widest text-xs">Saturday, May 30 • 9:00 - 12:30</p>
              </div>
              <div className="space-y-1 text-gray-600 text-center">
                <p className="font-medium">Yaklaf Events</p>
                <p className="text-sm">Bloemendalerweg 50</p>
                <p className="text-sm">1382 KS Weesp, The Netherlands</p>
                <Link
                  href="https://www.google.com/maps/search/?api=1&query=Yaklaf+Events+Bloemendalerweg+50+1382+KS+Weesp+The+Netherlands"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center mt-2 text-black hover:text-gray-600 transition-colors"
                >
                  <Map className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="border-b border-gray-100 pb-12">
              <div className="flex flex-col items-center gap-2 mb-4 text-center">
                <h3 className="font-serif text-2xl">Ceremonial Exchange of Vows</h3>
                <p className="text-gray-500 uppercase tracking-widest text-xs">Saturday, May 30 • 17:00 - 18:00</p>
              </div>
              <div className="space-y-1 text-gray-600 text-center">
                <p className="font-medium">Rey Events</p>
                <p className="text-sm">Trekweg 21</p>
                <p className="text-sm">1338 GA Almere, The Netherlands</p>
                <Link
                  href="https://www.google.com/maps/search/?api=1&query=Rey+Events+Trekweg+21+1338+GA+Almere+The+Netherlands"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center mt-2 text-black hover:text-gray-600 transition-colors"
                >
                  <Map className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="border-b border-gray-100 pb-12">
              <div className="flex flex-col items-center gap-2 mb-4 text-center">
                <h3 className="font-serif text-2xl">Reception</h3>
                <p className="text-gray-500 uppercase tracking-widest text-xs">Saturday, May 30 • 18:00 - 01:00</p>
              </div>
              <div className="space-y-1 text-gray-600 text-center">
                <p className="font-medium">Rey Events</p>
                <p className="text-sm">Trekweg 21</p>
                <p className="text-sm">1338 GA Almere, The Netherlands</p>
                <Link
                  href="https://www.google.com/maps/search/?api=1&query=Rey+Events+Trekweg+21+1338+GA+Almere+The+Netherlands"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center mt-2 text-black hover:text-gray-600 transition-colors"
                >
                  <Map className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotels Section */}
      <Hotels />

      {/* Dress Code Section */}
      <DressCode />



      {/* Footer */}
      <footer className="bg-black text-white py-12 text-center">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <h2 className="font-serif text-2xl mb-4">Simon & Catherine</h2>
          <p className="text-gray-400 text-sm mb-8">May 30, 2026 • Amsterdam, NL</p>
          <div className="relative w-20 h-20 opacity-80">
            <Image
              src="/hero-logo.png"
              alt="SICA Logo"
              fill
              className="object-contain invert"
            />
          </div>
        </div>
      </footer>
    </div>
  )
}

