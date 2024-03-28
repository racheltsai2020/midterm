const axios =require('axios');

describe('HTTP page status', ()=>{
    test('index.html load ok', async()=>{
        const res = await axios.get('http://example.com/index.html');
        expect(res.status).toBe(200);
    });
    test('upload.html load ok', async()=>{
        const res = await axios.get('http://example.com/upload.html');
        expect(res.status).toBe(200);
    });
});