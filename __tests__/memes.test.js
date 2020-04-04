const { getMeme, getMemes } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('meme routes', () => {
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

  it('gets all memes', async() => {
    const memes = await getMemes();

    return request(app)
      .get('/api/v1/memes')
      .then(res => {
        expect(res.body).toEqual(memes);
      });
  });

  it('gets a meme by id', async() => {
    const meme = await getMeme();

    return request(app)
      .get(`/api/v1/memes/${meme._id}`)
      .then(res => {
        expect(res.body).toEqual(meme);
      });
  });

  it('updates a meme by id', async() => {
    const meme = await getMeme();

    return request(app)
      .patch(`/api/v1/memes/${meme._id}`)
      .send({ top: 'One does not simply walk into Mordor' })
      .then(res => {
        expect(res.body).toEqual({
          ...meme,
          top: 'One does not simply walk into Mordor'
        });
      });
  });

  it('deletes a meme by id', async() => {
    const meme = await getMeme();

    return request(app)
      .delete(`/api/v1/memes/${meme._id}`)
      .then(res => {
        expect(res.body).toEqual(meme);
      });
  });
});
