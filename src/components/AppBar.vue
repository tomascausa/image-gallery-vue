<template>
    <div>
        <v-app-bar color="#FF471A" dark>
            <router-link :to="{ name: 'gallery'}">
                <v-toolbar-title class="display-1 font-weight-bold">Image Gallery</v-toolbar-title>
            </router-link>
            <v-spacer></v-spacer>
        </v-app-bar>
        <v-progress-linear
            :active="isLoading"
            :indeterminate="isLoading"
            background-color="#ffffff"
            color="#EB9122"
        ></v-progress-linear>
    </div>
</template>

<script>
import * as types from './../store/types';

export default {
    computed: {
        isLoading: {
            get() {
                return this.$store.getters[types.IS_LOADING];
            },
            set(value) {
                this.$store.dispatch(types.UPDATE_IS_LOADING, value);
            }
        }
    },
}
</script>