import { API } from "@/consts";
import { Info } from "@/types";
import { service } from "@/utils/request";
import MockAdapter from "axios-mock-adapter";
import Mock from "mockjs";

class MockServer {
  mock: MockAdapter;
  constructor() {
    this.mock = new MockAdapter(service);
  }
  start() {
    const mock = this.mock;
    mock.onGet(API.info).reply(200, {
      code: 200,
      data: {
        title: Mock.Random.word(),
        description: Mock.Random.sentence(),
        keywords: Mock.Random.word(),
        shareInfo: {},
        act_rule: Mock.Random.paragraph(),
      } as Info,
    });
  }
}

export default MockServer;
