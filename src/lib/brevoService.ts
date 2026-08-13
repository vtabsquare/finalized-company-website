import { supabaseService as supabase } from './supabaseClient';
import type { DemoFormState } from '../types';

const getAdminEmails = () => {
  return (import.meta.env.VITE_ADMIN_EMAILS || 'vitabsquare@gmail.com,vigneshrajas.vtab@gmail.com,balamuraleee@gmail.com,meenakumarik.vtab@gmail.com')
    .split(',')
    .map(e => ({ email: e.trim() }))
    .filter(e => e.email);
};

interface SendEmailParams {
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
  replyTo?: { email: string; name?: string };
  attachment?: { content: string; name: string }[];
}

/**
 * Low-level helper to call the Supabase Edge Function for Brevo
 */
async function sendBrevoEmail({ to, subject, htmlContent, replyTo, attachment }: SendEmailParams): Promise<boolean> {
  const payload = {
    to,
    subject,
    htmlContent,
    ...(replyTo && { replyTo }),
    ...(attachment && { attachment }),
  };

  try {
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: payload
    });

    if (error) {
      console.error('Edge Function Error:', error);
      return false;
    }

    if (!data?.success) {
      console.error('Email sending failed:', data);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to send email via Edge Function:', error);
    return false;
  }
}

/**
 * 1. Book a Demo Functionality
 */
