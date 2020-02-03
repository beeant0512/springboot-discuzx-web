import { basic, update } from './service';

const initState = {
  basic: { },
};

const Model = {
  namespace: 'setting',
  state: initState,
  effects: {
    *basic({ callback }, { call }) {
      const response = yield call(basic);
      callback(response.data || {});
    },
    *save({ payload, callback }, { call }) {
      const response = yield call(update, payload);
      callback(response || {});
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },

    clear() {
      return initState;
    },
  },
};

export default Model;
