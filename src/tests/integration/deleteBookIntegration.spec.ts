import request from 'supertest';
import app from '../../app';

describe('DELETE /books/:id', () => {
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

  it('Deve deletar um livro pelo ID e retornar status 200', async () => {
    const createResponse = await request(app)
      .post('/books')
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: 'Capitães da Areia',
        author: 'Jorge Amado',
        description: 'História de meninos de rua em Salvador',
        status: 'disponível'
      });

    const bookId = createResponse.body.book.id;

    const deleteResponse = await request(app)
      .delete(`/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.message).toContain('removido com sucesso');
  });

  it('Deve retornar status 404 ao tentar deletar um livro inexistente', async () => {
    const response = await request(app)
      .delete('/books/id-invalido')
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Livro não encontrado!');
  });
});