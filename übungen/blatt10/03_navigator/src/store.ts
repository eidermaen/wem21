import {createStore} from 'vuex';
import {NavigatorData} from './models/NavigatorData';

export const store = createStore({
	state: {
		data: {} as NavigatorData,
		selectedTop: '',
		selectedLeft: '',
	},

	mutations: {
		setData (state, data) {
			state.data = data;
		},

		setTop (state, value) {
			state.selectedTop = value;
		},

		setLeft (state, value) {
			state.selectedLeft = value;
		},
	},

	actions: {
		setData (context, data) {
			context.commit('setData', data);
			context.dispatch('setTop', Object.keys(data)[0]);
		},

		setTop (context, value) {
			context.commit('setTop', value);

			const leftKey = Object.keys(context.state.data[value])[0];
			context.commit('setLeft', leftKey);
		},

		setLeft (context, value) {
			context.commit('setLeft', value);
		},

		setBoth(context, {top, left}) {
			context.commit('setTop', top);
			context.commit('setLeft', left);
		}
	}
});
