import * as types from './types';

export default {
    [types.UPDATE_IS_LOADING]: ({ commit }, payload) => {
        commit(types.MUTATE_UPDATE_IS_LOADING, payload)
    },
    [types.OBTAIN_TOKEN]: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            axios.post('/auth', {
                    apiKey: payload.apiKey
                })
                .then(response => {
                    const token = response.data.token
                    localStorage.setItem('token', token);
                    axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`
                    commit(types.MUTATE_UPDATE_TOKEN, token);
                    resolve(response);
                })
                .catch(error => {
                    localStorage.removeItem('token');
                    delete axios.defaults.headers.common['Authorization'];
                    reject(error);
                })
        })
    }
}