export async function sendDemoRequestEmails(formData: DemoFormState): Promise<{ success: boolean }> {
  const adminEmails = getAdminEmails();
  
  // Save to Supabase
  const { error: dbError } = await supabase.from('demo_requests').insert([{
    full_name: formData.fullName,
    work_email: formData.workEmail,
    company_name: formData.companyName,
    team_size: formData.teamSize,
    interest_area: formData.interestArea,
    preferred_date: formData.preferredDate || 'Flexible',
    message: formData.message || '',
    created_at: new Date().toISOString()
  }]);
  if (dbError) {
    console.error('[LEADS] Failed to save demo request to Supabase:', dbError.code, dbError.message);
  } else {
    console.log('[LEADS] Demo request saved to Supabase successfully');
  }

  // Client Confirmation Email HTML
  const clientHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #050814; color: #f1f5f9; border-radius: 16px; overflow: hidden; border: 1px solid #1e293b;">
      <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 32px 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">VTAB SQUARE AI</h1>
        <p style="color: #bfdbfe; margin: 8px 0 0 0; font-size: 14px;">Innovating Beyond Software</p>
      </div>
      
      <div style="padding: 32px 24px;">
        <h2 style="color: #ffffff; font-size: 20px; margin-top: 0;">Demo Request Confirmed 🚀</h2>
        <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6;">
          Hi <strong style="color: #38bdf8;">${formData.fullName}</strong>,
        </p>
        <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6;">
          Thank you for requesting an executive consultation with our AI Solutions Architects. We have received your booking request for <strong style="color: #60a5fa;">${formData.interestArea}</strong>.
        </p>

        <div style="background-color: #0f172a; border-left: 4px solid #3b82f6; padding: 20px; margin: 24px 0; border-radius: 8px;">
          <h3 style="color: #ffffff; font-size: 16px; margin: 0 0 12px 0;">Your Request Summary:</h3>
          <p style="color: #94a3b8; font-size: 14px; margin: 6px 0;"><strong>Company:</strong> ${formData.companyName}</p>
          <p style="color: #94a3b8; font-size: 14px; margin: 6px 0;"><strong>Project / Focus:</strong> <span style="color: #38bdf8; font-weight: bold;">${formData.interestArea}</span></p>
          <p style="color: #94a3b8; font-size: 14px; margin: 6px 0;"><strong>Team Size:</strong> ${formData.teamSize}</p>
          ${formData.preferredDate ? `<p style="color: #94a3b8; font-size: 14px; margin: 6px 0;"><strong>Preferred Date:</strong> ${formData.preferredDate}</p>` : ''}
          ${formData.message ? `<p style="color: #94a3b8; font-size: 14px; margin: 6px 0;"><strong>Notes:</strong> ${formData.message}</p>` : ''}
        </div>

        <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6;">
          Our technical team is reviewing your requirements and will reach out via calendar invite within <strong>24 business hours</strong> to confirm a suitable time slot.
        </p>

        <div style="margin-top: 32px; text-align: center;">
          <a href="https://vtab-square-company-website.onrender.com" style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%); color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 14px;">Explore Our AI Portfolio</a>
        </div>
      </div>

      <div style="background-color: #02040a; padding: 20px 24px; text-align: center; border-top: 1px solid #1e293b; color: #64748b; font-size: 12px;">
        <p style="margin: 0;">© ${new Date().getFullYear()} VTab Square. All rights reserved.</p>
        <p style="margin: 4px 0 0 0;">Enterprise AI Architecture & Engineering</p>
      </div>
    </div>
  `;

  // Admin Notification Email HTML
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; color: #1e293b; padding: 24px; border: 1px solid #cbd5e1; border-radius: 12px;">
      <h2 style="color: #2563eb; margin-top: 0;">🔥 New Demo Booking Request!</h2>
      <p style="font-size: 15px;">A potential client just submitted a demo request on the VTab Square website.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px; font-weight: bold; background: #f1f5f9; width: 35%;">Client Name:</td>
          <td style="padding: 12px;">${formData.fullName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px; font-weight: bold; background: #f1f5f9;">Work Email:</td>
          <td style="padding: 12px;"><a href="mailto:${formData.workEmail}">${formData.workEmail}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px; font-weight: bold; background: #f1f5f9;">Company Name:</td>
          <td style="padding: 12px;">${formData.companyName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px; font-weight: bold; background: #f1f5f9;">Interest Area / Project:</td>
          <td style="padding: 12px; color: #2563eb; font-weight: bold;">${formData.interestArea}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px; font-weight: bold; background: #f1f5f9;">Team Size:</td>
          <td style="padding: 12px;">${formData.teamSize}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px; font-weight: bold; background: #f1f5f9;">Preferred Date:</td>
          <td style="padding: 12px;">${formData.preferredDate || 'Flexible / Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 12px; font-weight: bold; background: #f1f5f9;">Requirements / Notes:</td>
          <td style="padding: 12px; white-space: pre-wrap;">${formData.message || 'No additional notes'}</td>
        </tr>
      </table>

      <p style="margin-top: 24px; font-size: 13px; color: #64748b;">
        <em>Reply directly to this email to contact the client (${formData.workEmail}).</em>
      </p>
    </div>
  `;

  // Send client confirmation
  const clientSent = await sendBrevoEmail({
    to: [{ email: formData.workEmail, name: formData.fullName }],
    subject: `Demo Request Confirmed: ${formData.interestArea} - VTab Square AI`,
    htmlContent: clientHtml,
  });

  // Send admin notification
  const adminSent = await sendBrevoEmail({
    to: adminEmails,
    subject: `🚀 New Demo Request: ${formData.fullName} (${formData.companyName}) - ${formData.interestArea}`,
    htmlContent: adminHtml,
    replyTo: { email: formData.workEmail, name: formData.fullName },
  });

  return { success: clientSent || adminSent };
}

/**
 * 2. Contact AI Experts Functionality
 */
