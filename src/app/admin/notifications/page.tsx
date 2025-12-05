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

export default function NotificationsPage() {
    const router = useRouter()
    const [emailType, setEmailType] = useState<'update' | 'reminder'>('update')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [reminderType, setReminderType] = useState<'one_month' | 'two_weeks' | 'one_week' | 'custom'>('one_month')
    const [recipientFilter, setRecipientFilter] = useState({
        rsvpStatus: 'all',
        guestRelationship: 'all'
    })
    const [guestCount, setGuestCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [sending, setSending] = useState(false)
    const [result, setResult] = useState<any>(null)
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [validationError, setValidationError] = useState<string | null>(null)

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
                    <button
                        onClick={() => router.push('/admin')}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm uppercase tracking-widest mb-8 border border-black hover:bg-black hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Admin
                    </button>
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

                    {/* Send Button */}
                    <div className="flex justify-end pt-8 border-t border-gray-200">
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
