const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '/public')));

// API endpoint to create a new webcam session
app.get('/api/create', (req, res) => {
  const sessionId = Date.now(); // unique session ID
  const link = `${req.protocol}://${req.get('host')}/live/${sessionId}`;
  res.json({ id: sessionId, link: link });
});

// Optional: serve live session page
app.get('/live/:sessionId', (req, res) => {
  res.send(`<h1>Live session: ${req.params.sessionId}</h1><p>Webcam streaming goes here.</p>`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
