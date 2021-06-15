# H5 项目

常熟 cdn：http://aimg.cs090.com/

太仓 cdn：http://aimg.tc090.net/

目录结构：

- apis: 各种接口请求函数
- assets: 图片素材
- components: 组件
- consts: 常量，如配置
- directives: 自定义指令，如横屏
- hooks: 钩子，即可复用的函数
- mock: 模拟请求数据
- router: 路由
- store: 全局变量
- types: 类型
- utils: 工具，如提示、请求等
- views: 视图

## Debug API

调试接口，直接复制接口数据

```js
const copyToClipboard = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

const fetchData = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => copyToClipboard(JSON.stringify(res.data)));
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
