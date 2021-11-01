import { initialize } from 'redux-form';
import { message } from 'antd';
import { t } from '@lingui/macro';
import { keyBy } from 'lodash';
import { push } from 'connected-react-router';

import { i18n } from '../layouts/base';
import * as clientsService from '../services/clients';

export default {
  namespace: 'clients',

  state: {
    items: {},
  },

  effects: {
    *list({ payload: { sort = ['name'] } = {} }, { put, call }) {
      try {
        const response = yield call(clientsService.list, sort);
        yield put({ type: 'listSuccess', data: response.docs });
      } catch (e) {
        message.error(i18n._(t`Error loading clients list!`), 5);
      }
    },

    *details({ payload: { id } }, { put, call }) {
      try {
        const response = yield call(clientsService.details, id);
        yield put({ type: 'detailsSuccess', data: response });
      } catch (e) {
        message.error(i18n._(t`Error loading client details!`), 5);
      }
    },

    *initialize({ payload: { id } }, { put, call }) {
      try {
        const response = yield call(clientsService.details, id);
        yield put({ type: 'detailsSuccess', data: response });
        yield put(initialize('client', response, false));
      } catch (e) {
        message.error(i18n._(t`Error initializing client form!`), 5);
      }
    },

    *save({ data }, { put, call }) {
      try {
        const response = yield call(clientsService.save, data);
        yield put({ type: 'detailsSuccess', data: response });
        message.success(i18n._(t`Client saved!`), 5);
        return response;
      } catch (e) {
        message.error(i18n._(t`Error saving client!`), 5);
      }
    },

    *remove({ data, resolve, reject }, { put, call }) {
      try {
        const response = yield call(clientsService.remove, data);
        yield put({ type: 'removeSuccess', data: response });
        message.success(i18n._(t`Client deleted!`), 5);
        yield put(push('/clients'));
      } catch (e) {
        message.error(i18n._(t`Error deleting client!`), 5);
      }
    },
  },

  reducers: {
    listSuccess(state, payload) {
      const { data } = payload;

      return {
        ...state,
        items: keyBy(data, '_id'),
      };
    },

    detailsSuccess(state, payload) {
      const { data } = payload;

      return {
        ...state,
        items: {
          ...state.items,
          [data._id]: data,
        },
      };
    },

    removeSuccess(state, payload) {
      const { data } = payload;

      let items = { ...state.items };
      delete items[data._id];

      return {
        ...state,
        items: items,
      };
    },
  },
};
