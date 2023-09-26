const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/api/:date?', (req, res) => {
    const { date } = req.params;

    if (!date) {
        const currentDate = new Date();
        res.json({
            unix: currentDate.getTime(),
            utc: currentDate.toUTCString(),
        });
    } else {
        let parsedDate;

        try {
            if (/^\d+$/.test(date)) {
                parsedDate = new Date(parseInt(date));
            } else {
                parsedDate = new Date(date);
            }

            if (isNaN(parsedDate.getTime())) {
                res.json({ error: 'Invalid Date' });
            } else {
                res.json({
                    unix: parsedDate.getTime(),
                    utc: parsedDate.toUTCString(),
                });
            }
        } catch (error) {
            res.json({ error: 'Invalid Date' });
        }
    }
});

app.get('/api', (req, res) => {
    const currentDate = new Date();
    res.json({
        unix: currentDate.getTime(),
        utc: currentDate.toUTCString(),
    });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
