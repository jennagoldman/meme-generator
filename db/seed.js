const Meme = require('../lib/models/Meme');
const chance = require('chance').Chance();

module.exports = async({ memesToCreate = 20 } = {}) => {
  const memes = await Meme.create([...Array(memesToCreate)].map(() => ({
    name: chance.sentence(),
    image: chance.url(),
    bottom: chance.sentence()
  })));
};
