export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { userId, query } = req.body;

        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, query }),
        });
        const data = await response.json();
        res.status(200).json(data);
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
