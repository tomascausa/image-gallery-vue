<template>
  <div id="app">
    <app-header></app-header>
    <div class="container mx-auto">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppBar from './components/AppBar.vue';

export default {
  name: 'app',
  components: {
    appHeader: AppBar
  }
}
</script>