export async function sendContactInquiryEmails(name: string, email: string, message: string): Promise<{ success: boolean }> {
  const adminEmails = getAdminEmails();

  // Save to Supabase
  try {
    await supabase.from('contact_inquiries').insert([{
      full_name: name,
      work_email: email,
      message: message,
      created_at: new Date().toISOString()
    }]);
  } catch (e) {
    console.warn('Supabase logging skipped or failed:', e);
  }

  // Client Acknowledgment
  const clientHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #050814; color: #f1f5f9; border-radius: 16px; overflow: hidden; border: 1px solid #1e293b;">
      <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 28px 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px;">VTAB SQUARE AI</h1>
      </div>
      <div style="padding: 32px 24px;">
        <h2 style="color: #ffffff; font-size: 20px; margin-top: 0;">We received your message! 📬</h2>
        <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6;">
          Hi <strong style="color: #38bdf8;">${name}</strong>,
        </p>
        <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6;">
          Thank you for contacting VTab Square AI Experts. An AI architect from our team will review your inquiry and get back to you within <strong>2 business hours</strong>.
        </p>
        <div style="background-color: #0f172a; border: 1px solid #1e293b; padding: 16px; margin: 20px 0; border-radius: 8px;">
          <p style="color: #94a3b8; font-size: 13px; margin: 0 0 6px 0;"><strong>Your Message:</strong></p>
          <p style="color: #e2e8f0; font-size: 14px; font-style: italic; margin: 0; white-space: pre-wrap;">"${message}"</p>
        </div>
      </div>
      <div style="background-color: #02040a; padding: 16px; text-align: center; border-top: 1px solid #1e293b; color: #64748b; font-size: 12px;">
        VTab Square Innovation Lab & Engineering
      </div>
    </div>
  `;

  // Admin Notification
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; color: #1e293b; padding: 24px; border: 1px solid #cbd5e1; border-radius: 12px;">
      <h2 style="color: #2563eb; margin-top: 0;">💬 New Contact Inquiry</h2>
      <p style="font-size: 15px;">Someone reached out via the Contact AI Experts form:</p>
      <ul style="line-height: 1.8;">
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
      </ul>
      <div style="background: #ffffff; padding: 16px; border-left: 4px solid #2563eb; margin-top: 12px;">
        <strong>Message:</strong><br/>
        <p style="white-space: pre-wrap; margin-top: 8px;">${message}</p>
      </div>
      <p style="margin-top: 20px; font-size: 13px; color: #64748b;">Reply directly to this email to respond to ${email}.</p>
    </div>
  `;

  const clientSent = await sendBrevoEmail({
    to: [{ email, name }],
    subject: `Inquiry Received - VTab Square AI Experts`,
    htmlContent: clientHtml,
  });

  const adminSent = await sendBrevoEmail({
    to: adminEmails,
    subject: `💬 Contact Inquiry from ${name} (${email})`,
    htmlContent: adminHtml,
    replyTo: { email, name },
  });

  return { success: clientSent || adminSent };
}

/**
 * 3. Subscribe / AI Innovation Digest Functionality
 */
export async function sendSubscribeEmail(email: string): Promise<{ success: boolean }> {
  const adminEmails = getAdminEmails();

  // Save to Supabase
  try {
    await supabase.from('subscribers').insert([{
      email: email,
      subscribed_at: new Date().toISOString()
    }]);
  } catch (e) {
    console.warn('Supabase logging skipped or failed:', e);
  }

  // Welcome Email
  const clientHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #050814; color: #f1f5f9; border-radius: 16px; overflow: hidden; border: 1px solid #1e293b;">
      <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 28px 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px;">AI INNOVATION DIGEST</h1>
        <p style="color: #bfdbfe; margin: 6px 0 0 0; font-size: 13px;">By VTab Square</p>
      </div>
      <div style="padding: 32px 24px; text-align: center;">
        <h2 style="color: #ffffff; font-size: 22px; margin-top: 0;">Welcome to the Inner Circle ⚡</h2>
        <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6; max-width: 480px; margin: 16px auto;">
          You are now subscribed to receive our bi-weekly technical briefings on <strong>Large Language Models</strong>, <strong>Power BI & Qlik Migrations</strong>, and <strong>Autonomous Agentic Workflows</strong>.
        </p>
        <div style="background-color: #0f172a; border: 1px solid #1e293b; padding: 20px; margin: 24px 0; border-radius: 12px; text-align: left;">
          <h3 style="color: #38bdf8; font-size: 15px; margin: 0 0 10px 0;">What to expect:</h3>
          <p style="color: #94a3b8; font-size: 13px; margin: 8px 0;">✨ Architecture breakdowns of production AI deployments</p>
          <p style="color: #94a3b8; font-size: 13px; margin: 8px 0;">📊 Real-world ROI benchmarks for automated enterprise operations</p>
          <p style="color: #94a3b8; font-size: 13px; margin: 8px 0;">🛠️ Exclusive early access to VTab Innovation Lab sandboxes</p>
        </div>
        <p style="color: #94a3b8; font-size: 13px;">
          Stay tuned for our next edition!
        </p>
      </div>
      <div style="background-color: #02040a; padding: 16px; text-align: center; border-top: 1px solid #1e293b; color: #64748b; font-size: 12px;">
        You can unsubscribe at any time. © ${new Date().getFullYear()} VTab Square.
      </div>
    </div>
  `;

  // Admin Notification for new subscriber
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h3 style="color: #2563eb;">🎉 New Subscriber!</h3>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a> joined the AI Innovation Digest.</p>
    </div>
  `;

  const clientSent = await sendBrevoEmail({
    to: [{ email }],
    subject: `Welcome to AI Innovation Digest - VTab Square`,
    htmlContent: clientHtml,
  });

  // Also notify admins silently
  sendBrevoEmail({
    to: adminEmails,
    subject: `🎉 New Newsletter Subscriber: ${email}`,
    htmlContent: adminHtml,
  });

  return { success: clientSent };
}

