import router from "../router";

const state = {
  loggedIn: null,
  loggedUser: [],
};

const mutations = {
  auth_success(state, { user, status }) {
    state.loggedUser = user;
    state.loggedIn = status;
  },

  auth_unsuccessful(state, { status }) {
    state.loggedIn = status;
  },
};

const actions = {
  // GET method to check if user is logged in from cookie
  alreadyLoggedHandler: async ({ commit, state }) => {
    try {
      const response = await fetch("/api/v1/users/me", {
        credentials: "same-origin",
      });
      if (!response.ok) {
        throw Error();
      }
      const userResponse = await response.json();
      commit("auth_success", { user: userResponse.data, status: true });
      console.log("LOGGED ACTION");
      router.push("/main");
    } catch (error) {
      commit("auth_unsuccessful", { status: false });
      router.push("/");
      console.log(error);
    }
  },

  // POST method for login
  loginHandler: async ({ commit, state }, { username, password }) => {
    try {
      const response = await fetch("/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (!response.ok) {
        throw Error();
      }
      const userResponse = await response.json();
      console.log(userResponse);
      commit("auth_success", { user: userResponse.user, status: true });
      router.push("/main");
    } catch (error) {
      console.log(error);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
