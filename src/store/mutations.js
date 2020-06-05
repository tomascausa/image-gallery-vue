export default {
    [types.MUTATE_UPDATE_TOKEN]: (state, payload) => {
        state.token = payload;
    },
    [types.MUTATE_FETCH_IMAGES]: (state, images) => {
        state.images = images;
    },
    [types.MUTATE_SET_SELECTED_IMAGE]: (state, payload) => {
        state.selectedImage = payload;
    },
    [types.MUTATE_UPDATE_IS_LOADING]: (state, payload) => {
        state.isLoading = payload;
    }
}