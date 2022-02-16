import {NavigatorData} from '~/data/NavigatorData';

export const state = {
  data: {} as NavigatorData,
  selectedTop: '',
  selectedLeft: '',
};

export const mutations = {
  setData(state: any, data: any) {
    state.data = data;
  },

  setTop(state: any, value: string) {
    state.selectedTop = value;
  },

  setLeft(state: any, value: string) {
    state.selectedLeft = value;
  },
};

export const actions = {
  setData(context: any, data: NavigatorData) {
    context.commit('setData', data);
    context.dispatch('setTop', Object.keys(data)[0]);
  },

  setTop(context: any, value: string) {
    context.commit('setTop', value);

    const leftKey = Object.keys(context.state.data[value])[0];
    context.commit('setLeft', leftKey);
  },

  setLeft(context: any, value: string) {
    context.commit('setLeft', value);
  },

  setBoth(context: any, {top, left}: {top: string, left: string}) {
    context.commit('setTop', top);
    context.commit('setLeft', left);
  }
};
