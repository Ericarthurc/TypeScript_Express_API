<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Login />
  </div>
</template>

<script>
import Login from './components/Login.vue';

export default {
  name: 'App',
  components: {
    Login,
  },
};
</script>

<style>
html {
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-tap-highlight-color: transparent;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  background: #bada55;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
