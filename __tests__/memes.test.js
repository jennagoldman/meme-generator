require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('meme routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a meme', () => {
    return request(app)
      .post('/api/v1/memes')
      .send({
        top: 'I don\'t think that memes',
        image: 'https://pbs.twimg.com/profile_images/1039262742237118465/J3yZraiI.jpg',
        bottom: 'what you think it memes'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          top: 'I don\'t think that memes',
          image: 'https://pbs.twimg.com/profile_images/1039262742237118465/J3yZraiI.jpg',
          bottom: 'what you think it memes',
          __v: 0
        });
      });
  });
});
