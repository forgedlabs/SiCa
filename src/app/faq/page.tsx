import { Metadata } from "next";

export const metadata: Metadata = {
    title: "FAQ | SICA 2026",
    description: "Frequently Asked Questions about Simon & Catherine's Wedding",
};

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-white pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-2xl mx-auto">
                <h1 className="font-serif text-5xl md:text-6xl text-center mb-20 tracking-wide uppercase">
                    Q & A
                </h1>

                <div className="space-y-12">
                    {/* Dress Code */}
                    <section className="border-b border-gray-200 pb-12">
                        <h2 className="font-serif text-2xl md:text-3xl mb-6 text-black tracking-wide">What is the dress code?</h2>
                        <p className="text-gray-600 leading-loose font-sans text-sm md:text-base tracking-wide">
                            We would love to see our family and friends get dressed up for our big day.
                            The dress code is <strong className="text-black font-medium">Black Tie Optional</strong>. We ask that men wear a tuxedo or a dark suit and tie,
                            and women wear an evening gown or midi-length cocktail dress.
                        </p>
                    </section>

                    {/* Plus Ones */}
                    <section className="border-b border-gray-200 pb-12">
                        <h2 className="font-serif text-2xl md:text-3xl mb-6 text-black tracking-wide">Can I bring a plus one?</h2>
                        <p className="text-gray-600 leading-loose font-sans text-sm md:text-base tracking-wide">
                            Due to limited venue capacity, we are unable to accommodate plus ones unless specifically indicated on your invitation.
                            When you go to RSVP, you will be able to see the exact number of seats reserved in your honor.
                        </p>
                    </section>

                    {/* Children */}
                    <section className="border-b border-gray-200 pb-12">
                        <h2 className="font-serif text-2xl md:text-3xl mb-6 text-black tracking-wide">Are children welcome?</h2>
                        <p className="text-gray-600 leading-loose font-sans text-sm md:text-base tracking-wide">
                            While we love your little ones, our wedding will be an adults-only event so that everyone can relax and enjoy the evening.
                            We appreciate you making arrangements ahead of time and leaving the kids at home so you can celebrate with us.
                        </p>
                    </section>

                    {/* Transportation */}
                    <section className="border-b border-gray-200 pb-12">
                        <h2 className="font-serif text-2xl md:text-3xl mb-6 text-black tracking-wide">Is there parking or transportation?</h2>
                        <p className="text-gray-600 leading-loose font-sans text-sm md:text-base tracking-wide">
                            Yes, there is ample parking available at the venue. We will also be providing shuttle service from the main hotel block
                            to the ceremony and reception. More details on shuttle times will be provided closer to the date.
                        </p>
                    </section>

                    {/* Registry */}
                    <section className="pb-12">
                        <h2 className="font-serif text-2xl md:text-3xl mb-6 text-black tracking-wide">Where are you registered?</h2>
                        <p className="text-gray-600 leading-loose font-sans text-sm md:text-base tracking-wide">
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
