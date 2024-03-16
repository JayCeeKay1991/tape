import express from "express";
import supertest from "supertest";
import mongoose, { Model } from "mongoose";
import router from "../../router";
import UserModel, { userType } from "../../models/user";
// import test, { describe, afterEach, it } from "node:test";
import { describe, afterEach, it } from "@jest/globals";
import { expect, beforeAll } from "@jest/globals";
const Users: Model<userType> = UserModel;

const dbName = "test";
////////////////////////////////////////////////////////////////////////////////////////
const mockUser = {
  userName: "mock",
  email: "test@example.com",
  password: "123",
  profilePic: "",
};

describe("Integration tests", () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  beforeAll(async () => {
    await mongoose.connection.close();
    const url = `mongodb://127.0.0.1/${dbName}`;
    await mongoose.connect(url);
  });

  afterEach(async () => {
    await Users.deleteMany();
    await mongoose.connection.close();
  });

  it("should create new Item in the DB", async () => {
    const res = await request.post("/users").send(mockUser);
    const user = await Users.findOne(mockUser);
    if (user) {
      expect(user.userName).toBe(mockUser.userName);
      expect(user.email).toBe(mockUser.email);
    }
  });
});
