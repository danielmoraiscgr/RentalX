"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const bcryptjs_1 = require("bcryptjs");
const uuid_1 = require("uuid");
const app_1 = require("@shared/infra/http/app");
const typeorm_1 = __importDefault(require("@shared/infra/typeorm"));
let connection;
describe("List Categories Controller", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        connection = yield (0, typeorm_1.default)();
        yield connection.runMigrations();
        const id = (0, uuid_1.v4)();
        const password = yield (0, bcryptjs_1.hash)("admin", 8);
        yield connection.query(`
          INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, drive_license)
          values('${id}','admin','admin@rentx.com.br','${password}', true,'now()','XXXXXXXX')
          `);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.dropDatabase();
        yield connection.close();
    }));
    it("should be to list all categories", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseToken = yield (0, supertest_1.default)(app_1.app)
            .post("/session")
            .send({
            email: "admin@rentx.com.br",
            password: "admin"
        });
        const { refresh_token } = responseToken.body;
        Promise.all([
            yield (0, supertest_1.default)(app_1.app)
                .post("/categories")
                .send({
                name: "Category",
                description: "Category"
            })
                .set({
                Authorization: `Bearer ${refresh_token}`,
            }),
            yield (0, supertest_1.default)(app_1.app)
                .post("/categories")
                .send({
                name: "Category supertest",
                description: "Category"
            })
                .set({
                Authorization: `Bearer ${refresh_token}`,
            })
        ]);
        const response = yield (0, supertest_1.default)(app_1.app)
            .get("/categories");
        expect(response.status).toBe(200);
        // expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0].name).toEqual("Category");
    }));
});
