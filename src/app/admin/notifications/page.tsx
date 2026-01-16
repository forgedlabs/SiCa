"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Loader2, Send, CheckCircle2, AlertCircle, ArrowLeft, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function NotificationsPage() {
    const router = useRouter()
    const [emailType, setEmailType] = useState<'update' | 'reminder'>('update')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [reminderType, setReminderType] = useState<'one_month' | 'two_weeks' | 'one_week' | 'custom'>('one_month')
    const [recipientFilter, setRecipientFilter] = useState({
        rsvpStatus: 'all',
        guestRelationship: 'all',
        ceremonyAttendance: 'all',
        location: 'all'
    })
    const [guestCount, setGuestCount] = useState(0)
    const [locations, setLocations] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [sending, setSending] = useState(false)
    const [result, setResult] = useState<any>(null)
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [validationError, setValidationError] = useState<string | null>(null)
    const [showPreview, setShowPreview] = useState(false)
    const [previewHtml, setPreviewHtml] = useState('')
    const [previewing, setPreviewing] = useState(false)

    // Fetch available locations on mount
    useEffect(() => {
        async function fetchLocations() {
            try {
                const res = await fetch('/api/guests')
                if (res.ok) {
                    const guests = await res.json()
                    const uniqueLocations = [...new Set(
                        guests
                            .filter((g: any) => g.state)
                            .map((g: any) => g.state.trim())
                    )].sort() as string[]
                    setLocations(uniqueLocations)
                }
            } catch (error) {
                console.error('Error fetching locations:', error)
            }
        }
        fetchLocations()
    }, [])

    // Fetch guest count based on current filters
    useEffect(() => {
        async function fetchGuestCount() {
            setLoading(true)
            try {
                const params = new URLSearchParams()
                if (recipientFilter.rsvpStatus !== 'all') {
                    params.set('rsvpStatus', recipientFilter.rsvpStatus)
                }
                if (recipientFilter.guestRelationship !== 'all') {
                    params.set('guestRelationship', recipientFilter.guestRelationship)
                }
                if (recipientFilter.ceremonyAttendance !== 'all') {
                    params.set('mealPreference', recipientFilter.ceremonyAttendance)
                }
                if (recipientFilter.location !== 'all') {
                    params.set('state', recipientFilter.location)
                }

                const res = await fetch(`/api/guests?${params.toString()}`)
                if (res.ok) {
                    const guests = await res.json()
                    const withEmail = guests.filter((g: any) => g.email)
                    setGuestCount(withEmail.length)
                }
            } catch (error) {
                console.error('Error fetching guest count:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchGuestCount()
    }, [recipientFilter])

    const handlePreview = async () => {
        // Validate inputs
        if (emailType === 'update' && (!subject || !message)) {
            setValidationError('Please enter both subject and message')
            return
        }
        if (emailType === 'reminder' && !message) {
            setValidationError('Please enter a message')
            return
        }

        setPreviewing(true)
        setValidationError(null)

        try {
            const res = await fetch('/api/admin/preview-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    emailType,
                    subject: emailType === 'update' ? subject : `Wedding Reminder - Simon & Catherine`,
                    message,
                }),
            })

            if (!res.ok) {
                throw new Error('Failed to generate preview')
            }

            const { html } = await res.json()
            setPreviewHtml(html)
            setShowPreview(true)
        } catch (error) {
            console.error('Preview error:', error)
            setValidationError('Failed to generate preview')
        } finally {
            setPreviewing(false)
        }
    }

    const handleSend = async () => {
        // Validate inputs
        if (emailType === 'update' && (!subject || !message)) {
            setValidationError('Please enter both subject and message')
            return
        }

        if (emailType === 'reminder' && reminderType === 'custom' && !message) {
            setValidationError('Please enter a custom message for the reminder')
            return
        }

        if (guestCount === 0) {
            setValidationError('No recipients match the selected filters')
            return
        }

        setValidationError(null)
        setShowConfirmDialog(true)
    }

    const confirmSend = async () => {
        setShowConfirmDialog(false)
        setSending(true)
        setResult(null)

        try {
            const res = await fetch('/api/admin/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    emailType,
                    subject: emailType === 'update' ? subject : undefined,
                    message,
                    reminderType: emailType === 'reminder' ? reminderType : undefined,
                    recipientFilter
                })
            })

            const data = await res.json()

            if (res.ok) {
                setResult({ success: true, data })
                // Clear form
                setSubject('')
                setMessage('')
            } else {
                setResult({ success: false, error: data.error || 'Failed to send emails' })
            }
        } catch (error) {
            setResult({ success: false, error: 'Network error occurred' })
        } finally {
            setSending(false)
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="mb-12">
                    <Link
                        href="/admin"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm uppercase tracking-widest mb-8 border border-black hover:bg-black hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Admin
                    </Link>
                    <h1 className="font-serif text-4xl mb-2 uppercase tracking-wider">Send Notifications</h1>
                    <p className="text-sm uppercase tracking-widest text-gray-500">Compose and send email updates to your wedding guests</p>
                </div>

                <div className="border border-black p-8">
                    {/* Email Type Selection */}
                    <div className="mb-8 pb-8 border-b border-gray-200">
                        <Label className="text-xs uppercase tracking-widest mb-4 block font-medium">Email Type</Label>
                        <RadioGroup value={emailType} onValueChange={(val) => setEmailType(val as any)} className="flex gap-8">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="update" id="type-update" className="border-black" />
                                <Label htmlFor="type-update" className="cursor-pointer text-sm uppercase tracking-wider">Update</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="reminder" id="type-reminder" className="border-black" />
                                <Label htmlFor="type-reminder" className="cursor-pointer text-sm uppercase tracking-wider">Reminder</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Reminder Type (only for reminders) */}
                    {emailType === 'reminder' && (
                        <div className="mb-8 pb-8 border-b border-gray-200">
                            <Label className="text-xs uppercase tracking-widest mb-4 block font-medium">Reminder Type</Label>
                            <RadioGroup value={reminderType} onValueChange={(val) => setReminderType(val as any)} className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="one_month" id="rem-1m" className="border-black" />
                                    <Label htmlFor="rem-1m" className="cursor-pointer text-sm">1 Month Before Wedding</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="two_weeks" id="rem-2w" className="border-black" />
                                    <Label htmlFor="rem-2w" className="cursor-pointer text-sm">2 Weeks Before Wedding</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="one_week" id="rem-1w" className="border-black" />
                                    <Label htmlFor="rem-1w" className="cursor-pointer text-sm">1 Week Before Wedding</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="custom" id="rem-custom" className="border-black" />
                                    <Label htmlFor="rem-custom" className="cursor-pointer text-sm">Custom Message</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    )}

                    {/* Subject (only for updates) */}
                    {emailType === 'update' && (
                        <div className="mb-8">
                            <Label htmlFor="subject" className="text-xs uppercase tracking-widest mb-3 block font-medium">Subject</Label>
                            <Input
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Important Wedding Update"
                                className="border-black rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 border-0 border-b"
                            />
                        </div>
                    )}

                    {/* Message */}
                    <div className="mb-8">
                        <Label htmlFor="message" className="text-xs uppercase tracking-widest mb-3 block font-medium">
                            {emailType === 'reminder' && reminderType !== 'custom' ? 'Additional Message (Optional)' : 'Message'}
                        </Label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={emailType === 'reminder' && reminderType !== 'custom'
                                ? 'Add any additional information...'
                                : 'Enter your message here...'}
                            className="w-full min-h-[200px] p-4 border border-black focus:outline-none focus:border-black"
                        />
                        <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider">Use double line breaks for new paragraphs</p>
                    </div>

                    {/* Recipient Filters */}
                    <div className="mb-8 p-6 border border-gray-200">
                        <h3 className="text-sm uppercase tracking-widest mb-6 font-medium">Recipients</h3>

                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <Label className="text-xs uppercase tracking-widest mb-2 block">RSVP Status</Label>
                                <select
                                    value={recipientFilter.rsvpStatus}
                                    onChange={(e) => setRecipientFilter({ ...recipientFilter, rsvpStatus: e.target.value })}
                                    className="w-full p-3 border border-black focus:outline-none"
                                >
                                    <option value="all">All Guests</option>
                                    <option value="ACCEPTED">Accepted Only</option>
                                    <option value="DECLINED">Declined Only</option>
                                    <option value="PENDING">Pending Only</option>
                                </select>
                            </div>

                            <div>
                                <Label className="text-xs uppercase tracking-widest mb-2 block">Guest Relationship</Label>
                                <select
                                    value={recipientFilter.guestRelationship}
                                    onChange={(e) => setRecipientFilter({ ...recipientFilter, guestRelationship: e.target.value })}
                                    className="w-full p-3 border border-black focus:outline-none"
                                >
                                    <option value="all">All Relationships</option>
                                    <option value="GROOM">Groom's Guests</option>
                                    <option value="BRIDE">Bride's Guests</option>
                                    <option value="BOTH">Both</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <Label className="text-xs uppercase tracking-widest mb-2 block">Ceremony Attendance</Label>
                                <select
                                    value={recipientFilter.ceremonyAttendance}
                                    onChange={(e) => setRecipientFilter({ ...recipientFilter, ceremonyAttendance: e.target.value })}
                                    className="w-full p-3 border border-black focus:outline-none"
                                >
                                    <option value="all">All Ceremonies</option>
                                    <option value="both">Both Ceremonies</option>
                                    <option value="traditional">Traditional Only</option>
                                    <option value="reception">Reception Only</option>
                                </select>
                            </div>

                            <div>
                                <Label className="text-xs uppercase tracking-widest mb-2 block">Location (Country)</Label>
                                <select
                                    value={recipientFilter.location}
                                    onChange={(e) => setRecipientFilter({ ...recipientFilter, location: e.target.value })}
                                    className="w-full p-3 border border-black focus:outline-none"
                                >
                                    <option value="all">All Locations</option>
                                    {locations.map((loc) => (
                                        <option key={loc} value={loc}>{loc}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="p-4 border border-black bg-gray-50">
                            <p className="text-sm uppercase tracking-wider">
                                <strong className="font-semibold">
                                    {loading ? 'Counting...' : `${guestCount} Recipient${guestCount !== 1 ? 's' : ''}`}
                                </strong>
                            </p>
                        </div>
                    </div>

                    {/* Result Message */}
                    {result && (
                        <div className={`mb-8 p-4 border ${result.success
                            ? 'border-black bg-gray-50'
                            : 'border-black bg-gray-50'
                            }`}>
                            <div className="flex items-start gap-3">
                                {result.success ? (
                                    <>
                                        <CheckCircle2 className="h-5 w-5 mt-0.5" />
                                        <div>
                                            <p className="font-medium uppercase tracking-wider text-sm">Emails Sent Successfully</p>
                                            <p className="text-sm mt-1">
                                                Sent to {result.data.successCount} of {result.data.totalRecipients} recipients
                                                {result.data.failureCount > 0 && ` (${result.data.failureCount} failed)`}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <AlertCircle className="h-5 w-5 mt-0.5" />
                                        <div>
                                            <p className="font-medium uppercase tracking-wider text-sm">Failed to Send Emails</p>
                                            <p className="text-sm mt-1">{result.error}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Validation Error */}
                    {validationError && (
                        <div className="mb-8 p-4 border border-black bg-gray-50">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 mt-0.5" />
                                <p className="text-sm">{validationError}</p>
                            </div>
                        </div>
                    )}

                    {/* Send and Preview Buttons */}
                    <div className="flex justify-end gap-3 pt-8 border-t border-gray-200">
                        <Button
                            onClick={handlePreview}
                            disabled={previewing || guestCount === 0}
                            variant="outline"
                            className="border-black px-8 py-6 hover:bg-gray-100 disabled:bg-gray-100 uppercase tracking-widest text-xs rounded-none"
                        >
                            {previewing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <Mail className="mr-2 h-4 w-4" />
                            Preview Email
                        </Button>
                        <Button
                            onClick={handleSend}
                            disabled={sending || guestCount === 0}
                            className="bg-black text-white px-8 py-6 hover:bg-gray-800 disabled:bg-gray-300 uppercase tracking-widest text-xs rounded-none"
                        >
                            {sending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <Send className="mr-2 h-4 w-4" />
                            Send to {guestCount} Guest{guestCount !== 1 ? 's' : ''}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Preview Dialog */}
            <Dialog open={showPreview} onOpenChange={setShowPreview}>
                <DialogContent className="max-w-4xl max-h-[90vh] border-2 border-black rounded-none p-0">
                    <DialogHeader className="p-6 pb-4 border-b border-gray-200">
                        <DialogTitle className="uppercase tracking-widest text-sm">Email Preview</DialogTitle>
                        <DialogDescription className="text-sm text-gray-600">
                            This is how the email will appear to recipients. Guest names will be personalized for each recipient.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="overflow-auto max-h-[70vh] bg-gray-50">
                        <iframe
                            srcDoc={previewHtml}
                            className="w-full min-h-[500px] bg-white"
                            title="Email Preview"
                            sandbox="allow-same-origin"
                        />
                    </div>
                    <DialogFooter className="p-6 pt-4 border-t border-gray-200">
                        <Button
                            onClick={() => setShowPreview(false)}
                            variant="outline"
                            className="border-black rounded-none uppercase tracking-widest text-xs py-5 px-8"
                        >
                            Close Preview
                        </Button>
                        <Button
                            onClick={() => {
                                setShowPreview(false)
                                handleSend()
                            }}
                            className="bg-black text-white rounded-none uppercase tracking-widest text-xs py-5 px-8 hover:bg-gray-800"
                        >
                            <Send className="mr-2 h-4 w-4" />
                            Send Email
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Confirmation Dialog */}
            <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <DialogContent className="sm:max-w-md border-2 border-black rounded-none">
                    <DialogHeader>
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                                <Mail className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <DialogTitle className="text-center font-serif text-2xl">
                            Confirm Send
                        </DialogTitle>
                        <DialogDescription className="text-center text-gray-600 pt-2">
                            You are about to send this email to <strong className="text-black">{guestCount}</strong> {guestCount === 1 ? 'guest' : 'guests'}.
                            <br />
                            <span className="text-sm mt-2 block">This action cannot be undone.</span>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex gap-3 sm:justify-center mt-6">
                        <Button
                            variant="outline"
                            onClick={() => setShowConfirmDialog(false)}
                            className="flex-1 border-black rounded-none uppercase tracking-widest text-xs py-5"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={confirmSend}
                            className="flex-1 bg-black text-white rounded-none uppercase tracking-widest text-xs py-5 hover:bg-gray-800"
                        >
                            <Send className="mr-2 h-4 w-4" />
                            Send Emails
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
