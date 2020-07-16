<template>
  <div>
    <p>{{ store.state.userAPI.loggedUser.username }}</p>
  </div>
</template>

<script>
import {} from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    return {
      store
    };
  }
};
</script>

<style>
</style>