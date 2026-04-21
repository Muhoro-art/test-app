import request from 'supertest';
import app from '../index';

describe('User Controller', () => {
  it('should create a user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ id: '1', name: 'John Doe' });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('John Doe');
  });

  it('should get all users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
