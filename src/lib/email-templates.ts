export function demoRequestEmail(data: {
  name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle?: string;
  solution: string;
  message?: string;
}) {
  return {
    subject: `New Demo Request - ${data.solution} from ${data.company}`,
    html: `
      <h2>New Demo Request</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${data.name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${data.email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${data.phone}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Company</td><td style="padding:8px;border:1px solid #ddd">${data.company}</td></tr>
        ${data.jobTitle ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Job Title</td><td style="padding:8px;border:1px solid #ddd">${data.jobTitle}</td></tr>` : ""}
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Solution</td><td style="padding:8px;border:1px solid #ddd">${data.solution}</td></tr>
        ${data.message ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${data.message}</td></tr>` : ""}
      </table>
    `,
  };
}

export function contactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  type: string;
}) {
  return {
    subject: `New Contact Inquiry - ${data.type} from ${data.name}`,
    html: `
      <h2>New Contact Inquiry</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${data.name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${data.email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Type</td><td style="padding:8px;border:1px solid #ddd">${data.type}</td></tr>
        ${data.phone ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${data.phone}</td></tr>` : ""}
        ${data.company ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Company</td><td style="padding:8px;border:1px solid #ddd">${data.company}</td></tr>` : ""}
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${data.message}</td></tr>
      </table>
    `,
  };
}

export function careerEmail(data: {
  name: string;
  email: string;
  phone: string;
  position: string;
  resumeUrl: string;
  coverLetter?: string;
}) {
  return {
    subject: `New Job Application - ${data.position} from ${data.name}`,
    html: `
      <h2>New Job Application</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${data.name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${data.email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${data.phone}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Position</td><td style="padding:8px;border:1px solid #ddd">${data.position}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Resume</td><td style="padding:8px;border:1px solid #ddd"><a href="${data.resumeUrl}">Download Resume</a></td></tr>
        ${data.coverLetter ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Cover Letter</td><td style="padding:8px;border:1px solid #ddd">${data.coverLetter}</td></tr>` : ""}
      </table>
    `,
  };
}

export function statusUpdateEmail(data: {
  name: string;
  positionTitle: string;
  status: string;
}) {
  const messages: Record<string, { subject: string; body: string }> = {
    reviewed: {
      subject: `Application Update - ${data.positionTitle}`,
      body: "We are pleased to inform you that your application is currently under review. Our hiring team is evaluating your profile and will get back to you soon.",
    },
    shortlisted: {
      subject: `You've Been Shortlisted - ${data.positionTitle}`,
      body: "Congratulations! You have been shortlisted for the next stage of our hiring process. We will contact you shortly with further details regarding the interview process.",
    },
    rejected: {
      subject: `Application Status - ${data.positionTitle}`,
      body: "Thank you for your interest in joining VASP Systemic. After careful consideration, we regret to inform you that we have decided to move forward with other candidates at this time. We appreciate the time and effort you invested in your application and wish you the very best in your future endeavors.",
    },
  };

  const msg = messages[data.status] || {
    subject: `Application Status Updated - ${data.positionTitle}`,
    body: `Your application status has been updated to: ${data.status}.`,
  };

  return {
    subject: msg.subject,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
        <div style="background:#0A2A88;padding:20px;border-radius:8px 8px 0 0">
          <h1 style="color:white;margin:0;font-size:20px">VASP Systemic</h1>
        </div>
        <div style="padding:24px;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 8px 8px">
          <p style="font-size:16px;color:#333">Dear ${data.name},</p>
          <p style="font-size:14px;color:#555;line-height:1.6">${msg.body}</p>
          <p style="font-size:14px;color:#555;line-height:1.6">Best regards,<br><strong>VASP Systemic Talent Team</strong></p>
        </div>
      </div>
    `,
  };
}
