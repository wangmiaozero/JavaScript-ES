都知道 Promise.all 具有并发执行异步任务的能力。但它的最大问题就是如果其中某个任务出现异常(reject)，所有任务都会挂掉，Promise 直接进入 reject 状态。

想象这个场景：你的页面有三个区域，分别对应三个独立的接口数据，使用 Promise.all 来并发三个接口，如果其中任意一个接口服务异常，状态是 reject,这会导致页面中该三个区域数据全都无法渲染出来，因为任何 reject 都会进入 catch 回调, 很明显，这是无法接受的，如下：

```js
Promise.all([
  Promise.reject({code: 500, msg: '服务异常'}),
  Promise.resolve({ code: 200, list: []}),
  Promise.resolve({code: 200, list: []})
])
.then((ret) => {
  // 如果其中一个任务是 reject，则不会执行到这个回调。
  console.log(res)
  RenderContent(ret);
})
.catch((error) => {
  // 本例中会执行到这个回调
  console.log(error)
  // error: {code: 500, msg: "服务异常"}
})
```

Promise.allSettled 的优势
我们需要一种机制，如果并发任务中，无论一个任务正常或者异常，都会返回对应的的状态（fulfilled 或者 rejected）与结果（业务 value 或者 拒因 reason），在 then 里面通过 filter 来过滤出想要的业务逻辑结果，这就能最大限度的保障业务当前状态的可访问性，而 Promise.allSettled 就是解决这问题的。

```js
Promise.allSettled([
  Promise.reject({code: 500, msg: '服务异常'}),
  Promise.resolve({ code: 200, list: []}),
  Promise.resolve({code: 200, list: []})
])
.then((ret) => {
  /*
      0: {status: "rejected", reason: {...}}
      1: {status: "fulfilled", value: {...}}
      2: {status: "fulfilled", value: {...}}
  */
  // 过滤掉 rejected 状态，尽可能多的保证页面区域数据渲染
  RenderContent(ret.filter((el) => {
      console.log(el)
      return el.status !== 'rejected';
  }));
});
```

ES2020 提供了一种简易的方式：String.prototype.matchAll, 该方法会返回一个迭代器
```js
var str = '<text>JS</text><text>正则</text>';
var allMatchs = str.matchAll(/<\w+>(.*?)<\/\w+>/g);

for (const match of allMatchs) {
  console.log(match);
}
/*
第一次迭代返回：
[
    "<text>JS</text>",
    "JS",
    index: 0,
    input: "<text>JS</text><text>正则</text>",
    groups: undefined
]

第二次迭代返回：
[
    "<text>正则</text>",
    "正则",
    index: 15,
    input: "<text>JS</text><text>正则</text>",
    groups: undefined
]
*/
```