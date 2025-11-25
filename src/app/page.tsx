
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Heart } from "lucide-react"
import Hotels from "@/components/Hotels"
import DressCode from "@/components/DressCode"
import AddressForm from "@/components/AddressForm"
import Countdown from "@/components/Countdown"

import LogoLoop from "@/components/LogoLoop"

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-serif text-xl font-bold tracking-widest">#SICA</div>
          <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest">
            <Link href="#story" className="hover:text-gray-500 transition-colors">Our Story</Link>
            <Link href="#schedule" className="hover:text-gray-500 transition-colors">Schedule</Link>
            <Link href="#hotels" className="hover:text-gray-500 transition-colors">Hotels</Link>
            <Link href="/rsvp" className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors">
              RSVP
            </Link>
          </div>
        </div>
      </nav>

      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24 pb-12 overflow-hidden">
        <div className="animate-fade-in-up w-full max-w-6xl mx-auto mb-12">
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
          />
        </div>

        <p className="text-gray-500 uppercase tracking-[0.2em] mb-4">We're getting married</p>
        <h1 className="font-serif text-6xl md:text-8xl mb-6">Simon & Catherine</h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-lg font-light mb-12">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span>May 30, 2026</span>
          </div>
          <div className="hidden md:block text-gray-300">|</div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-400" />
            <span>Amsterdam, NL</span>
          </div>
        </div>

        <Countdown />

        <div className="mt-8">
          <Link href="/rsvp" className="inline-block bg-black text-white px-12 py-4 text-lg uppercase tracking-widest hover:bg-gray-800 transition-colors">
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
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <h3 className="font-serif text-2xl">Traditional Marriage Ceremony</h3>
                <p className="text-gray-500 uppercase tracking-widest text-xs">Saturday, May 30 • 9:00 - 12:30</p>
              </div>
              <div className="space-y-1 text-gray-600">
                <p className="font-medium">Yaklaf Events</p>
                <p className="text-sm">Bloemendalerweg 50</p>
                <p className="text-sm">1382 KS Weesp, The Netherlands</p>
              </div>
            </div>
            <div className="border-b border-gray-100 pb-12">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <h3 className="font-serif text-2xl">Ceremonial Exchange of Vows</h3>
                <p className="text-gray-500 uppercase tracking-widest text-xs">Saturday, May 30 • 17:00 - 18:00</p>
              </div>
              <div className="space-y-1 text-gray-600">
                <p className="font-medium">Rey Events</p>
                <p className="text-sm">Trekweg 21</p>
                <p className="text-sm">1338 GA Almere, The Netherlands</p>
              </div>
            </div>
            <div className="border-b border-gray-100 pb-12">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <h3 className="font-serif text-2xl">Reception</h3>
                <p className="text-gray-500 uppercase tracking-widest text-xs">Saturday, May 30 • 18:00 - 01:00</p>
              </div>
              <div className="space-y-1 text-gray-600">
                <p className="font-medium">Rey Events</p>
                <p className="text-sm">Trekweg 21</p>
                <p className="text-sm">1338 GA Almere, The Netherlands</p>
              </div>
            </div>
            <div className="pb-4">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <h3 className="font-serif text-2xl">Thanksgiving Service</h3>
                <p className="text-gray-500 uppercase tracking-widest text-xs">Sunday, May 31 • 09:30 - 12:00</p>
              </div>
              <div className="space-y-1 text-gray-600">
                <p className="font-medium">Damascus CCI Amsterdam</p>
                <p className="text-sm">(Charity house, second floor)</p>
                <p className="text-sm">Bijlmerdreef 1239</p>
                <p className="text-sm">1103 TX Amsterdam, The Netherlands</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotels Section */}
      < Hotels />

      {/* Dress Code Section */}
      < DressCode />



      {/* Address Collection Section */}
      < section id="address" className="py-24 bg-gray-50" >
        <AddressForm />
      </section >

      {/* Footer */}
      < footer className="bg-black text-white py-12 text-center" >
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-2xl mb-4">Simon & Catherine</h2>
          <p className="text-gray-400 text-sm">May 30, 2026 • Napa Valley, CA</p>
        </div>
      </footer >
    </div >
  )
}

