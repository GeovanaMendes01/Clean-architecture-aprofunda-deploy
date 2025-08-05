import request from 'supertest';
import app from '../../app';

describe('PATCH /books/:id', () => {
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

  it('Deve atualizar o status de um livro e retornar status 200', async () => {
    const createResponse = await request(app)
      .post('/books')
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: 'Quarto de Despejo',
        author: 'Carolina Maria de Jesus',
        description: 'Diário de uma favelada',
        status: 'disponível'
      });

    const bookId = createResponse.body.book.id;

    const updateResponse = await request(app)
      .patch(`/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        status: 'emprestado'
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.message).toContain('atualizado com sucesso');
  });

  it('Deve retornar status 404 ao tentar atualizar um livro inexistente', async () => {
    const response = await request(app)
      .patch('/books/id-invalido')
      .set("Authorization", `Bearer ${token}`)
      .send({
        status: 'emprestado'
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Livro não encontrado!');
  });
});