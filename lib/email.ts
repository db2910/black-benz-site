// app/lib/sendEmail.ts  (or wherever your helper lives)

import { Resend } from "resend";

// Initialize Resend with your API key from env:
const resend = new Resend(process.env.RESEND_API_KEY!);

export interface FormData {
  name: string;
  email: string;
  phone: string;
  selectedCar?: string;
  selectedAttraction?: string;
  preferredDate?: string;
  message: string;
  formType: "car-booking" | "tourism-booking" | "contact";
}

export async function sendNotificationEmail(data: FormData) {
  try {
    const subject = getEmailSubject(data.formType);
    const adminEmailContent = generateAdminEmailContent(data);

    // Pull “from” and “admin” from environment variables:
    const fromAddress = process.env.FROM_EMAIL!;      // e.g. "Black Benz <contact@blackbenzservices.com>"
    const adminRecipient = process.env.ADMIN_EMAIL!;  // e.g. "blackbenz110@gmail.com"

    const result = await resend.emails.send({
      from: fromAddress,
      to: [adminRecipient],
      subject: subject,
      html: adminEmailContent,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to send notification email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function sendConfirmationEmail(data: FormData) {
  try {
    const subject = getConfirmationSubject(data.formType);
    const userEmailContent = generateUserEmailContent(data);

    // Use same “from” as notifications, but “to” is user’s own email:
    const fromAddress = process.env.FROM_EMAIL!;  // e.g. "Black Benz <contact@blackbenzservices.com>"

    const result = await resend.emails.send({
      from: fromAddress,
      to: [data.email],
      subject: subject,
      html: userEmailContent,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

function getEmailSubject(formType: string): string {
  switch (formType) {
    case "car-booking":
      return "New Car Booking Request - Black Benz";
    case "tourism-booking":
      return "New Tourism Inquiry - Black Benz";
    case "contact":
      return "New Contact Form Submission - Black Benz";
    default:
      return "New Form Submission - Black Benz";
  }
}

function getConfirmationSubject(formType: string): string {
  switch (formType) {
    case "car-booking":
      return "Car Booking Request Received - Black Benz";
    case "tourism-booking":
      return "Tourism Inquiry Received - Black Benz";
    case "contact":
      return "Message Received - Black Benz";
    default:
      return "Submission Received - Black Benz";
  }
}

function generateAdminEmailContent(data: FormData): string {
  const formTypeTitle =
    data.formType === "car-booking"
      ? "Car Booking Request"
      : data.formType === "tourism-booking"
      ? "Tourism Inquiry"
      : "Contact Form Submission";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${formTypeTitle}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%); padding: 30px; text-align: center;">
          <div style="background-color: #000000; width: 60px; height: 60px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px;">
            <span style="color: #FBBF24; font-size: 24px; font-weight: bold;">BB</span>
          </div>
          <h1 style="color: #000000; margin: 0; font-size: 24px; font-weight: bold;">Black Benz</h1>
          <p style="color: #000000; margin: 5px 0 0 0; font-size: 14px;">Premium Luxury Experience</p>
        </div>

        <!-- Content -->
        <div style="padding: 30px;">
          <h2 style="color: #000000; margin: 0 0 20px 0; font-size: 20px;">${formTypeTitle}</h2>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #000000; margin: 0 0 15px 0; font-size: 16px;">Customer Information:</h3>

            <div style="margin-bottom: 10px;">
              <strong style="color: #374151;">Name:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${data.name}</span>
            </div>

            <div style="margin-bottom: 10px;">
              <strong style="color: #374151;">Email:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${data.email}</span>
            </div>

            <div style="margin-bottom: 10px;">
              <strong style="color: #374151;">Phone:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${data.phone}</span>
            </div>

            ${
              data.selectedCar
                ? `
            <div style="margin-bottom: 10px;">
              <strong style="color: #374151;">Selected Car:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${data.selectedCar}</span>
            </div>
            `
                : ""
            }

            ${
              data.selectedAttraction
                ? `
            <div style="margin-bottom: 10px;">
              <strong style="color: #374151;">Selected Attraction:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${data.selectedAttraction}</span>
            </div>
            `
                : ""
            }

            ${
              data.preferredDate
                ? `
            <div style="margin-bottom: 10px;">
              <strong style="color: #374151;">Preferred Date:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${data.preferredDate}</span>
            </div>
            `
                : ""
            }

            ${
              data.message
                ? `
            <div style="margin-bottom: 10px;">
              <strong style="color: #374151;">Message:</strong>
              <div style="color: #6b7280; margin-top: 5px; padding: 10px; background-color: #ffffff; border-radius: 4px; border-left: 3px solid #FBBF24;">
                ${data.message}
              </div>
            </div>
            `
                : ""
            }
          </div>

          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #FBBF24;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>Action Required:</strong> Please contact the customer within 2-4 hours to provide excellent service.
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #000000; padding: 20px; text-align: center;">
          <p style="color: #9ca3af; margin: 0; font-size: 12px;">
            This email was sent from the Black Benz website contact form.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateUserEmailContent(data: FormData): string {
  const formTypeMessage =
    data.formType === "car-booking"
      ? "car booking request"
      : data.formType === "tourism-booking"
      ? "tourism inquiry"
      : "message";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Thank You - Black Benz</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%); padding: 30px; text-align: center;">
          <div style="background-color: #000000; width: 60px; height: 60px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px;">
            <span style="color: #FBBF24; font-size: 24px; font-weight: bold;">BB</span>
          </div>
          <h1 style="color: #000000; margin: 0; font-size: 24px; font-weight: bold;">Black Benz</h1>
          <p style="color: #000000; margin: 5px 0 0 0; font-size: 14px;">Premium Luxury Experience</p>
        </div>

        <!-- Content -->
        <div style="padding: 30px;">
          <h2 style="color: #000000; margin: 0 0 20px 0; font-size: 22px;">Thank You, ${data.name}!</h2>

          <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
            We have successfully received your ${formTypeMessage} and appreciate your interest in Black Benz. 
            Our team will review your submission and contact you shortly to assist with your requirements.
          </p>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #000000; margin: 0 0 15px 0; font-size: 16px;">Submission Summary:</h3>

            <div style="margin-bottom: 10px;">
              <strong style="color: #374151;">Name:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${data.name}</span>
            </div>

            <div style="margin-bottom: 10px;">
              <strong style="color: #374151;">Email:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${data.email}</span>
            </div>

            <div style="margin-bottom: 10px;">
              <strong style="color: #374151;">Phone:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${data.phone}</span>
            </div>

            ${
              data.selectedCar
                ? `
            <div style="margin-bottom: 10px;">
              <strong style="color: #374151;">Selected Vehicle:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${data.selectedCar}</span>
            </div>
            `
                : ""
            }

            ${
              data.selectedAttraction
                ? `
            <div style="margin-bottom: 10px;">
              <strong style="color: #374151;">Selected Attraction:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${data.selectedAttraction}</span>
            </div>
            `
                : ""
            }

            ${
              data.preferredDate
                ? `
            <div style="margin-bottom: 10px;">
              <strong style="color: #374151;">Preferred Date:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${data.preferredDate}</span>
            </div>
            `
                : ""
            }

            <div style="margin-bottom: 10px;">
              <strong style="color: #374151;">Submission Date:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}</span>
            </div>
          </div>

          <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin-bottom: 20px;">
            <h4 style="color: #065f46; margin: 0 0 10px 0; font-size: 16px;">What happens next?</h4>
            <ul style="color: #047857; margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 5px;">Our team will review your ${formTypeMessage}</li>
              <li style="margin-bottom: 5px;">We'll contact you within 2-4 hours during business hours</li>
              <li style="margin-bottom: 5px;">We'll provide detailed information and pricing</li>
              <li>We'll help you plan the perfect luxury experience</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #6b7280; margin-bottom: 15px;">Need immediate assistance?</p>
            <div style="margin-bottom: 10px;">
              <a href="tel:+250788306454" style="color: #FBBF24; text-decoration: none; font-weight: bold;">
                📞 +250 788 306 454
              </a>
            </div>
            <div>
              <a href="mailto:blackbenz110@gmail.com" style="color: #FBBF24; text-decoration: none; font-weight: bold;">
                ✉️ blackbenz110@gmail.com
              </a>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #000000; padding: 20px; text-align: center;">
          <p style="color: #FBBF24; margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">
            Black Benz - Premium Luxury Experience
          </p>
          <p style="color: #9ca3af; margin: 0; font-size: 12px;">
            Remera Airport Road, KN 206 St | We value the time and quality of travel
          </p>
          <div style="margin-top: 15px;">
            <a href="https://www.instagram.com/black_benz_services/" style="color: #FBBF24; text-decoration: none; margin: 0 10px;">Instagram</a>
            <a href="https://x.com/BlackBenzServic" style="color: #FBBF24; text-decoration: none; margin: 0 10px;">Twitter</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
