const request = require('supertest');
const app = require('./app');


describe('HTTP page status', ()=>{
    test('index.html load ok', async()=>{
        const res = await request(app).get('/index.html');
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type']).toContain('text/html');
    });
    test('upload.html load ok', async()=>{
        const res = await request(app).get('/upload.html');
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type']).toContain('text/html');
    });
});