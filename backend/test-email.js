// const nodemailer = require('nodemailer');
// require('dotenv').config();

// // Create transporter for Gmail
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER || 'harshalkar0504@gmail.com',
//     pass: process.env.EMAIL_PASS || 'ldbf wfje awut wnow'
//   }
// });

// // Test email function
// const testEmail = async () => {
//   try {
//     console.log('Testing email configuration...');
//     console.log('Email User:', process.env.EMAIL_USER);
//     console.log('Email Pass:', process.env.EMAIL_PASS ? '***' : 'Not set');
    
//     const mailOptions = {
//       from: process.env.EMAIL_USER || 'harshalkar0504@gmail.com',
//       to: 'harshalkar0504@gmail.com',
//       subject: 'Test Email from TPO Website',
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
//           <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
//             <h2 style="color: #4f46e5; text-align: center; margin-bottom: 30px;">🧪 Email Test</h2>
//             <p style="color: #374151; font-size: 16px;">This is a test email to verify the email configuration is working correctly.</p>
//             <div style="background-color: #ecfdf5; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981; margin-top: 20px;">
//               <p style="margin: 0; color: #065f46; font-weight: 500;">
//                 ✅ Email functionality is working!
//               </p>
//             </div>
//             <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
//               <p style="color: #6b7280; font-size: 14px;">
//                 Test sent at: ${new Date().toLocaleString()}
//               </p>
//             </div>
//           </div>
//         </div>
//       `
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log('✅ Email sent successfully!');
//     console.log('Message ID:', info.messageId);
//     console.log('Response:', info.response);
//     return true;
//   } catch (error) {
//     console.error('❌ Email sending failed:');
//     console.error('Error:', error.message);
//     console.error('Code:', error.code);
//     return false;
//   }
// };

// // Run the test
// testEmail().then(success => {
//   if (success) {
//     console.log('\n🎉 Email configuration is working!');
//   } else {
//     console.log('\n❌ Email configuration failed. Please check your settings.');
//   }
//   process.exit();
// }); 