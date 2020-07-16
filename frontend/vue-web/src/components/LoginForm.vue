<template>
  <div>
    <div class="login_form">
      <input type="text" name="username" v-model="input.username" placeholder="Username" />
      <input type="password" name="password" v-model="input.password" placeholder="Password" />
      <button type="button" @click="login()">Login</button>
      <button type="button" @click="getMe()">GetMe</button>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const input = reactive({
      username: "",
      password: ""
    });

    async function login() {
      try {
        await store.dispatch("userAPI/loginHandler", {
          username: input.username,
          password: input.password
        });
        input.username = "";
        input.password = "";
      } catch (error) {
        console.log(error);
      }
    }

    async function getMe() {
      const response = await fetch("/api/v1/users/me", {
        credentials: "same-origin"
      });
      console.log(await response.json());
    }

    return {
      input,
      login,
      getMe,
      store
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login_form {
  display: flex;
  flex-direction: column;
  align-items: center;

  * {
    margin: 5px 0px;
  }
}

input {
  width: 300px;
  height: 35px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
  padding: 0px 10px;
  outline: none;

  &:hover {
    border: 1px solid #35495e;
  }
}

button {
  width: 300px;
  height: 35px;
  background: #41b883;
  color: #fff;
  border: none;
  border-radius: 6px;
  outline: none;

  &:hover {
    background: #35495e;
  }

  &:focus {
    background: #35495e;
    border: none;
  }
}
</style>
