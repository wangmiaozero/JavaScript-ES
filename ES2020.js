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


/* Promise.allSettled */

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