/**
 * 4. Request Early Beta Access Functionality (Future Innovations)
 */
export async function sendEarlyAccessEmail(email: string, innovationTitle: string): Promise<{ success: boolean }> {
  const adminEmails = getAdminEmails();

  // Save to Supabase demo_requests table (so it shows up in Admin Leads)
  const { error: dbError } = await supabase.from('demo_requests').insert([{
    full_name: 'Early Access Request',
    work_email: email,
    company_name: '—',
    team_size: '—',
    interest_area: `[Early Access] ${innovationTitle}`,
    preferred_date: 'Flexible',
    message: `Requested early beta access for future innovation: ${innovationTitle}`,
    created_at: new Date().toISOString()
  }]);
  if (dbError) {
    console.error('[LEADS] Failed to save early access request to Supabase:', dbError.code, dbError.message);
  } else {
    console.log('[LEADS] Early access request saved to Supabase successfully');
  }

  // Client Confirmation Email HTML
  const clientHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #050814; color: #f1f5f9; border-radius: 16px; overflow: hidden; border: 1px solid #1e293b;">
      <div style="background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); padding: 32px 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">VTAB SQUARE AI</h1>
        <p style="color: #e9d5ff; margin: 8px 0 0 0; font-size: 14px;">Innovation Lab & Future Systems</p>
      </div>
      
      <div style="padding: 32px 24px;">
        <h2 style="color: #ffffff; font-size: 20px; margin-top: 0;">Your Early Access Request is in Progress ⚡</h2>
        <p style="color: #94a3b8; line-height: 1.6; font-size: 15px;">
          Thank you for requesting early beta access to <strong style="color: #a855f7;">${innovationTitle}</strong>.
        </p>
        <p style="color: #94a3b8; line-height: 1.6; font-size: 15px;">
          Our engineering team has received your request and logged your priority status in our beta queue. We are currently setting up the secure benchmarking environment for this system.
        </p>

        <div style="background-color: #0f172a; border: 1px solid #1e293b; border-radius: 12px; padding: 20px; margin: 24px 0;">
          <h3 style="color: #f8fafc; font-size: 14px; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.05em;">Request Summary</h3>
          <p style="color: #94a3b8; font-size: 14px; margin: 6px 0;"><strong>System:</strong> ${innovationTitle}</p>
          <p style="color: #94a3b8; font-size: 14px; margin: 6px 0;"><strong>Status:</strong> <span style="color: #a855f7; font-weight: 600;">In Queue / Preparing Environment</span></p>
          <p style="color: #94a3b8; font-size: 14px; margin: 6px 0;"><strong>Email:</strong> ${email}</p>
        </div>

        <p style="color: #94a3b8; line-height: 1.6; font-size: 15px;">
          As soon as the next wave of beta invitations is released, you will receive your exclusive credentials and sandbox access directly to this email address.
        </p>

        <p style="color: #94a3b8; line-height: 1.6; font-size: 15px; margin-top: 24px;">
          Best regards,<br/>
          <strong style="color: #f1f5f9;">VTab Square AI Engineering Team</strong>
        </p>
      </div>
      
      <div style="background-color: #020617; padding: 20px 24px; text-align: center; border-top: 1px solid #1e293b;">
        <p style="color: #64748b; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} VTab Square. Enterprise AI Innovation Lab.</p>
      </div>
    </div>
  `;

  // Admin Notification
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h3 style="color: #7c3aed;">⚡ New Early Beta Access Request!</h3>
      <p><strong>System:</strong> ${innovationTitle}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
    </div>
  `;

  const clientSent = await sendBrevoEmail({
    to: [{ email }],
    subject: `⚡ Your Early Access Request is in Progress: ${innovationTitle}`,
    htmlContent: clientHtml,
  });

  // Also notify admins silently
  sendBrevoEmail({
    to: adminEmails,
    subject: `⚡ New Early Beta Request: ${innovationTitle} (${email})`,
    htmlContent: adminHtml,
  });

  return { success: clientSent };
}

