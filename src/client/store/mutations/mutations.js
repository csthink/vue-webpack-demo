// 这里只能写同步的代码，需要写异步代码，则需要在 actions.js 中书写
export default {
  // updateCount(state, num) {
  //   state.count = num;
  // }
  // mutations 接收多个参数的用法(js 解构赋值语法)
  updateCount(state, {num, num2, ...rest}) {
    state.count = num;
    // console.log(num2);
    // console.log(rest);
  }
}
