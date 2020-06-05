import * as types from './types';

export default {
    [types.TOKEN]: state => {
        return state.token;
    },
    [types.IMAGES]: state => {
        return state.images;
    },
    [types.SELECTED_IMAGE]: state => {
        return state.selectedImage;
    },
    [types.IS_LOADING]: state => {
        return state.isLoading;
    }
}