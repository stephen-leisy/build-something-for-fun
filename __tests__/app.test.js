const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('User sign up with Simpsons API', () => {
  beforeEach(() => {
    return setup(pool);
  });
  let testProfile;
  beforeEach(async () => {
    await request(app).post('/api/v1/profiles').send({ name: 'Lisa' });
    await request(app).post('/api/v1/profiles').send({ name: 'Bart' });
  });

  it('creates a profile and returns a simpsons quote.', async () => {
    const testProfile = await request(app)
      .post('/api/v1/profiles')
      .send({ name: 'simpsons fan' });

    console.log(testProfile.body);
    expect(testProfile.body).toEqual({
      id: expect.any(String),
      name: 'simpsons fan',
      quote: expect.any(String),
      character: expect.any(String),
    });
  });

  it('returns all user profiles', async () => {
    const allUsers = await request(app).get('/api/v1/profiles');
    console.log(allUsers.body);
    expect(allUsers.body).toEqual([
      {
        id: expect.any(String),
        name: 'Lisa',
        quote: expect.any(String),
        character: expect.any(String),
      },
      {
        id: expect.any(String),
        name: 'Bart',
        quote: expect.any(String),
        character: expect.any(String),
      },
    ]);
  });
  it('returns one user profile by ID', async () => {
    const oneUser = await request(app).get('/api/v1/profiles/2');
    expect(oneUser.body).toEqual([
      {
        id: '2',
        name: expect.any(String),
        quote: expect.any(String),
        character: expect.any(String),
      },
    ]);
  });
  it('updates a user profile by id', async () => {
    const alterUser = await request(app)
      .put('/api/v1/profiles/2')
      .send({ name: 'Maggie' });

    expect(alterUser.body).toEqual({
      id: '2',
      name: 'Maggie',
      quote: expect.any(String),
      character: expect.any(String),
    });
  });

  it('deletes a user profile by id', async () => {
    // const strangeUser = await request(app).post('/api/v1/profiles').send({ name: 'Milhouse' });
    const deleteUser = await request(app).delete('/api/v1/profiles/1');

    expect(deleteUser.body).toEqual([{
      id: expect.any(String),
      name: 'Lisa',
      quote: expect.any(String),
      character: expect.any(String),
    }]);

    const nothing = await request(app).get('/api/v1/profiles/1');
    expect(nothing.body).toEqual([]);
  });
});