export interface CareerApplicationData {
  fullName: string;
  email: string;
  phone: string;
  roleTitle: string;
  linkedInUrl: string;
  resumeUrl: string;
  message: string;
  resumeFile?: { content: string; name: string };
}

const escapeHtml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

/** Submit a career application and notify both the candidate and hiring team. */
export async function sendCareerApplicationEmails(application: CareerApplicationData): Promise<{ success: boolean }> {
  const safe = Object.fromEntries(
    Object.entries(application).map(([key, value]) => {
      if (key === 'resumeFile') return [key, value];
      return [key, escapeHtml(typeof value === 'string' ? value.trim() : String(value))];
    })
  ) as unknown as CareerApplicationData;

  const { error: dbError } = await supabase.from('career_applications').insert([{
    full_name: application.fullName,
    email: application.email,
    phone: application.phone,
    role_title: application.roleTitle,
    linkedin_url: application.linkedInUrl,
    resume_url: application.resumeUrl,
    message: application.message,
    created_at: new Date().toISOString(),
  }]);
  if (dbError) {
    console.warn('[CAREERS] Application database logging was skipped:', dbError.message);
  }

  const candidateHtml = `
    <div style="font-family:Segoe UI,Arial,sans-serif;max-width:600px;margin:auto;background:#050814;color:#e2e8f0;border:1px solid #1e293b;border-radius:16px;overflow:hidden">
      <div style="padding:28px;background:linear-gradient(135deg,#064e3b,#0f766e)"><h1 style="margin:0;color:white;font-size:22px">VTAB SQUARE AI</h1><p style="margin:7px 0 0;color:#a7f3d0">Careers</p></div>
      <div style="padding:30px"><h2 style="margin-top:0;color:white">Application received</h2><p>Hi <strong style="color:#5eead4">${safe.fullName}</strong>,</p><p style="line-height:1.6">Thank you for applying for <strong>${safe.roleTitle}</strong>. Our hiring team will review your profile and contact you if your experience matches the role.</p></div>
    </div>`;

  const adminHtml = `
    <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#0f172a">
      <h2 style="color:#047857">New career application</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:9px;font-weight:bold;background:#f1f5f9">Role</td><td style="padding:9px">${safe.roleTitle}</td></tr>
        <tr><td style="padding:9px;font-weight:bold;background:#f1f5f9">Candidate</td><td style="padding:9px">${safe.fullName}</td></tr>
        <tr><td style="padding:9px;font-weight:bold;background:#f1f5f9">Email</td><td style="padding:9px"><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
        <tr><td style="padding:9px;font-weight:bold;background:#f1f5f9">Phone</td><td style="padding:9px">${safe.phone || 'Not provided'}</td></tr>
        <tr><td style="padding:9px;font-weight:bold;background:#f1f5f9">LinkedIn</td><td style="padding:9px">${safe.linkedInUrl || 'Not provided'}</td></tr>
        <tr><td style="padding:9px;font-weight:bold;background:#f1f5f9">Resume</td><td style="padding:9px">${safe.resumeUrl}</td></tr>
        <tr><td style="padding:9px;font-weight:bold;background:#f1f5f9">Note</td><td style="padding:9px;white-space:pre-wrap">${safe.message || 'No additional note'}</td></tr>
      </table>
    </div>`;

  const [candidateSent, adminSent] = await Promise.all([
    sendBrevoEmail({
      to: [{ email: application.email, name: application.fullName }],
      subject: `Application received: ${application.roleTitle} - VTab Square`,
      htmlContent: candidateHtml,
    }),
    sendBrevoEmail({
      to: getAdminEmails(),
      subject: `New career application: ${application.roleTitle} - ${application.fullName}`,
      htmlContent: adminHtml,
      replyTo: { email: application.email, name: application.fullName },
      attachment: application.resumeFile ? [application.resumeFile] : undefined,
    }),
  ]);

  return { success: candidateSent || adminSent };
}
