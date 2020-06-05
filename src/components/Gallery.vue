<template>
    <div v-if="isLoading">
        <div class="flex flex-wrap image-list mt-10 -p-3">
            <div v-for="image in 10" :key="image.id" class="w-1/2 lg:w-1/5">
                <v-sheet
                    :color="`grey darken-2`"
                    class="p-3"
                >
                    <v-skeleton-loader
                    class="mx-auto"
                    max-width="300"
                    type="image"
                    ></v-skeleton-loader>
                </v-sheet>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="flex flex-wrap image-list mt-10 -p-3">
            
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
            console.log(response);
        })
        .catch((error) => {
            this.$store.dispatch(types.UPDATE_IS_LOADING, false);
        })
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