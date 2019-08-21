import Vuex from 'vuex';

import defaultState from './state/state';
import mutations from './mutations/mutations';
import getters from './getters/getters';
import actions from './actions/actions';

const devMode = process.env.NODE_ENV !== 'production';

// 使用方法去创建 store,因为服务端渲染，每次都需要去创建一个新的 store,否则每次都用同一个 store 可能会内存溢出
export default () => {
  return new Vuex.Store({
    strict: devMode, // 规定无法从外部修改数据,开发环境使用,生产环境不能使用
    state: defaultState,
    mutations,
    getters,
    actions,
    modules: {
      a: {
        namespaced: true,
        state: {
          text: 'state from a module'
        },
        mutations: {
          updateText(state, num) {
            state.text = num;
          }
        },
        getters: {
          textPlus(state, getters, rootState) {
            return state.text + " " + rootState.count + " modified by getters";
          }
        },
        actions: {
          add({ state, commit, rootState}) {
            // 调用本模块中的 mutation
            commit('updateText', rootState.count);
            // 调用全局的 mutation
            // commit('updateCount', {num: rootState.count}, { root: true})
          }
        }
      },
      b: {
        state: {
          text: 'state from b module'
        }
      }
    }
  });
};
