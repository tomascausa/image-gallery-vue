export default {
    [types.UPDATE_IS_LOADING]: ({ commit }, payload) => {
        commit(types.MUTATE_UPDATE_IS_LOADING, payload)
    }
}