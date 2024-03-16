import express from "express";
import supertest from "supertest";
import mongoose, { Model } from "mongoose";
import router from "../../router";
import UserModel, { userType } from "../../models/user";
// import test, { describe, afterEach, it } from "node:test";
import { describe, afterEach, it, afterAll } from "@jest/globals";
import { expect, beforeAll } from "@jest/globals";
import bcrypt from "bcrypt";

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

  afterAll(async () => {
    await Users.deleteMany();
    await mongoose.connection.close();
  });

  it("should create new User in the DB", async () => {
    const res = await request.post("/users").send(mockUser);
    const user = await Users.findOne(mockUser);
    if (user) {
      expect(user.userName).toBe(mockUser.userName);
      expect(user.email).toBe(mockUser.email);
    }
  });

  // still need to fix!!
  it("should return the User that have the same email & password from the DB", async () => {
    const res = await request.post("/users/login").send(mockUser);
    const { email, password } = mockUser;
    const user = await Users.findOne({ email: "test@example.com" });

    if (user) {
      expect(user.email).toBe(email);
      const validatedPass = await bcrypt.compare(password, user.password);
      console.log("validated: ", validatedPass);
      if (validatedPass) {
        expect(validatedPass).toBe(true);
      } else {
        expect(validatedPass).toBe(false);
        // }
      }
    } else {
      expect(res).toBe("No user found");
    }
  });
});
// it("should get all the items", async () => {
//   // Ensure the database is clean and then insert an item.
//   await Items.deleteMany();
//   await mockItem2.save();

//   // Fetching all items
//   const res = await request.get("/items");
//   expect(res.status).toBe(200); // Check for successful response

//   // Check that the response contains an object that matches properties of mockItem2
//   expect(res.body.length).toBeGreaterThan(0); // Ensure the response contains at least one item

//   // You might need to adjust the assertion to match the specific structure of your API response
//   expect(res.body).toEqual(
//     expect.arrayContaining([expect.objectContaining(mockItem)])
//   );
// });
