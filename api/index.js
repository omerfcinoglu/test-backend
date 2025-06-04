// api/hello.js

export default function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({ message: "Hello from test-backend!" });
    }
    return res.status(405).end(); // Sadece GET destekleniyor
}
