const nodemailer = require('nodemailer');
require('dotenv').config();

// Create transporter for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'harshalkar0504@gmail.com',
    pass: 'ldbf wfje awut wnow'
  }
});

// Email templates
const emailTemplates = {
  registration: (data) => ({
    subject: 'New TPO Registration - Student Registration',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New TPO Registration</title>
        <style>
          @media only screen and (max-width: 600px) {
            .container {
              width: 100% !important;
              padding: 10px !important;
            }
            .content {
              padding: 20px !important;
            }
            .header h2 {
              font-size: 20px !important;
              line-height: 24px !important;
            }
            .section {
              padding: 15px !important;
              margin-bottom: 20px !important;
            }
            .table-responsive {
              display: block !important;
            }
            .table-responsive table {
              width: 100% !important;
            }
            .table-responsive td {
              display: block !important;
              width: 100% !important;
              padding: 8px 0 !important;
              border-bottom: 1px solid #e5e7eb !important;
            }
            .table-responsive td:first-child {
              font-weight: bold !important;
              color: #374151 !important;
              background-color: #f9fafb !important;
              padding: 10px 0 !important;
            }
            .footer {
              text-align: center !important;
              padding: 15px !important;
            }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa;">
        <div class="container" style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div class="content" style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <div class="header" style="text-align: center; margin-bottom: 30px;">
              <h2 style="color: #4f46e5; margin-bottom: 30px; font-size: 24px; line-height: 28px;">🎓 New TPO Registration</h2>
            </div>
            
            <div class="section" style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #374151; margin-top: 0; font-size: 18px;">Student Information</h3>
              <div class="table-responsive">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 40%;">Name:</td>
                    <td style="padding: 8px 0; color: #6b7280; width: 60%;">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Roll Number:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${data.roll}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Branch:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${data.branch}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Year:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${data.year}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${data.phone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${data.email}</td>
                  </tr>
                  ${data.why ? `
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Why Join TPO:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${data.why}</td>
                  </tr>
                  ` : ''}
                </table>
              </div>
            </div>
            
            <div class="section" style="background-color: #ecfdf5; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
              <p style="margin: 0; color: #065f46; font-weight: 500; font-size: 16px;">
                📅 Registration Date: ${new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            
            <div class="section" style="background-color: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
              <h4 style="color: #92400e; margin-top: 0; margin-bottom: 15px; font-size: 16px;">📎 Resume Attachment</h4>
              <p style="color: #92400e; line-height: 1.6; margin: 0; font-size: 16px;">
                The student's resume (${data.resumeFileName || 'resume'}) has been attached to this email.
                ${data.resumeSize ? `File size: ${data.resumeSize}` : ''}
              </p>
            </div>
            
            <div class="footer" style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px;">
                This registration was submitted through the TPO website.
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  registrationThankYou: (data) => ({
    subject: 'Thank You for Your TPO Registration! 🎓',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TPO Registration Confirmation</title>
        <style>
          @media only screen and (max-width: 600px) {
            .container {
              width: 100% !important;
              padding: 10px !important;
            }
            .content {
              padding: 20px !important;
            }
            .header h1 {
              font-size: 24px !important;
              line-height: 28px !important;
            }
            .header h2 {
              font-size: 18px !important;
              line-height: 22px !important;
            }
            .section {
              padding: 15px !important;
              margin-bottom: 20px !important;
            }
            .table-responsive {
              display: block !important;
            }
            .table-responsive table {
              width: 100% !important;
            }
            .table-responsive td {
              display: block !important;
              width: 100% !important;
              padding: 8px 0 !important;
              border-bottom: 1px solid #e5e7eb !important;
            }
            .table-responsive td:first-child {
              font-weight: bold !important;
              color: #374151 !important;
              background-color: #f9fafb !important;
              padding: 10px 0 !important;
            }
            .contact-info {
              text-align: center !important;
            }
            .footer {
              text-align: center !important;
              padding: 15px !important;
            }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa;">
        <div class="container" style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div class="content" style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <div class="header" style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #4f46e5; margin-bottom: 10px; font-size: 28px; line-height: 32px;">🎓 TPO Registration Confirmation</h1>
              <h2 style="color: #374151; margin-bottom: 20px; font-size: 20px; line-height: 24px;">Vasantdada Patil Pratishthan's College of Engineering</h2>
            </div>
            
            <div class="section" style="background-color: #f0f9ff; padding: 25px; border-radius: 10px; border-left: 5px solid #3b82f6; margin-bottom: 25px;">
              <h3 style="color: #1e40af; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Dear ${data.name},</h3>
              <p style="color: #1e3a8a; line-height: 1.6; margin-bottom: 15px; font-size: 16px;">
                Thank you for registering with the Training and Placement Office (TPO) of Vasantdada Patil Pratishthan's College of Engineering (VPPCOE).
                We have successfully received your registration details.
              </p>
              <p style="color: #1e3a8a; line-height: 1.6; margin-bottom: 0; font-size: 16px;">
                You are now officially part of our placement portal. Please stay updated for upcoming placement drives, training sessions, and important announcements that will help you grow professionally.
              </p>
            </div>
            
            <div class="section" style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
              <h4 style="color: #374151; margin-top: 0; margin-bottom: 15px; font-size: 16px;">📋 Registration Summary</h4>
              <div class="table-responsive">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 40%;">Name:</td>
                    <td style="padding: 8px 0; color: #6b7280; width: 60%;">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Roll Number:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${data.roll}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Branch:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${data.branch}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Year:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${data.year}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${data.phone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${data.email}</td>
                  </tr>
                  ${data.why ? `
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Why Join TPO:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${data.why}</td>
                  </tr>
                  ` : ''}
                </table>
              </div>
            </div>
            
            <div class="section" style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin-bottom: 25px;">
              <h4 style="color: #065f46; margin-top: 0; margin-bottom: 15px; font-size: 16px;">📅 Registration Details</h4>
              <p style="margin: 0; color: #065f46; font-weight: 500; font-size: 16px;">
                Registration Date: ${new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            
            <div class="section contact-info" style="background-color: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
              <h4 style="color: #92400e; margin-top: 0; margin-bottom: 15px; font-size: 16px;">📞 Contact Information</h4>
              <p style="color: #92400e; line-height: 1.6; margin-bottom: 10px; font-size: 16px;">
                If you have any questions or face any issues, feel free to reach out to us at:
              </p>
              <p style="color: #92400e; line-height: 1.6; margin: 0; font-size: 16px;">
                📧 <strong>tpo@vppcoe.in</strong><br>
                Or visit the TPO department.
              </p>
            </div>
            
            <div class="footer" style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 16px; margin-bottom: 10px; font-weight: 500;">
                Wishing you the very best for your placement journey!
              </p>
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                Warm regards,<br>
                <strong>Training and Placement Office</strong><br>
                <strong>VPPCOE, Mumbai</strong><br>
                📧 <strong>tpo@vppcoe.in</strong>
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  }),
  
  contact: (data) => ({
    subject: 'New Contact Form Submission - TPO Website',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          @media only screen and (max-width: 600px) {
            .container {
              width: 100% !important;
              padding: 10px !important;
            }
            .content {
              padding: 20px !important;
            }
            .header h2 {
              font-size: 20px !important;
              line-height: 24px !important;
            }
            .section {
              padding: 15px !important;
              margin-bottom: 20px !important;
            }
            .table-responsive {
              display: block !important;
            }
            .table-responsive table {
              width: 100% !important;
            }
            .table-responsive td {
              display: block !important;
              width: 100% !important;
              padding: 8px 0 !important;
              border-bottom: 1px solid #e5e7eb !important;
            }
            .table-responsive td:first-child {
              font-weight: bold !important;
              color: #374151 !important;
              background-color: #f9fafb !important;
              padding: 10px 0 !important;
            }
            .footer {
              text-align: center !important;
              padding: 15px !important;
            }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa;">
        <div class="container" style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div class="content" style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <div class="header" style="text-align: center; margin-bottom: 30px;">
              <h2 style="color: #4f46e5; margin-bottom: 30px; font-size: 24px; line-height: 28px;">📧 New Contact Form Submission</h2>
            </div>
            
            <div class="section" style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #374151; margin-top: 0; font-size: 18px;">Contact Information</h3>
              <div class="table-responsive">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 30%;">Name:</td>
                    <td style="padding: 8px 0; color: #6b7280; width: 70%;">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${data.email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Message:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${data.message}</td>
                  </tr>
                </table>
              </div>
            </div>
            
            <div class="section" style="background-color: #ecfdf5; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
              <p style="margin: 0; color: #065f46; font-weight: 500; font-size: 16px;">
                📅 Submission Date: ${new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            
            <div class="footer" style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px;">
                This message was submitted through the TPO website contact form.
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  interviewScheduled: (data) => ({
    subject: '🎉 Interview Scheduled - TPO Placement Drive',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Interview Scheduled</title>
        <style>
          @media only screen and (max-width: 600px) {
            .container { width: 100% !important; padding: 10px !important; }
            .content { padding: 20px !important; }
            .header h1 { font-size: 24px !important; }
            .section { padding: 15px !important; margin-bottom: 20px !important; }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa;">
        <div class="container" style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div class="content" style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <div class="header" style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #10b981; margin-bottom: 10px; font-size: 28px;">🎉 Congratulations!</h1>
              <h2 style="color: #374151; margin-bottom: 20px; font-size: 20px;">You've been selected for an interview</h2>
            </div>
            
            <div class="section" style="background-color: #ecfdf5; padding: 25px; border-radius: 10px; border-left: 5px solid #10b981; margin-bottom: 25px;">
              <h3 style="color: #065f46; margin-top: 0; margin-bottom: 15px;">Dear ${data.name},</h3>
              <p style="color: #065f46; line-height: 1.6; margin-bottom: 15px; font-size: 16px;">
                We are pleased to inform you that you have been selected for an interview as part of our placement drive.
              </p>
            </div>
            
            <div class="section" style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
              <h4 style="color: #374151; margin-top: 0; margin-bottom: 15px;">📅 Interview Details</h4>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 30%;">Date:</td>
                  <td style="padding: 8px 0; color: #6b7280; width: 70%;">${data.scheduledDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Time:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${data.scheduledTime}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Venue:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${data.venue}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Roll Number:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${data.roll}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Branch:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${data.branch}</td>
                </tr>
              </table>
            </div>
            
            <div class="section" style="background-color: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
              <h4 style="color: #92400e; margin-top: 0; margin-bottom: 15px;">📋 Important Instructions</h4>
              <ul style="color: #92400e; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li>Please arrive 15 minutes before the scheduled time</li>
                <li>Bring multiple copies of your resume</li>
                <li>Carry your college ID card and other relevant documents</li>
                <li>Dress professionally</li>
                <li>Be prepared to discuss your projects and technical skills</li>
              </ul>
            </div>
            
            <div class="footer" style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 16px; margin-bottom: 10px;">
                Best of luck for your interview!
              </p>
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                <strong>Training and Placement Office</strong><br>
                <strong>VPPCOE, Mumbai</strong>
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  interviewRejected: (data) => ({
    subject: 'TPO Placement Drive - Application Status Update',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Application Status Update</title>
        <style>
          @media only screen and (max-width: 600px) {
            .container { width: 100% !important; padding: 10px !important; }
            .content { padding: 20px !important; }
            .header h1 { font-size: 24px !important; }
            .section { padding: 15px !important; margin-bottom: 20px !important; }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa;">
        <div class="container" style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div class="content" style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <div class="header" style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #4f46e5; margin-bottom: 10px; font-size: 28px;">TPO Placement Drive</h1>
              <h2 style="color: #374151; margin-bottom: 20px; font-size: 20px;">Application Status Update</h2>
            </div>
            
            <div class="section" style="background-color: #f0f9ff; padding: 25px; border-radius: 10px; border-left: 5px solid #3b82f6; margin-bottom: 25px;">
              <h3 style="color: #1e40af; margin-top: 0; margin-bottom: 15px;">Dear ${data.name},</h3>
              <p style="color: #1e3a8a; line-height: 1.6; margin-bottom: 15px; font-size: 16px;">
                Thank you for your interest in our placement drive and for submitting your application.
              </p>
              <p style="color: #1e3a8a; line-height: 1.6; margin-bottom: 0; font-size: 16px;">
                After careful consideration, we regret to inform you that we will not be moving forward with your application for this particular opportunity.
              </p>
            </div>
            
            <div class="section" style="background-color: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
              <h4 style="color: #92400e; margin-top: 0; margin-bottom: 15px;">💡 Moving Forward</h4>
              <p style="color: #92400e; line-height: 1.6; margin-bottom: 10px; font-size: 16px;">
                Please don't be discouraged. We encourage you to:
              </p>
              <ul style="color: #92400e; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li>Continue developing your skills and gaining experience</li>
                <li>Apply for future opportunities that match your profile</li>
                <li>Attend our training sessions and workshops</li>
                <li>Seek feedback and guidance from the TPO team</li>
              </ul>
            </div>
            
            <div class="footer" style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 16px; margin-bottom: 10px;">
                We wish you all the best in your career journey!
              </p>
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                <strong>Training and Placement Office</strong><br>
                <strong>VPPCOE, Mumbai</strong>
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  studentDeleted: (data) => ({
    subject: '❌ TPO Registration - Not Selected',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registration Status Update</title>
        <style>
          @media only screen and (max-width: 600px) {
            .container { width: 100% !important; padding: 10px !important; }
            .content { padding: 20px !important; }
            .header h1 { font-size: 24px !important; }
            .section { padding: 15px !important; margin-bottom: 20px !important; }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa;">
        <div class="container" style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div class="content" style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <div class="header" style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #dc2626; margin-bottom: 10px; font-size: 28px;">❌ Not Selected</h1>
              <h2 style="color: #374151; margin-bottom: 20px; font-size: 20px;">TPO Placement Drive Update</h2>
            </div>
            
            <div class="section" style="background-color: #fef2f2; padding: 25px; border-radius: 10px; border-left: 5px solid #dc2626; margin-bottom: 25px;">
              <h3 style="color: #991b1b; margin-top: 0; margin-bottom: 15px;">Dear ${data.name},</h3>
              <p style="color: #7f1d1d; line-height: 1.6; margin-bottom: 15px; font-size: 16px;">
                Thank you for registering with the Training and Placement Office (TPO) for our placement drive.
              </p>
              <p style="color: #7f1d1d; line-height: 1.6; margin-bottom: 0; font-size: 16px;">
                After careful review of all applications, we regret to inform you that <strong>you have not been selected</strong> for this placement opportunity. Your registration has been removed from our current placement drive.
              </p>
            </div>
            
            <div class="section" style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
              <h4 style="color: #374151; margin-top: 0; margin-bottom: 15px;">📋 Your Application Details</h4>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 30%;">Name:</td>
                  <td style="padding: 8px 0; color: #6b7280; width: 70%;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Roll Number:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${data.roll}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Branch:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${data.branch}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Year:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${data.year}</td>
                </tr>
              </table>
            </div>
            
            <div class="section" style="background-color: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
              <h4 style="color: #92400e; margin-top: 0; margin-bottom: 15px;">🚀 Don't Give Up!</h4>
              <p style="color: #92400e; line-height: 1.6; margin-bottom: 10px; font-size: 16px;">
                This is not the end of your journey. Here's what you can do next:
              </p>
              <ul style="color: #92400e; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li><strong>Keep improving:</strong> Work on your technical and soft skills</li>
                <li><strong>Stay updated:</strong> Watch for future placement opportunities</li>
                <li><strong>Get guidance:</strong> Visit the TPO office for career counseling</li>
                <li><strong>Network:</strong> Connect with alumni and industry professionals</li>
                <li><strong>Practice:</strong> Participate in mock interviews and coding challenges</li>
              </ul>
            </div>
            
            <div class="section" style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
              <h4 style="color: #065f46; margin-top: 0; margin-bottom: 15px;">📞 Need Support?</h4>
              <p style="color: #065f46; line-height: 1.6; margin: 0; font-size: 16px;">
                Our TPO team is here to help you succeed. Feel free to reach out for:
                <br>• Career guidance and counseling
                <br>• Resume review and improvement tips
                <br>• Interview preparation assistance
                <br>• Information about upcoming opportunities
              </p>
            </div>
            
            <div class="footer" style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 16px; margin-bottom: 10px; font-weight: 500;">
                Remember: Every rejection is a step closer to the right opportunity!
              </p>
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                <strong>Training and Placement Office</strong><br>
                <strong>VPPCOE, Mumbai</strong><br>
                📧 <strong>tpo@vppcoe.in</strong>
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  })
};

// Send email function with attachment support
const sendEmail = async (to, template, data, attachmentPath = null) => {
  try {
    console.log('Attempting to send email to:', to);
    console.log('Template:', template);
    console.log('Attachment path:', attachmentPath);
    
    const emailContent = emailTemplates[template](data);
    
    const mailOptions = {
      from: 'harshalkar0504@gmail.com',
      to: to,
      subject: emailContent.subject,
      html: emailContent.html
    };

    // Add attachment if provided
    if (attachmentPath) {
      mailOptions.attachments = [{
        filename: data.resumeFileName || 'resume.pdf',
        path: attachmentPath
      }];
    }

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendEmail }; 