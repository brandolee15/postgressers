const request = require('supertest');
const app = require('../../index')

describe('Habits API', () => {
    let api; 
    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(async () => {
        console.log('Stopping test server on port 5000')
        await api.close()
    })

    it('should get a day habit of Run', async () => {
        const res = await request(api).get('/habits/day')
        .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiJ9.dGVzdDEyMw.fxmS2pDF5dWSxXXf5v5qokjsypiRpjQrP0rMGxld8Dc')
        .expect(200)
        .expect([{"_id":'61e959e46e53384e936282fa',
        "content":"Run",
        "userName":"test123",
        "dates":[{"date":"2022-01-20","complete":false,"_id":"61e959e46e53384e936282fb"},
        {"date":"2022-01-21","complete":false,"_id":"61e959e46e53384e936282fc"},
        {"date":"2022-01-22","complete":false,"_id":"61e959e46e53384e936282fd"},
        {"date":"2022-01-23","complete":false,"_id":"61e959e46e53384e936282fe"},
        {"date":"2022-01-24","complete":false,"_id":"61e959e46e53384e936282ff"},
        {"date":"2022-01-25","complete":false,"_id":"61e959e46e53384e93628300"},
        {"date":"2022-01-26","complete":false,"_id":"61e959e46e53384e93628301"}],
        "createdAt": '2022-01-20T12:47:32.388Z',
        "updatedAt":'2022-01-20T12:47:32.388Z',
        "__v": 0}])
        })
        
    it('should get a week habit of Gym', async () => {
        const res = await request(api).get('/habits/week')
        .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiJ9.dGVzdDEyMw.fxmS2pDF5dWSxXXf5v5qokjsypiRpjQrP0rMGxld8Dc')
        .expect(200)
        .expect([{"_id":"61e96e9899ee73b13971718b",
        "content":"Gym",
        "userName":"test123",
        "complete":false,
        "createdAt": '2022-01-20T14:15:52.978Z',
        "updatedAt": '2022-01-20T14:15:52.978Z',
        "__v":0}])
    })
})

