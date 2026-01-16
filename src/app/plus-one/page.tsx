"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, Check } from "lucide-react"

function PlusOneForm() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams.get('token')

    const [loading, setLoading] = useState(false)
    const [validating, setValidating] = useState(true)
    const [valid, setValid] = useState(false)
    const [guestName, setGuestName] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [alreadySubmitted, setAlreadySubmitted] = useState(false)

    const [formData, setFormData] = useState({
        plusOneName: "",
        ceremony: "",
        dietary: ""
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    // Validate token on mount
    useEffect(() => {
        if (!token) {
            setValidating(false)
            return
        }

        async function validateToken() {
            try {
                const res = await fetch(`/api/plus-one/validate?token=${token}`)
                if (res.ok) {
                    const data = await res.json()
                    setValid(true)
                    setGuestName(`${data.firstName} ${data.lastName}`)
                    if (data.alreadySubmitted) {
                        setAlreadySubmitted(true)
                    }
                } else {
                    setValid(false)
                }
            } catch {
                setValid(false)
            } finally {
                setValidating(false)
            }
        }

        validateToken()
    }, [token])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validate
        const newErrors: Record<string, string> = {}
        if (!formData.plusOneName.trim()) {
            newErrors.plusOneName = "Plus one name is required"
        }
        if (!formData.ceremony) {
            newErrors.ceremony = "Please select which ceremonies they'll attend"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setLoading(true)
        try {
            const res = await fetch('/api/plus-one/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token,
                    ...formData
                })
            })

            if (!res.ok) {
                throw new Error('Failed to submit')
            }

            setSubmitted(true)
        } catch (error) {
            alert('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (validating) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        )
    }

    if (!token || !valid) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-black">
                <div className="w-full max-w-md text-center">
                    <Image
                        src="/logo.jpg"
                        alt="Simon & Catherine"
                        width={150}
                        height={150}
                        className="mx-auto mb-8"
                    />
                    <h1 className="font-serif text-3xl mb-4">Invalid Link</h1>
                    <p className="text-gray-600 mb-8">This link is invalid or has expired. Please check your email for the correct link.</p>
                    <Button
                        onClick={() => router.push('/')}
                        className="bg-black text-white hover:bg-gray-800 rounded-none px-8 py-3 uppercase tracking-widest text-xs"
                    >
                        Go Home
                    </Button>
                </div>
            </div>
        )
    }

    if (alreadySubmitted) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-black">
                <div className="w-full max-w-md text-center">
                    <Image
                        src="/logo.jpg"
                        alt="Simon & Catherine"
                        width={150}
                        height={150}
                        className="mx-auto mb-8"
                    />
                    <h1 className="font-serif text-3xl mb-4">Already Submitted</h1>
                    <p className="text-gray-600 mb-8">You've already submitted your plus one details for {guestName}. If you need to make changes, please contact us directly.</p>
                    <Button
                        onClick={() => router.push('/')}
                        className="bg-black text-white hover:bg-gray-800 rounded-none px-8 py-3 uppercase tracking-widest text-xs"
                    >
                        Go Home
                    </Button>
                </div>
            </div>
        )
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-black">
                <div className="w-full max-w-md text-center animate-in zoom-in">
                    <div className="mx-auto w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6">
                        <Check className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="font-serif text-3xl mb-4">Thank You!</h1>
                    <p className="text-gray-600 mb-2">We've received your plus one details.</p>
                    <p className="text-gray-600 mb-8">We look forward to celebrating with you both!</p>
                    <Button
                        onClick={() => router.push('/')}
                        className="bg-black text-white hover:bg-gray-800 rounded-none px-8 py-3 uppercase tracking-widest text-xs"
                    >
                        Back to Home
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-black">
            <div className="w-full max-w-md">
                <div className="text-center mb-12">
                    <Image
                        src="/logo.jpg"
                        alt="Simon & Catherine"
                        width={150}
                        height={150}
                        className="mx-auto mb-6"
                    />
                    <h1 className="font-serif text-3xl mb-2">Plus One Details</h1>
                    <p className="text-gray-500 uppercase tracking-widest text-sm">For {guestName}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                        <Label htmlFor="plusOneName" className="uppercase text-xs tracking-widest text-gray-500">
                            Plus One Full Name *
                        </Label>
                        <Input
                            id="plusOneName"
                            name="plusOneName"
                            value={formData.plusOneName}
                            onChange={handleChange}
                            placeholder="John Smith"
                            className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black"
                        />
                        {errors.plusOneName && <p className="text-red-500 text-xs">{errors.plusOneName}</p>}
                    </div>

                    <div className="space-y-4">
                        <Label className="uppercase text-xs tracking-widest text-gray-500">
                            Which ceremonies will they attend? *
                        </Label>
                        <RadioGroup value={formData.ceremony} onValueChange={(val) => {
                            setFormData(prev => ({ ...prev, ceremony: val }))
                            if (errors.ceremony) setErrors(prev => ({ ...prev, ceremony: "" }))
                        }}>
                            <div className="flex items-center space-x-3">
                                <RadioGroupItem value="both" id="c1" className="border-gray-300 text-black" />
                                <Label htmlFor="c1" className="font-serif text-lg cursor-pointer">Both Ceremonies</Label>
                            </div>
                            <div className="flex items-center space-x-3">
                                <RadioGroupItem value="traditional" id="c2" className="border-gray-300 text-black" />
                                <Label htmlFor="c2" className="font-serif text-lg cursor-pointer">Traditional Ceremony Only</Label>
                            </div>
                            <div className="flex items-center space-x-3">
                                <RadioGroupItem value="ceremonial" id="c3" className="border-gray-300 text-black" />
                                <Label htmlFor="c3" className="font-serif text-lg cursor-pointer">Ceremonial Exchange & Reception Only</Label>
                            </div>
                        </RadioGroup>
                        {errors.ceremony && <p className="text-red-500 text-xs">{errors.ceremony}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="dietary" className="uppercase text-xs tracking-widest text-gray-500">
                            Dietary Restrictions (Optional)
                        </Label>
                        <Input
                            id="dietary"
                            name="dietary"
                            value={formData.dietary}
                            onChange={handleChange}
                            placeholder="Vegetarian, allergies, etc."
                            className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black placeholder:text-gray-300"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white hover:bg-gray-800 rounded-none px-8 py-4 uppercase tracking-widest text-xs"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                            </>
                        ) : 'Submit Details'}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default function PlusOnePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        }>
            <PlusOneForm />
        </Suspense>
    )
}
