<template>
    <div>
        <div class="flex flex-wrap image-list mt-10 -p-3">
            <template v-if="isLoading">
                <div v-for="image in 10" :key="image.id" class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                    <v-sheet :color="`grey darken-2`" class="p-3">
                        <v-skeleton-loader
                            class="mx-auto"
                            max-width="300"
                            type="image"
                        ></v-skeleton-loader>
                    </v-sheet>
                </div>
            </template>
            <template v-else>
                <div v-for="image in images" :key="image.id" class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                    <router-link :to="{ name: 'image-detail', params: { id: image.id }}">
                        <div class="image-item p-3">
                            <div
                                class="image-bg w-full h-full"
                                :style="{ 'background-image': 'url(' + image.cropped_picture.replace(/\s/g, '%20') + ')' }"
                            ></div>
                        </div>
                    </router-link>
                </div>
            </template>
        </div>
        <div class="text-center mt-8">
            <v-pagination
                v-model="page"
                :length="pageCount"
                :total-visible="10"
                prev-icon="mdi-chevron-left"
                next-icon="mdi-chevron-right"
                v-on:input="$router.push({name: 'gallery', query: { page: $event }})"
            ></v-pagination>
        </div>
    </div>
    
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import * as types from './../store/types';

export default {
    data () {
      return {
        page: this.$route.query.page ? +this.$route.query.page : 1,
        pageCount: 1,
        dialog: false,
      }
    },
    computed: {
        ...mapGetters({
            images: types.IMAGES
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
        this.$store.dispatch(types.UPDATE_IS_LOADING, true);
        this.$store.dispatch(types.OBTAIN_TOKEN, { apiKey: '23567b218376f79d9415' })
        .then((response) => {
            this.fetchImages(this.page);
        })
        .catch((error) => {
            this.$store.dispatch(types.UPDATE_IS_LOADING, false);
        })
    },
    beforeRouteUpdate (to, from, next) {
        this.fetchImages(to.query.page);
        next();
    },
    methods: {
        fetchImages(page) {
            this.$store.dispatch(types.UPDATE_IS_LOADING, true);
            this.$store.dispatch(types.FETCH_IMAGES, page)
            .then((response) => {
                this.page = response.data.page;
                this.pageCount = response.data.pageCount;
                this.$store.dispatch(types.UPDATE_IS_LOADING, false);
            })
            .catch((error) => {
                this.$store.dispatch(types.UPDATE_IS_LOADING, false);
            })
        }
    }
}
</script>

<style lang="scss">
    .theme--light.v-pagination .v-pagination__item.v-pagination__item--active {
        background-color: #FF471A;
    }
    .image-list {
        .image-item{
            height:230px; 
            width: 100%;
            .image-bg {
                background-color: grey;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
            }
        }
    }
</style>