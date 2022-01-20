const User = require('../../../models/User');
const jestConfig = require('../../integration/jest.config');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe('login', () => {
    test('it should login successfully with a 200 status code', async () => {
        
    })
})