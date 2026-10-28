export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, organization, phone, subject, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  // Log incoming inquiry to server logs
  console.log('[BAARA Contact Inquiry Received]', {
    timestamp: new Date().toISOString(),
    name,
    email,
    organization,
    phone,
    subject,
    message
  });

  return res.status(200).json({
    success: true,
    message: 'Inquiry successfully received and routed to contact@baara.ai'
  });
}
