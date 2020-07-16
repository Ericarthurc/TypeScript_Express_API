<template>
  <div v-if="store.state.userAPI.loggedIn === null" id="app"></div>
  <div v-else>
    <img alt="Vue logo" src="./assets/logo.png" />
    <router-view />
  </div>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "App",
  setup() {
    const store = useStore();

    onBeforeMount(async () => {
      console.log(["BEFORE MOUNT"]);
      await store.dispatch("userAPI/alreadyLoggedHandler");
    });

    return {
      store
    };
  }
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
  margin: 0;
  padding: 0;
  background: #bada55;
  text-align: center;
}

p {
  margin: 0;
  padding: 0;
  display: block;
}
</style>
