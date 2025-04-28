import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { z } from 'zod';

// Create contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Initialize Mailgun
export const initMailgun = () => {
  // Use the provided API key
  const API_KEY = process.env.API_KEY;
  const DOMAIN = 'akcelify.xyz'; // domain
  
  if (!API_KEY) {
    console.warn("Mailgun API Key not available. Email functionality will not work.");
    return null;
  }

  const mailgun = new Mailgun(formData);
  const client = mailgun.client({ username: 'api', key: API_KEY });
  
  return { client, domain: DOMAIN };
};

// Send email function
export const sendContactEmail = async (
  mailgunConfig: { client: any, domain: string } | null,
  formData: ContactFormData
): Promise<boolean> => {
  if (!mailgunConfig) {
    console.warn("Mailgun not initialized. Email not sent.");
    return false;
  }

  try {
    const { client, domain } = mailgunConfig;
    
    const messageData = {
      from: `Contact Form <mailgun@${domain}>`,
      to: 'iamakshithere@gmail.com',
      subject: `Portfolio Contact from ${formData.name}`,
      text: `
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
      `,
      html: `
<h2>New Contact from Akcelify Portfolio</h2>
<p><strong>Name:</strong> ${formData.name}</p>
<p><strong>Email:</strong> ${formData.email}</p>
<h3>Message:</h3>
<p>${formData.message.replace(/\n/g, '<br>')}</p>
      `
    };

    await client.messages.create(domain, messageData);
    return true;
  } catch (error) {
    console.error('Mailgun email error:', error);
    return false;
  }
};