const request = require('supertest');
const app = require('../../index')

describe('Users API', () => {
    let api; 
    
    beforeAll(async () => {
        api = app.listen(6000, () => console.log('Test server running on port 6000'))
    });

    afterAll(async () => {
        console.log('Stopping test server on port 6000')
        await api.close()
    })

    it('should return username', async () => {
        const res = await request(api).get('/login')
        .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiJ9.dGVzdDEyMw.fxmS2pDF5dWSxXXf5v5qokjsypiRpjQrP0rMGxld8Dc')
        .expect(200)
    })
})