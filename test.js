const axios = require('axios');

describe('HTTP Status Tests', () => {
    test('upload.html loads ok', async () => {
        const res = await axios.get('http://localhost:5500/upload.html');
        expect(res.status).toBe(200);
    });

    test('index.html loads ok', async () => {
        const res = await axios.get('http://localhost:5500/index.html');
        expect(res.status).toBe(200);
    });
});
