<template>
    <v-app id="inspire">
        <v-row justify="center">
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="#FF471A">
                        <router-link :to="{ name: 'gallery'}">
                            <v-btn icon dark>
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </router-link>
                        <v-toolbar-title>Image detail</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn icon color="#ffffff" @click="$refs.zoomer.zoomOut()">
                                <v-icon>mdi-magnify-minus</v-icon>
                            </v-btn>
                            <v-btn icon color="#ffffff" @click="$refs.zoomer.zoomIn()">
                                <v-icon>mdi-magnify-plus</v-icon>
                            </v-btn>
                            <div class="mx-10"></div>
                            <v-btn icon color="#ffffff" @click="fetchImage(findImage(false).id)">
                                <v-icon>mdi-chevron-left</v-icon>
                            </v-btn>
                            <v-btn icon color="#ffffff" @click="fetchImage(findImage(true).id)">
                                <v-icon>mdi-chevron-right</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-progress-linear
                        :active="isLoading"
                        :indeterminate="isLoading"
                        background-color="#ffffff"
                        color="#EB9122"
                    ></v-progress-linear>
                    
                </v-card>
            </v-dialog>
        </v-row>
    </v-app>
</template>

<script>
    import { mapGetters } from 'vuex';
    import axios from 'axios';
    import * as types from './../store/types';

    export default {
        data () {
            return {
                dialog: true,
                overlay: false
            }
        },
        computed: {
            ...mapGetters({
                selectedImage: types.SELECTED_IMAGE
            }),
            isLoading: {
                get() {
                    return this.$store.getters[types.IS_LOADING];
                },
                set(value) {
                    this.$store.dispatch(types.UPDATE_IS_LOADING, value);
                }
            }
        }
    }
</script>