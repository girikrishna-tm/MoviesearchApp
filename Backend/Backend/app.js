const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const API_KEY = '64facffd181f05b8dac71c3aa03a22eb';

app.use(express.json());
app.use(cors());

app.post('/search', async (req, res) => {
    const searchQuery = req.body.query; 
    const page = req.body.page || 1;
    console.log('Query and Page:', searchQuery, page);

    try {
        console.log('Query and Page:', searchQuery, page);
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                api_key: API_KEY,
                query: searchQuery,
                page: page, 
            },
        });

        // Send the response data back to the client
        res.json(response.data);
    } catch (error) {
        // Handle errors and send an error response
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
