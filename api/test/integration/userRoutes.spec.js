// const { request } = require("../../index");

// describe('users endpoints', () => {
//     let api; 
//     beforeEach(async () => {
//         await resetTestDB()
//     });

//     beforeAll(async () => {
//         api = app.listen(5000, () => console.log('Test server running on port 5000'))
//     });

//     afterAll(async () => {
//         console.log('Stopping test server on port 5000')
//         await api.close()
//     })

//     it('should return a list of all users in database', async () => {
//         const res = await request(api).get('/users');
//         expect(res.statusCode).toEqual(200);
//     })
// })