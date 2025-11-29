"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Check } from "lucide-react"

export default function RSVPPage() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        guestRelationship: "",
        attending: "yes",
        meal: "",
        dietary: "",
        plusOne: false
    })

    const [errors, setErrors] = useState<Record<string, string>>({})

    const validateStep = (currentStep: number) => {
        const newErrors: Record<string, string> = {}
        let isValid = true

        if (currentStep === 1) {
            const nameRegex = /^[a-zA-Z\s\-\']+$/
            if (!formData.firstName.trim()) {
                newErrors.firstName = "First name is required"
            } else if (!nameRegex.test(formData.firstName)) {
                newErrors.firstName = "Name can only contain letters, spaces, hyphens and apostrophes"
            }

            if (!formData.lastName.trim()) {
                newErrors.lastName = "Last name is required"
            } else if (!nameRegex.test(formData.lastName)) {
                newErrors.lastName = "Name can only contain letters, spaces, hyphens and apostrophes"
            }

            if (!formData.email.trim()) {
                newErrors.email = "Email is required"
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = "Email is invalid"
            }
        }

        if (currentStep === 2) {
            const phoneRegex = /^[\d\+\-\s\(\)]+$/
            if (!formData.phone.trim()) {
                newErrors.phone = "Phone number is required"
            } else if (!phoneRegex.test(formData.phone)) {
                newErrors.phone = "Phone can only contain numbers and standard symbols (+, -, (), space)"
            } else if (formData.phone.replace(/\D/g, '').length < 7) {
                newErrors.phone = "Phone number is too short"
            }

            if (!formData.address.trim()) newErrors.address = "Address is required"
            if (!formData.city.trim()) newErrors.city = "City is required"
            if (!formData.state.trim()) newErrors.state = "State is required"

            if (!formData.zip.trim()) {
                newErrors.zip = "Postal code is required"
            } else if (formData.zip.trim().length < 4) {
                newErrors.zip = "Postal code is too short"
            }
        }

        if (currentStep === 3) {
            if (!formData.guestRelationship) newErrors.guestRelationship = "Please select your relationship"
        }

        if (currentStep === 4) {
            if (!formData.attending) newErrors.attending = "Please select an option"
        }

        if (currentStep === 5 && formData.attending === 'yes') {
            if (!formData.meal) newErrors.meal = "Please select a ceremony option"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            isValid = false
        } else {
            setErrors({})
        }

        return isValid
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }))
        }
    }

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(prev => prev + 1)
        }
    }

    const handleBack = () => {
        setStep(prev => prev - 1)
        setErrors({})
    }

    const handleSubmit = async () => {
        if (!validateStep(step)) return
        setLoading(true)
        try {
            // 1. Create Guest
            const guestRes = await fetch('/api/guests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    zip: formData.zip,
                    guestRelationship: formData.guestRelationship,
                })
            })

            if (!guestRes.ok) {
                const errorData = await guestRes.json()
                throw new Error(errorData.details || errorData.error || 'Failed to create guest')
            }
            const guest = await guestRes.json()

            // 2. Submit RSVP
            const rsvpRes = await fetch('/api/rsvp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    guestId: guest.id,
                    rsvpStatus: formData.attending === 'yes' ? 'ACCEPTED' : 'DECLINED',
                    mealPreference: formData.meal,
                    dietaryNotes: formData.dietary
                })
            })

            if (!rsvpRes.ok) {
                const errorData = await rsvpRes.json()
                throw new Error(errorData.details || errorData.error || 'Failed to submit RSVP')
            }

            setStep(6) // Success step
        } catch (error) {
            console.error(error)
            if (error instanceof Error) {
                alert(error.message)
            } else {
                alert('Something went wrong. Please try again.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-black">
            <div className="w-full max-w-md">
                <div className="text-center mb-12">
                    <div className="mb-8">
                        <Image
                            src="/logo.jpg"
                            alt="Simon & Catherine"
                            width={200}
                            height={200}
                            className="mx-auto"
                        />
                    </div>
                    <h1 className="font-serif text-4xl mb-2">RSVP</h1>
                    <p className="text-gray-500 uppercase tracking-widest text-sm">Simon & Catherine • May 30, 2026</p>
                </div>

                <div className="bg-white">
                    {step === 1 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName" className="uppercase text-xs tracking-widest text-gray-500">First Name</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="Jane"
                                        className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black placeholder:text-gray-300"
                                    />
                                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="uppercase text-xs tracking-widest text-gray-500">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Doe"
                                        className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black placeholder:text-gray-300"
                                    />
                                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="uppercase text-xs tracking-widest text-gray-500">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="jane@example.com"
                                    className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black placeholder:text-gray-300"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="uppercase text-xs tracking-widest text-gray-500">Phone Number</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+31 6 1234 5678"
                                    className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black placeholder:text-gray-300"
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address" className="uppercase text-xs tracking-widest text-gray-500">Street Address</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="123 Main Street"
                                    className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black placeholder:text-gray-300"
                                />
                                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                            </div>
                            <div className="grid grid-cols-3 gap-8">
                                <div className="space-y-2">
                                    <Label htmlFor="city" className="uppercase text-xs tracking-widest text-gray-500">City</Label>
                                    <Input
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Amsterdam"
                                        className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black placeholder:text-gray-300"
                                    />
                                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state" className="uppercase text-xs tracking-widest text-gray-500">State/Province</Label>
                                    <Input
                                        id="state"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="NH"
                                        className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black placeholder:text-gray-300"
                                    />
                                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zip" className="uppercase text-xs tracking-widest text-gray-500">Postal Code</Label>
                                    <Input
                                        id="zip"
                                        name="zip"
                                        value={formData.zip}
                                        onChange={handleChange}
                                        placeholder="1012 AB"
                                        className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black placeholder:text-gray-300"
                                    />
                                    {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                            <div className="space-y-4">
                                <Label className="uppercase text-xs tracking-widest text-gray-500">Guest Relationship</Label>
                                <RadioGroup value={formData.guestRelationship} onValueChange={(val: string) => {
                                    setFormData(prev => ({ ...prev, guestRelationship: val }))
                                    if (errors.guestRelationship) setErrors(prev => ({ ...prev, guestRelationship: "" }))
                                }} className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <RadioGroupItem value="GROOM" id="g1" className="border-gray-300 text-black" />
                                        <Label htmlFor="g1" className="font-serif text-xl cursor-pointer">Guest of the Groom</Label>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <RadioGroupItem value="BRIDE" id="g2" className="border-gray-300 text-black" />
                                        <Label htmlFor="g2" className="font-serif text-xl cursor-pointer">Guest of the Bride</Label>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <RadioGroupItem value="BOTH" id="g3" className="border-gray-300 text-black" />
                                        <Label htmlFor="g3" className="font-serif text-xl cursor-pointer">Guest of Both</Label>
                                    </div>
                                </RadioGroup>
                                {errors.guestRelationship && <p className="text-red-500 text-xs mt-1">{errors.guestRelationship}</p>}
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                            <div className="space-y-4">
                                <Label className="uppercase text-xs tracking-widest text-gray-500">Will you be attending?</Label>
                                <RadioGroup value={formData.attending} onValueChange={(val: string) => {
                                    setFormData(prev => ({ ...prev, attending: val }))
                                    if (errors.attending) setErrors(prev => ({ ...prev, attending: "" }))
                                }} className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <RadioGroupItem value="yes" id="r1" className="border-gray-300 text-black" />
                                        <Label htmlFor="r1" className="font-serif text-xl cursor-pointer">Joyfully Accept</Label>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <RadioGroupItem value="no" id="r2" className="border-gray-300 text-black" />
                                        <Label htmlFor="r2" className="font-serif text-xl cursor-pointer">Regretfully Decline</Label>
                                    </div>
                                </RadioGroup>
                                {errors.attending && <p className="text-red-500 text-xs mt-1">{errors.attending}</p>}
                            </div>
                        </div>
                    )}

                    {step === 5 && formData.attending === 'yes' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                            <div className="space-y-4">
                                <Label className="uppercase text-xs tracking-widest text-gray-500">Which ceremonies will you attend?</Label>
                                <RadioGroup value={formData.meal} onValueChange={(val: string) => {
                                    setFormData(prev => ({ ...prev, meal: val }))
                                    if (errors.meal) setErrors(prev => ({ ...prev, meal: "" }))
                                }} className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <RadioGroupItem value="both" id="m1" className="border-gray-300 text-black" />
                                        <Label htmlFor="m1" className="font-serif text-lg cursor-pointer">Both Ceremonies</Label>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <RadioGroupItem value="traditional" id="m2" className="border-gray-300 text-black" />
                                        <Label htmlFor="m2" className="font-serif text-lg cursor-pointer">Traditional Ceremony Only</Label>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <RadioGroupItem value="ceremonial" id="m3" className="border-gray-300 text-black" />
                                        <Label htmlFor="m3" className="font-serif text-lg cursor-pointer">Ceremonial Exchange & Reception Only</Label>
                                    </div>
                                </RadioGroup>
                                {errors.meal && <p className="text-red-500 text-xs mt-1">{errors.meal}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dietary" className="uppercase text-xs tracking-widest text-gray-500">Dietary Restrictions</Label>
                                <Input
                                    id="dietary"
                                    name="dietary"
                                    value={formData.dietary}
                                    onChange={handleChange}
                                    placeholder="Gluten-free, allergies, etc."
                                    className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black placeholder:text-gray-300"
                                />
                            </div>

                            <div className="pt-8">
                                <div className="flex items-center space-x-3 mb-6">
                                    <Checkbox
                                        id="plusOne"
                                        checked={formData.plusOne}
                                        onCheckedChange={(checked: boolean | "indeterminate") => setFormData(prev => ({ ...prev, plusOne: checked as boolean }))}
                                        className="border-gray-300 data-[state=checked]:bg-black data-[state=checked]:text-white"
                                    />
                                    <Label htmlFor="plusOne" className="font-serif text-lg cursor-pointer">I am bringing a plus one</Label>
                                </div>

                                {formData.plusOne && (
                                    <div className="pl-6 border-l border-gray-200 space-y-4 animate-in fade-in slide-in-from-left-2">
                                        <p className="text-sm text-gray-500 italic">We will follow up for your guest's details.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {step === 4 && formData.attending === 'no' && (
                        <div className="text-center py-12 text-gray-500 font-serif text-xl">
                            We'll miss you! Click submit to confirm.
                        </div>
                    )}

                    {step === 6 && (
                        <div className="text-center py-12 animate-in zoom-in duration-500">
                            <div className="font-serif text-4xl mb-4">Thank You</div>
                            <p className="text-gray-500 uppercase tracking-widest text-sm">Your RSVP has been received</p>
                        </div>
                    )}
                </div>

                <div className="mt-12 flex justify-between items-center">
                    {step < 6 && (
                        <>
                            {step > 1 ? (
                                <Button variant="ghost" onClick={handleBack} className="uppercase tracking-widest text-xs hover:bg-transparent hover:text-gray-500 p-0">Back</Button>
                            ) : (
                                <Button variant="ghost" onClick={() => router.push('/')} className="uppercase tracking-widest text-xs hover:bg-transparent hover:text-gray-500 p-0">Cancel</Button>
                            )}

                            {(step < 4 || (step === 4 && formData.attending === 'yes')) ? (
                                <Button onClick={handleNext} className="bg-black text-white rounded-none px-8 py-6 uppercase tracking-widest text-xs hover:bg-gray-800">Next</Button>
                            ) : (
                                <Button onClick={handleSubmit} disabled={loading} className="bg-black text-white rounded-none px-8 py-6 uppercase tracking-widest text-xs hover:bg-gray-800">
                                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Submit RSVP
                                </Button>
                            )}
                        </>
                    )}
                    {step === 6 && (
                        <Button onClick={() => router.push('/')} className="w-full bg-black text-white rounded-none px-8 py-6 uppercase tracking-widest text-xs hover:bg-gray-800">
                            Back to Home
                        </Button>
                    )}
                </div>
                <div className="text-center mt-12">
                    <Image
                        src="/logo-simple.jpg"
                        alt="S&C"
                        width={80}
                        height={80}
                        className="mx-auto opacity-40"
                    />
                </div>
            </div>
        </div>
    )
}
