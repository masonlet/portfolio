import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { ContactBody } from "../src/types"

const resend = new Resend(process.env['RESEND_API_KEY']);

function isValidBody(body: unknown): body is ContactBody {
  if (body === null || typeof body !== "object") return false;

  const record = body as Record<string, unknown>;
  return (
    typeof record["subject"] === 'string' && !!record["subject"].trim() &&
    typeof record["email"] === 'string' && !!record["email"].trim() &&
    typeof record["message"] === 'string' && !!record["message"].trim()
  );
}

export default async (
  req: VercelRequest,
  res: VercelResponse
): Promise<void> => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!isValidBody(req.body)) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  const { subject, email, message } = req.body;
  
  try {
    await resend.emails.send({
      from: 'noreply@masonletoile.ca',
      to: 'contact@masonletoile.ca',
      subject: `Contact form: ${subject}`,
      text: `From: ${email}\n\n${message}`
    });
    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};
