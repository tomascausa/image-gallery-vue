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
                        </v-toolbar-items>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn icon color="#ffffff" @click="fetchImage(findImage(false).id)">
                                <v-icon size="35">mdi-chevron-left</v-icon>
                            </v-btn>
                            <v-btn icon color="#ffffff" @click="fetchImage(findImage(true).id)">
                                <v-icon size="35">mdi-chevron-right</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-progress-linear
                        :active="isLoading"
                        :indeterminate="isLoading"
                        background-color="#ffffff"
                        color="#EB9122"
                    ></v-progress-linear>
                    <template v-if="!isLoading && selectedImage">
                        <v-zoomer zoomed ref="zoomer">
                            <v-img :src="selectedImage.full_picture.replace(/\s/g, '%20')" aspect-ratio="1.7" max-height="calc(100vh - 64px)"></v-img>
                        </v-zoomer>
                        <v-hover>
                            <template v-slot:default="{ hover }">
                                <div class="absolute left-0 top-0 h-screen w-full" style="top: 64px; max-height: calc(100vh - 64px);">
                                    <v-fade-transition>
                                        <v-overlay
                                            v-if="hover"
                                            absolute
                                            color="rgb(255, 71, 26, 0.3)"
                                        >
                                            <v-card
                                                class="mx-auto"
                                                outlined
                                                color="#EB9122"
                                            >
                                                <v-card-title class="headline">{{ selectedImage.author }}</v-card-title>
                                                <v-card-subtitle class="title">Camera: {{ selectedImage.camera }}</v-card-subtitle>
                                                <v-card-text class="subtitle-1">{{ selectedImage.tags }}</v-card-text>
                                            </v-card>
                                        </v-overlay>
                                    </v-fade-transition>
                                </div>
                            </template>
                        </v-hover>
                        <v-btn
                            v-show="true"
                            color="#FF471A"
                            dark
                            absolute
                            fixed
                            bottom
                            right
                            fab
                        >
                            <a target="_blank" :href="selectedImage.full_picture.replace(/\s/g, '%20')">
                                <v-icon color="#ffffff">mdi-share</v-icon>
                            </a>
                        </v-btn>
                    </template>
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
        },
        created() {
            this.fetchImage(this.$route.params.id);
        },
        methods: {
            fetchImage(id) {
                this.$store.dispatch(types.UPDATE_IS_LOADING, true);
                this.$store.dispatch(types.GET_IMAGE_DETAIL, id)
                .then((response) => {
                    this.$store.dispatch(types.UPDATE_IS_LOADING, false);
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        this.$store.dispatch(types.OBTAIN_TOKEN, { apiKey: '23567b218376f79d9415' })
                        .then(() => {
                            this.fetchImage(id);
                        })
                        .catch((error) => {
                            this.$store.dispatch(types.UPDATE_IS_LOADING, false);
                            this.$router.push({name: 'error'})
                        })
                    } else {
                        this.$store.dispatch(types.UPDATE_IS_LOADING, false);
                        this.$router.push({name: 'error'});
                    }
                })
            },
            findImage(isNext) {
                var images = this.$store.getters[types.IMAGES];
                var index = images.findIndex((image) => {
                    return image.id === this.selectedImage.id
                });
                if (isNext) {
                    return images[index + 1];
                } else {
                    if (index != 0) {
                        return images[index - 1];
                    } else {
                        return index;
                    }
                }
            },
        }
    }
</script>

<style lang="scss">
    .v-btn--fab.v-size--default.v-btn--absolute.v-btn--bottom {
        right: 30px;
        bottom: 30px;
        z-index: 9999;
    }
</style>