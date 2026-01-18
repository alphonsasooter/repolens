import { Router } from 'express';
import axios from 'axios';

const router = Router();

// Step 1: Redirect user to GitHub
router.get('/github', (_req, res) => {
  const redirectUri =
    `https://github.com/login/oauth/authorize?` +
    `client_id=${process.env.GITHUB_CLIENT_ID}` +
    `&redirect_uri=${process.env.GITHUB_CALLBACK_URL}` +
    `&scope=read:user%20repo`;
  res.redirect(redirectUri); // 🔹 MUST redirect to GitHub
});

// Step 2: GitHub callback
router.get('/github/callback', async (req, res) => {
  const code = req.query.code as string;
  if (!code) return res.status(400).send('No code');

  try {
    // Exchange code for access token
    const tokenRes = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: process.env.GITHUB_CALLBACK_URL,
      },
      { headers: { Accept: 'application/json' } }
    );

    const accessToken = tokenRes.data.access_token;

    // Fetch user info
    const userRes = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const githubUser = userRes.data;

    // 🔹 Redirect to frontend dashboard
    res.redirect(`http://localhost:5173/dashboard?username=${githubUser.login}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('GitHub OAuth failed');
  }
});

export default router;
