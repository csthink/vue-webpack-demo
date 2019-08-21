// actions 中可以书写异步的代码，mutations 中只能是同步的代码
export default {
  // 多个参数需要第二个参数封装成对象传递进来
  updateCountAsync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', {
        num: data.num
      });
    }, data.time);
  }
}
