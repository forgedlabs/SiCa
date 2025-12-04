import { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "FAQ | SICA 2026",
    description: "Frequently Asked Questions about Simon & Catherine's Wedding",
};

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-32 pb-24 px-6 md:px-12">
                <div className="max-w-2xl mx-auto">
                    <h1 className="font-serif text-5xl md:text-6xl text-center mb-20 tracking-wide uppercase">
                        Q & A
                    </h1>

                    <div className="space-y-12">
                        {/* Children */}
                        <section className="border-b border-gray-200 pb-12">
                            <h2 className="font-serif text-2xl md:text-3xl mb-6 text-black tracking-wide">Are children welcome?</h2>
                            <p className="text-gray-600 leading-loose font-sans text-sm md:text-base tracking-wide">
                                We truly adore your little ones they bring so much joy, energy and light. For our big day we've planned the celebrations in a way that allows parents to relax and fully enjoy the moment with us. Children are warmly invited to the Traditional Marriage Ceremony in the morning which will be lively, family focused and filled with cultural celebration. For the evening ceremony and reception we've chosen for an adults only event so everyone can celebrate comfortably and late into the night.
                            </p>
                        </section>

                        {/* Plus One */}
                        <section className="border-b border-gray-200 pb-12">
                            <h2 className="font-serif text-2xl md:text-3xl mb-6 text-black tracking-wide">Can I bring a plus one?</h2>
                            <p className="text-gray-600 leading-loose font-sans text-sm md:text-base tracking-wide mb-4">
                                For the Traditional Marriage Ceremony everyone is welcome: family, friends, plus ones and children. The morning celebration is a shared moment of joy and we're delighted to include all who wish to join us.
                            </p>
                            <p className="text-gray-600 leading-loose font-sans text-sm md:text-base tracking-wide">
                                The Evening Ceremony and Reception are reserved for invited guests only due to limited space and the formal nature of the event. If your invitation includes a plus one it will be clearly indicated. Although we would love to include everyone, only the individuals named on the invitation are invited.
                            </p>
                        </section>

                        {/* Dress Code */}
                        <section className="border-b border-gray-200 pb-12">
                            <h2 className="font-serif text-2xl md:text-3xl mb-6 text-black tracking-wide">What should I wear?</h2>
                            <p className="text-gray-600 leading-loose font-sans text-sm md:text-base tracking-wide mb-4">
                                To the Traditional Ceremony Kente, Ntoma or other Traditional African attire is joyfully encouraged. Feel free to embrace colour, culture and heritage. The brighter, the better!
                            </p>
                            <p className="text-gray-600 leading-loose font-sans text-sm md:text-base tracking-wide">
                                For our evening events follow a Black Tie dress code. Think elegant gowns, sharp suits, tuxedos and your most refined evening style. It’s a night to dress up, shine, and celebrate in timeless elegance.
                            </p>
                        </section>

                        {/* Parking */}
                        <section className="border-b border-gray-200 pb-12">
                            <h2 className="font-serif text-2xl md:text-3xl mb-6 text-black tracking-wide">Is parking available?</h2>
                            <p className="text-gray-600 leading-loose font-sans text-sm md:text-base tracking-wide">
                                Yes. Both venues offer free parking.
                            </p>
                        </section>

                        {/* Hashtag */}
                        <section className="border-b border-gray-200 pb-12">
                            <h2 className="font-serif text-2xl md:text-3xl mb-6 text-black tracking-wide">What's the wedding hashtag?</h2>
                            <p className="text-gray-600 leading-loose font-sans text-sm md:text-base tracking-wide">
                                Please share your beautiful moments using <strong className="text-black font-medium">#SICA2026</strong>. We look forward to reliving the magic through your photos.
                            </p>
                        </section>

                        {/* Photos */}
                        <section className="border-b border-gray-200 pb-12">
                            <h2 className="font-serif text-2xl md:text-3xl mb-6 text-black tracking-wide">Can we take photos?</h2>
                            <p className="text-gray-600 leading-loose font-sans text-sm md:text-base tracking-wide">
                                Feel free to capture the beauty of the day! We request a brief “unplugged moment” during the vows. We thank you in advance for honouring it.
                            </p>
                        </section>

                        {/* Transportation */}
                        <section className="border-b border-gray-200 pb-12">
                            <h2 className="font-serif text-2xl md:text-3xl mb-6 text-black tracking-wide">Is transportation provided?</h2>
                            <p className="text-gray-600 leading-loose font-sans text-sm md:text-base tracking-wide">
                                Guests will need to arrange their own transportation between venues.
                            </p>
                        </section>

                        {/* Gift Registry */}
                        <section className="pb-12">
                            <h2 className="font-serif text-2xl md:text-3xl mb-6 text-black tracking-wide">Do you have a gift registry?</h2>
                            <p className="text-gray-600 leading-loose font-sans text-sm md:text-base tracking-wide">
                                Your love, prayers and presence are the greatest gifts. We do not have a registry. Anything given from the heart is warmly appreciated. ❤️
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
