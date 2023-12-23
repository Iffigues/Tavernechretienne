import React, { useState, ChangeEvent } from 'react';
import 'tailwindcss/base.css'; // Include Tailwind base styles

const Contact: React.FC = () => {
  const [emailData, setEmailData] = useState({
    subject: '',
    body: '',
    email: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmailData({
      ...emailData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendEmail = async () => {
    try {
      const response = await fetch('http://gopiko.fr:8086', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Error sending email');
      }
    } catch (error) {
      console.error('Error sending email', error);
    }
  };

  return (
    <div className="container mx-auto my-4">
      <label className="block mb-2">Email:</label>
      <input type="email" name="email" onChange={handleInputChange} className="border p-2 mb-4" />

      <label className="block mb-2">Subject:</label>
      <input type="text" name="subject" onChange={handleInputChange} className="border p-2 mb-4" />

      <label className="block mb-2">Body:</label>
      <textarea name="body" onChange={handleInputChange} className="border p-2 mb-4"></textarea>

      <button onClick={handleSendEmail} className="bg-blue-500 text-white p-2">Send Email</button>
    </div>
  );
};

export default Contact;

