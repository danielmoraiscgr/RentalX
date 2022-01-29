import request from "supertest";
import { hash } from "bcryptjs";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection; 

describe("List Categories Controller", () => {

    beforeAll(async () =>{
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuid();

        const password = await hash("admin",8);

        await connection.query(`
          INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, drive_license)
          values('${id}','admin','admin@rentx.com.br','${password}', true,'now()','XXXXXXXX')
          `
        );
    });

    afterAll(async ()=> {
        await connection.dropDatabase();
        await connection.close(); 
    })

    it("should be to list all categories", async () => {
        const responseToken = await request(app)
        .post("/session")
        .send({
            email: "admin@rentx.com.br",
            password: "admin"
        });

        const { token } = responseToken.body; 

        Promise.all([
            await request(app)
            .post("/categories")
            .send({
                name : "Category",
                description : "Category"})
            .set({
                Authorization: `Bearer ${token}`,
            }),
            await request(app)
            .post("/categories")
            .send({
                name : "Category supertest",
                description : "Category"})
            .set({
                Authorization: `Bearer ${token}`,
            })
        ]);
        
        const response = await request(app)
        .get("/categories");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0].name).toEqual("Category");

    });

})