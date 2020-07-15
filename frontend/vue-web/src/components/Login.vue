<template>
  <div>
    <h1>Login Vue</h1>
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
    <button type="button" v-on:click="login()">Login</button>
    <button type="button" v-on:click="getMe()">GetMe</button>
  </div>
</template>

<script>
import { reactive } from 'vue';
// import axios from 'axios';

export default {
  setup() {
    const input = reactive({
      username: '',
      password: '',
    });

    async function login() {
      const response = await fetch('/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: input.username,
          password: input.password,
        }),
      });
      console.log(await response.json());
    }

    async function getMe() {
      const response = await fetch('/api/v1/users/me', {
        credentials: 'same-origin',
      });
      console.log(await response.json());
    }

    // onBeforeMount(async () => {
    //   const users = await axios.get(`/api/v1/users`);
    //   console.log(users);
    //   usersDatabase.value = users.data.data;
    //   isLoaded.value = true;
    // });

    return {
      input,
      login,
      getMe,
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
