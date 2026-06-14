/**
 * Contact Form API Route
 * Handles contact form submissions
 */

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return Response.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Message length validation
    if (message.length < 10 || message.length > 5000) {
      return Response.json(
        { error: 'Message must be between 10 and 5000 characters' },
        { status: 400 }
      );
    }

    // TODO: Implement email sending service (SendGrid, Nodemailer, etc.)
    // For now, we'll just log and return success
    console.log('Contact form submission:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    // Simulate sending email
    // In production, integrate with email service like SendGrid
    // const emailResponse = await sendEmail({
    //   to: process.env.CONTACT_EMAIL,
    //   subject: `New Contact Form Submission from ${name}`,
    //   html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
    // });

    return Response.json(
      {
        success: true,
        message: 'Thank you for your message. We will get back to you soon!',
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return Response.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}
