import express from "express";
import supertest from "supertest";
import mongoose from "mongoose";
import router from "../../router";
import UserModel from "../../models/user";
import {
  describe,
  afterEach,
  it,
  afterAll,
  expect,
  beforeAll,
} from "@jest/globals";

const mockUser = {
  userName: "mock",
  email: "test@example.com",
  password: "123",
  profilePic: "",
};

const mockUser2 = {
  userName: "mock",
  email: "",
  password: "123",
  profilePic: "",
};

const mockUser3 = {
  userName: "mock3",
  email: "test@example.com",
  password: "123",
  profilePic: "",
};

describe("User Controller", () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  beforeAll(async () => {
    await mongoose.connection.close();
    const url = `mongodb://127.0.0.1/test`;
    await mongoose.connect(url);
  });

  afterEach(async () => {
    await UserModel.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create new User in the DB", async () => {
    await request.post("/users").send(mockUser);

    return await UserModel.findOne({ userName: mockUser.userName }).then(
      (user) => {
        expect(user?.userName).toBe(mockUser.userName);
        expect(user?.email).toBe(mockUser.email);
      }
    );
  });

  it("should not created User without email", async () => {
    await request
      .post("/users")
      .send(mockUser2)
      .then((response) => {
        expect(response.status).toBe(400);
      });
  });

  it("should login user", async () => {
    await request.post("/users").send(mockUser);

    return await request
      .post("/users/login")
      .send({ email: mockUser.email, password: mockUser.password })
      .then((response) => {
        expect(response?.status).toBe(200);
      });
  });

  it("should not login with incorrect credentials", async () => {
    await request.post("/users").send(mockUser);

    return await request
      .post("/users/login")
      .send({ email: mockUser.email, password: "wrongpw" })
      .then((response) => {
        expect(response?.status).toBe(401);
      });
  });

  it("should update user", async () => {
    const mockWithId = await request.post("/users").send(mockUser);
    return await request
      .put(`/users/${mockWithId.body._id}`)
      .send(mockUser3)
      .then((response) => {
        expect(response?.status).toBe(201);
      });
  });

  it("should not update user if the one of the required fields is missing", async () => {
    const mockWithId = await request.post("/users").send(mockUser);
    return await request
      .put(`/users/${mockWithId.body._id}`)
      .send(mockUser2)
      .then((response) => {
        expect(response?.status).toBe(400);
      });
  });
});
