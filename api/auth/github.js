const axios = require('axios');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { code } = req.body;

    try {
        const response = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: code
        }, {
            headers: {
                Accept: 'application/json'
            }
        });

        return res.status(200).json(response.data);
    } catch (error) {
        console.error('GitHub OAuth Error:', error);
        return res.status(500).json({ message: 'Authentication failed' });
    }
} 