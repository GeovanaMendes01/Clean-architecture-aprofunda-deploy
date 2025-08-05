import request from 'supertest';
import app from '../../app';

describe('GET /books', () => {
  jest.setTimeout(30000);

  let token: string;

  beforeAll(async () => {
    await request(app)
      .post("/register")
      .send({
        name: "Geovana",
        email: "geovana@example.com",
        password: "123456"
      });

    const login = await request(app)
      .post("/login")
      .send({
        email: "geovana@example.com",
        password: "123456"
      });

    token = login.body.token;
  });

  it('Deve retornar status 200 e um array com os livros cadastrados', async () => {
    await request(app)
      .post('/books')
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: 'Capitães da Areia',
        author: 'Jorge Amado',
        description: 'Romance sobre meninos de rua em Salvador',
        status: 'disponível'
      });

    const response = await request(app)
      .get('/books')
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('title', 'Capitães da Areia');
    expect(response.body[0]).toHaveProperty('author', 'Jorge Amado');
  });
});