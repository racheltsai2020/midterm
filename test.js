const axios =require('axios');

const host = process.env.HOST || 'http://localhost:80';

describe('HTTP page status', ()=>{
    test('index.html load ok', async()=>{
        const res = await axios.get('${host}/index.html');
        expect(res.status).toBe(200);
    });
    test('upload.html load ok', async()=>{
        const res = await axios.get('${host}/upload.html');
        expect(res.status).toBe(200);
    });
});