import { Metadata } from "next";

export const metadata: Metadata = {
    title: "FAQ | SICA 2026",
    description: "Frequently Asked Questions about Simon & Catherine's Wedding",
};

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-[#F5F5F0] pt-24 pb-16 px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="font-serif text-4xl md:text-5xl text-center mb-12 tracking-wide">
                    Frequently Asked Questions
                </h1>

                <div className="space-y-8">
                    {/* Dress Code */}
                    <section className="bg-white p-8 rounded-sm shadow-sm">
                        <h2 className="font-serif text-2xl mb-4 text-gray-900">What is the dress code?</h2>
                        <p className="text-gray-600 leading-relaxed font-sans">
                            We would love to see our family and friends get dressed up for our big day.
                            The dress code is <strong>Black Tie Optional</strong>. We ask that men wear a tuxedo or a dark suit and tie,
                            and women wear an evening gown or midi-length cocktail dress.
                        </p>
                    </section>

                    {/* Plus Ones */}
                    <section className="bg-white p-8 rounded-sm shadow-sm">
                        <h2 className="font-serif text-2xl mb-4 text-gray-900">Can I bring a plus one?</h2>
                        <p className="text-gray-600 leading-relaxed font-sans">
                            Due to limited venue capacity, we are unable to accommodate plus ones unless specifically indicated on your invitation.
                            When you go to RSVP, you will be able to see the exact number of seats reserved in your honor.
                        </p>
                    </section>

                    {/* Children */}
                    <section className="bg-white p-8 rounded-sm shadow-sm">
                        <h2 className="font-serif text-2xl mb-4 text-gray-900">Are children welcome?</h2>
                        <p className="text-gray-600 leading-relaxed font-sans">
                            While we love your little ones, our wedding will be an adults-only event so that everyone can relax and enjoy the evening.
                            We appreciate you making arrangements ahead of time and leaving the kids at home so you can celebrate with us.
                        </p>
                    </section>

                    {/* Transportation */}
                    <section className="bg-white p-8 rounded-sm shadow-sm">
                        <h2 className="font-serif text-2xl mb-4 text-gray-900">Is there parking or transportation?</h2>
                        <p className="text-gray-600 leading-relaxed font-sans">
                            Yes, there is ample parking available at the venue. We will also be providing shuttle service from the main hotel block
                            to the ceremony and reception. More details on shuttle times will be provided closer to the date.
                        </p>
                    </section>

                    {/* Registry */}
                    <section className="bg-white p-8 rounded-sm shadow-sm">
                        <h2 className="font-serif text-2xl mb-4 text-gray-900">Where are you registered?</h2>
                        <p className="text-gray-600 leading-relaxed font-sans">
                            Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift,
                            we have registered a list of items we would find useful as we start our married life together.
                            (Registry links coming soon).
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
