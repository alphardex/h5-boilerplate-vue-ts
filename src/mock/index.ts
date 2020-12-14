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
        share_info: {
          title: Mock.Random.word(),
          desc: Mock.Random.sentence(),
          img: Mock.Random.image(),
          url: Mock.Random.url(),
        },
        act_rule: Mock.Random.paragraph(),
      } as Info,
    });
  }
}

export default MockServer;
