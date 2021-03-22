
const db = require('../server/db')
const {User, Game, User_Game_Profile} = require('../server/db/models')
const faker = require('faker');
const hipsum = require('lorem-hipsum');

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')


  const usersArray = []
  for (let i = 0; i < 40; i++) {
    const email = faker.internet.email()
    const password = faker.internet.password()
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const userName = firstName + lastName

    usersArray.push({
      email,
      password,
      userName,
    })
  };

  const users = await Promise.all(
    usersArray.map((user) => {
      return User.create(user)
    })
  );

  const games = ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort', 'Bucket Sort'];
  const gamesArray = [];

  const loremHipsum = () => hipsum({
    count: 1,
    units: 'sentences',
    format: 'plain'
  });

for(let i=0; i<games.length; i++ ) {
    const gameName = games[i];
    const gameDescription = loremHipsum();

    gamesArray.push({gameName, gameDescription});

};



const game = await Promise.all(
    gamesArray.map((game) => {
      return Game.create(game)
    })
  );

  console.log(`seeded successfully`);
}


// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
