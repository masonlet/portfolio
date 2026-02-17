const form = document.getElementById('contact-form') as HTMLFormElement;
const statusDiv = document.getElementById('form-status');

if (!form) throw new Error('Required form element not found');
if (!statusDiv) throw new Error('Required status element not found');

form.addEventListener('submit', async (e: SubmitEvent) => {
  e.preventDefault();

  const submitBtn = form.querySelector('input[type="submit"]') as HTMLInputElement;
  
  submitBtn.disabled = true;
  statusDiv.textContent = 'Sending...';
  
  try {
    const emailInput = (document.getElementById('email') as HTMLInputElement)?.value;
    const subjectInput = (document.getElementById('subject') as HTMLInputElement)?.value;
    const messageInput = (document.getElementById('message') as HTMLInputElement)?.value;

    if (!emailInput || !subjectInput || !messageInput)
      throw new Error('Required inputs not found');

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: emailInput,
        subject: subjectInput,
        message: messageInput
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      statusDiv.textContent = 'Message sent successfully!';
      form.reset();
    } else {
      statusDiv.textContent = data.error || 'Failed to send message';
    }
  } catch (error) {
    statusDiv.textContent = 'Error sending message';
  } finally {
    submitBtn.disabled = false;
  }
});
