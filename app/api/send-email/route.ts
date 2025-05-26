import { type NextRequest, NextResponse } from "next/server"
import { sendNotificationEmail, sendConfirmationEmail, type FormData } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { name, email, phone, formType } = body

    if (!name || !email || !phone || !formType) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email format" }, { status: 400 })
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    if (!phoneRegex.test(phone.replace(/[\s\-$$$$]/g, ""))) {
      return NextResponse.json({ success: false, error: "Invalid phone number format" }, { status: 400 })
    }

    const formData: FormData = {
      name,
      email,
      phone,
      selectedCar: body.selectedCar || "",
      selectedAttraction: body.selectedAttraction || "",
      preferredDate: body.preferredDate || "",
      message: body.message || "",
      formType: body.formType,
    }

    // Send notification email to admin
    const adminEmailResult = await sendNotificationEmail(formData)

    if (!adminEmailResult.success) {
      console.error("Failed to send admin notification:", adminEmailResult.error)
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send notification email. Please try again or contact us directly.",
        },
        { status: 500 },
      )
    }

    // Send confirmation email to user
    const userEmailResult = await sendConfirmationEmail(formData)

    if (!userEmailResult.success) {
      console.error("Failed to send user confirmation:", userEmailResult.error)
      // Still return success since admin notification was sent
      return NextResponse.json({
        success: true,
        message:
          "Your submission was received successfully. However, we encountered an issue sending the confirmation email. We will contact you shortly.",
        partialSuccess: true,
      })
    }

    return NextResponse.json({
      success: true,
      message: "Your submission was received successfully! Check your email for confirmation details.",
    })
  } catch (error) {
    console.error("Email API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again or contact us directly.",
      },
      { status: 500 },
    )
  }
}
