const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '50mb' }));

// Function to check if the file is valid
const isFileValid = (fileBase64) => {
    if (!fileBase64) return false;
    try {
        const buffer = Buffer.from(fileBase64, 'base64');
        return buffer.length > 0;
    } catch (err) {
        return false;
    }
};

// GET method
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// POST method
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;

    // Check if input is valid
    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: 'Invalid data format' });
    }

    // Separate numbers and alphabets
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));

    // Find highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(c => c === c.toLowerCase());
    const highestLowercase = lowercaseAlphabets.length ? [lowercaseAlphabets.sort().reverse()[0]] : [];

    // File validation
    const fileValid = isFileValid(file_b64);
    const fileSizeKb = fileValid ? Buffer.from(file_b64, 'base64').length / 1024 : 0;
    const mimeType = fileValid ? 'image/png' : 'invalid';

    res.status(200).json({
        is_success: true,
        user_id: "john_doe_17091999",
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercase,
        file_valid: fileValid,
        file_mime_type: mimeType,
        file_size_kb: fileSizeKb.toFixed(2)
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
