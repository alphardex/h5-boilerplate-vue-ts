import { API } from "@/consts";
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
    mock.onGet(API.wxShare).reply(200, {
      code: 200,
      data: {
        appid: "wxf9d0cf801b91d3ed",
        noncestr: "c734d2a39e7a32a757e8083b00cb29ae",
        signature: "96d834bd3c34a0693d7a7fafcaa88051f43392dc",
        timestamp: "1608015196",
      },
    });
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
      },
    });
  }
}

export default MockServer;
