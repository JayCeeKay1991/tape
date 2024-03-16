import express from "express";
import supertest from "supertest";
import mongoose, { Model } from "mongoose";
import router from "../../router";
import ChannelModel, { channelType } from "../../models/channel";
import { describe, afterEach, it } from "@jest/globals";
import { expect, beforeAll } from "@jest/globals";
const Channels: Model<channelType> = ChannelModel;

const dbName = "test";
////////////////////////////////////////////////////////////////////////////////////////
const mockChannel = {
  name: "mock channel",
  picture: ""
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
    await Channels.deleteMany();
    await mongoose.connection.close();
  });

  it("should create new Item in the DB", async () => {
    const res = await request.post("/channels").send(mockChannel);
    const channel = await Channels.findOne(mockChannel);
    if (channel) {
      expect(channel.name).toBe(mockChannel.name);
    }
  });
});
