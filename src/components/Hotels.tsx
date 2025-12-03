import { ExternalLink } from "lucide-react"
import Link from "next/link"

const hotels = [
    {
        name: "Fletcher Hotel Amsterdam",
        address: "Schepenbergweg 50, 1105 AT Amsterdam, Netherlands",
        link: "https://www.fletcher.nl/nl/hotel-amsterdam"
    },
    {
        name: "Courtyard Amsterdam Arena Atlas",
        address: "Hoogoorddreef 1, 1101 BA Amsterdam, Netherlands",
        link: "https://www.marriott.com/de/hotels/amsaa-courtyard-amsterdam-arena-atlas/rooms/"
    },
    {
        name: "Ozo Hotel",
        address: "Karspeldreef 2, 1101 CJ Amsterdam, Netherlands",
        link: "https://www.ozo-hotels.com/hotels/ozo-hotels-arena-amsterdam#book"
    }
]

export default function Hotels() {
    return (
        <section id="hotels" className="py-24 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl mb-2">Where to Stay?</h2>
                    <p className="text-gray-500 uppercase tracking-widest text-xs">Accommodations</p>
                </div>

                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h3 className="font-serif text-2xl mb-4">A warm welcome for our guests traveling from afar</h3>
                    <p className="text-gray-600 leading-relaxed">
                        We are deeply grateful to everyone making the journey to celebrate with us whether you're crossing cities, countries, or continents. Your presence is a true gift and we want your stay in the Netherlands to be as smooth and enjoyable as possible.
                    </p>
                </div>

                <div className="space-y-12">
                    {hotels.map((hotel, index) => (
                        <div key={index} className="border-b border-gray-100 pb-12 last:border-0 last:pb-0">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                <div>
                                    <h3 className="font-serif text-2xl mb-2">{hotel.name}</h3>
                                    <p className="text-gray-600 text-sm">{hotel.address}</p>
                                </div>
                                <Link
                                    href={hotel.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-black text-white px-6 py-2 uppercase tracking-widest text-xs hover:bg-gray-800 transition-colors whitespace-nowrap"
                                >
                                    Book Room <ExternalLink className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
