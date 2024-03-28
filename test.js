const axios =require('axios');

describe('HTTP page status', ()=>{
    test('index.html load ok', async()=>{
        const res = await axios.get('http://localhost:5500/index.html');
        expect(res.status).toBe(200);
    });
    test('upload.html load ok', async()=>{
        const res = await axios.get('http://localhost:5500/upload.html');
        expect(res.status).toBe(200);
    });
});