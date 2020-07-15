<template>
  <div>
    <h1>Login Vue</h1>
    {{ store.state.count }}
    {{ store.state.loggedIn }}
    <div v-if="store.state.loggedIn">
      <p v-for="i in user" :key="i._id">{{ i.username }} {{ i.password }}</p>
    </div>

    <button @click="increment()">+</button>
    <input
      type="text"
      name="username"
      v-model="input.username"
      placeholder="Username"
    />
    <input
      type="password"
      name="password"
      v-model="input.password"
      placeholder="Password"
    />
    <button type="button" @click="login()">Login</button>
    <button type="button" @click="getMe()">GetMe</button>
  </div>
</template>

<script>
import { reactive, computed, onBeforeMount, ref } from 'vue';
// import axios from 'axios';
import { useStore } from 'vuex';

export default {
  setup() {
    const input = reactive({
      username: '',
      password: '',
    });

    const store = useStore();
    const user = ref(store.loggedUser);

    function login() {
      store.dispatch('loginHandler', {
        username: input.username,
        password: input.password,
      });
    }

    function increment() {
      store.commit('increment');
    }

    async function getMe() {
      const response = await fetch('/api/v1/users/me', {
        credentials: 'same-origin',
      });
      console.log(await response.json());
    }

    onBeforeMount(() => {
      store.dispatch('alreadyLoggedHandler');
    });

    return {
      input,
      login,
      getMe,
      store,
      increment,
      user,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
input {
  width: 300px;
  height: 35px;
  border: 1px solid #ccc;
  background: #fff;
}

button {
  width: 300px;
  height: 35px;
  background: #5995ef;
  color: #fff;
  border-radius: 3px;

  &:hover {
    background: #bada55;
  }

  &:focus {
    background: #da5555;
  }
}
</style>
