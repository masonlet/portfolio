import type { ContactBody } from "../types";

interface ApiResponse {
  success: boolean;
  error?: string;
}

function validateForm(form: HTMLFormElement): ContactBody {
  const data = new FormData(form);

  const email = data.get('email')?.toString().trim();
  const subject = data.get('subject')?.toString().trim();
  const message = data.get('message')?.toString().trim();

  if (!email || !subject || !message)
    throw new Error('All fields are required.');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    throw new Error('Please enter a valid email address.');

  return { email, subject, message };
}

async function submitForm(form: ContactBody): Promise<void> {
  const response = await fetch('https://contact-api-jet.vercel.app/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });

  const data: ApiResponse = await response.json();
  if (!response.ok || !data.success) 
    throw new Error(data.error || 'Failed to submit form.');
}

function initForm(): void {
  const form = document.getElementById('contact-form');
  const statusDiv = document.getElementById('form-status');

  if (!(form instanceof HTMLFormElement)) 
    throw new Error('Required form element not found');
  if (!(statusDiv instanceof HTMLElement)) 
    throw new Error('Required status element not found');

  form.addEventListener('submit', async (e: SubmitEvent) => {
    e.preventDefault();

    const submitBtn = form.querySelector('input[type="submit"]');
    if (!(submitBtn instanceof HTMLInputElement))
      throw new Error('Required submit button not found');

    submitBtn.disabled = true;
    statusDiv.textContent = 'Sending...';

    try {
      const validData = validateForm(form);
      await submitForm(validData);
 
      statusDiv.textContent = 'Message sent successfully!';
      form.reset();
    } catch (error) {
      statusDiv.textContent = error instanceof Error ? error.message : 'Error sending message';      } finally {
      submitBtn.disabled = false;
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initForm);
} else {
  initForm();
}

