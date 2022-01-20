const mockingoose = require('mockingoose');

const UserModel = require('../../../models/User');
const DayModel = require('../../../models/dayHabits');
const WeekModel = require('../../../models/weekHabits');

describe('test mongoose User model', () => {
    it('should return the doc with findById', () => {
        const _doc = {
            _id: '61e6ca7e7f13b10959dd398f',
            userName: 'brandon',
            password: '$2b$10$hcFOmZOsaYF1GJhQfYCgLOPFHDtTaBEGTony6qYUWEpLAr4L/3pt2'
        }
        mockingoose(UserModel).toReturn(_doc, 'findOne');

    return UserModel.findById({ _id: '61e6ca7e7f13b10959dd398f' }).then(doc => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
    });
  });
});

describe('test mongoose day model', () => {
    it('should return the doc with findById', () => {
        const _doc ={
            _id: '61e83a0847de6a8269c39303',
            content: 'homework',
            userName: 'test'
        }
        mockingoose(DayModel).toReturn(_doc, 'findOne');
        return DayModel.findById({ _id: '61e83a0847de6a8269c39303' }).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
          });
    });
});

describe('test mongoose week model', () => {
    it('should return the doc with findById', () => {
        const _doc ={
            _id: '61e9351da2645d34b13f6373',
            content: 'abcdefg',
            userName: 'test'
        }
        mockingoose(WeekModel).toReturn(_doc, 'findOne');
        return WeekModel.findById({ _id: '61e9351da2645d34b13f6373' }).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
          });
    });
});
