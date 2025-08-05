import request from 'supertest';
import app from '../../app';
import bookStorage from "../../storage/bookStorage";

describe("POST /books", () => {
    jest.setTimeout(30000);

    let token: string;

    beforeAll(async () => {
        const register = await request(app)
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

    beforeEach(() => {
        bookStorage.books = [];
    });

    it("Deve criar um novo livro e retornar status 201", async () => {
        const response = await request(app)
            .post("/books")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "A Hora da Estrela",
                author: "Clarice Lispector",
                description: "História de Macabéa, uma jovem nordestina no Rio de Janeiro",
                status: "disponível"
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toContain("Livro 'A Hora da Estrela' criado com sucesso");
    });
});