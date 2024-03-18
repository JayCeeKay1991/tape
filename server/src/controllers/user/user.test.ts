import express from "express";
import supertest from "supertest";
import mongoose, { Model } from "mongoose";
import router from "../../router";
import UserModel from "../../models/user";
import { describe, afterEach, it, afterAll } from "@jest/globals";
import { expect, beforeAll } from "@jest/globals";
import bcrypt from "bcrypt";

const mockUser = {
  userName: "mock",
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
  })

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create new User in the DB", async () => {
    await request.post("/users").send(mockUser)
    
    return await UserModel.findOne({ userName: mockUser.userName})
      .then(user => {
        expect(user?.userName).toBe(mockUser.userName)
        expect(user?.email).toBe(mockUser.email)
      })
  });


  it("should login user", async () => {
    await request.post("/users").send(mockUser)

    return await request.post('/users/login').send({email: mockUser.email, password: mockUser.password})
      .then(response => {
        expect(response?.status).toBe(200)
      })
  })

})
