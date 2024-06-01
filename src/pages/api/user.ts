import { NextApiRequest, NextApiResponse } from 'next';

let userData = {
  id: 1,
  name: 'ZAJ KENNETH B. PANES',
  email: '202180017@psu.palawan.edu.ph',
  bio: 'A 3rd Year Computer Science Student of Palawan State University',
  post: [
    {
      title: "1st Post",
      content: "My 1st post"
    }
  ]
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(userData);
  } else if (req.method === 'PUT') {
    const { id, name, email, bio, post } = req.body;
    if (!id || !name || !email || !bio || !post) {
      res.status(400).json({ error: "Missing required fields" });
    } else {
      userData = { id, name, email, bio, post };
      res.status(200).json(userData);
    }
  } else if (req.method === 'POST') {
    const { name, email, bio, post } = req.body;
    if (!name || !email || !bio || !post) {
      res.status(400).json({ error: "Missing required fields" });
    } else {
      const id = userData.id + 1;
      userData = { id, name, email, bio, post };
      res.status(201).json(userData);
    }
  } else if (req.method === 'DELETE') {
    userData = {
      id: 1,
      name: '',
      email: '',
      bio: '',
      post: []
    };
    res.status(200).end('User data deleted successfully');
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
