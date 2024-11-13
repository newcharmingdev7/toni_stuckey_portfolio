export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { name, email, subject, message } = req.body;
  
      // Basic validation
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ status: 'error', message: 'All fields are required.' });
      }
  
      try {
        // Here, you would add code to process the form submission
        // (e.g., save to a database, send an email, etc.).
  
        // For now, just respond with a success message.
        res.status(200).json({ status: 'success', message: 'Your message has been sent. Thank you!' });
      } catch (error) {
        res.status(500).json({ status: 'error', message: 'An error occurred, please try again.' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }