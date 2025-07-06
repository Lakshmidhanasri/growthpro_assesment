const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

const headlines = [
    "Why {name} is {location}'s Sweetest Spot in 2025",
    "Discover {name}: {location}'s Favorite Destination",
    "The Secret Behind {name}'s Success in {location}",
    "{name}: Leading {location} in Customer Delight"
];

function generateHeadline(name, location) {
    const template = headlines[Math.floor(Math.random() * headlines.length)];
    return template.replace('{name}', name).replace('{location}', location);
}

app.post('/business-data', (req, res) => {
    const { name, location } = req.body;
    const data = {
        rating: (Math.random() * (5 - 3) + 3).toFixed(1),
        reviews: Math.floor(Math.random() * 500 + 50),
        headline: generateHeadline(name, location)
    };
    res.json(data);
});

app.get('/regenerate-headline', (req, res) => {
    const { name, location } = req.query;
    const headline = generateHeadline(name, location);
    res.json({ headline });
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
