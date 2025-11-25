"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Loader2, Check } from "lucide-react"

export default function AddressForm() {
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        zip: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch('/api/guests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setSubmitted(true)
            } else {
                console.error('Failed to submit address')
            }
        } catch (error) {
            console.error('Error submitting address:', error)
        } finally {
            setLoading(false)
        }
    }

    if (submitted) {
        return (
            <Card className="w-full max-w-md mx-auto border-none shadow-none bg-transparent text-center">
                <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-[#8FA398] rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                        <Check className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-2xl mb-2">Address Received</h3>
                    <p className="text-gray-600">Thank you for updating our address book!</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-md mx-auto border border-gray-200 shadow-none rounded-none bg-white">
            <CardHeader>
                <CardTitle className="font-serif text-2xl text-center">Mailing Address</CardTitle>
                <CardDescription className="text-center">Help us send you an invitation.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="John & Jane Doe" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input id="address" name="address" value={formData.address} onChange={handleChange} required placeholder="123 Love Lane" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                                <Label htmlFor="state">State</Label>
                                <Input id="state" name="state" value={formData.state} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="zip">Zip</Label>
                                <Input id="zip" name="zip" value={formData.zip} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>
                    <Button type="submit" disabled={loading} className="w-full bg-[#333] hover:bg-[#8FA398] text-white">
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit Address
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
