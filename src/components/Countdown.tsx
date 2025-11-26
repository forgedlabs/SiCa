"use client"

import { useState, useEffect } from "react"

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    useEffect(() => {
        const targetDate = new Date("2026-05-30T16:00:00")

        const interval = setInterval(() => {
            const now = new Date()
            const difference = targetDate.getTime() - now.getTime()

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                })
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex gap-4 md:gap-8 text-center justify-center mb-12 font-serif text-[#333]">
            <div>
                <div className="text-3xl md:text-5xl mb-2">{timeLeft.days}</div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400">Days</div>
            </div>
            <div>
                <div className="text-3xl md:text-5xl mb-2">{timeLeft.hours}</div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400">Hours</div>
            </div>
            <div>
                <div className="text-3xl md:text-5xl mb-2">{timeLeft.minutes}</div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400">Mins</div>
            </div>
            <div>
                <div className="text-3xl md:text-5xl mb-2">{timeLeft.seconds}</div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400">Secs</div>
            </div>
        </div>
    )
}
