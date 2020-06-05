import Gallery from './components/Gallery.vue';
import ImageDetail from './components/ImageDetail.vue';
import Error from './components/Error.vue';

export const routes = [{
        path: '/',
        redirect: { name: 'gallery' }
    },
    {
        path: '/gallery',
        component: Gallery,
        props: (route) => ({ page: route.query.q }),
        name: 'gallery'
    },
    {
        path: '/image/:id',
        component: ImageDetail,
        name: 'image-detail'
    },
    {
        path: '/error',
        component: Error,
        name: 'error'
    },
    {
        path: '*',
        redirect: { name: 'error' }
    }
]