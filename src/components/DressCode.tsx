export default function DressCode() {
    return (
        <section id="dress-code" className="py-24 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl mb-2">Dress Code</h2>
                    <p className="text-gray-500 uppercase tracking-widest text-xs">Attire Guidelines</p>
                </div>

                <div className="space-y-12">
                    <div className="border-b border-gray-100 pb-12">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                            <h3 className="font-serif text-2xl">Traditional Marriage Ceremony</h3>
                            <p className="text-gray-500 uppercase tracking-widest text-xs">Traditional African Wear</p>
                        </div>
                        <p className="text-gray-600">Please honor our culture by wearing traditional African attire.</p>
                    </div>
                    <div className="pb-4">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                            <h3 className="font-serif text-2xl">Reception</h3>
                            <p className="text-gray-500 uppercase tracking-widest text-xs">Black Tie</p>
                        </div>
                        <p className="text-gray-600">An evening of elegance. Formal attire is requested for the reception.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
