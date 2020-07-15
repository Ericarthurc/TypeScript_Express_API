import { createStore } from 'vuex';

const state = {
  count: 0,
  loggedIn: false,
  loggedUser: [],
};

const mutations = {
  increment(state) {
    state.count++;
  },

  auth_success(state, { user, status }) {
    state.loggedUser = user;
    state.loggedIn = status;
  },
};

const actions = {
  // GET method to check if user is logged in from cookie
  alreadyLoggedHandler: async ({ commit, state }) => {
    try {
      const response = await fetch('/api/v1/users/me', {
        credentials: 'same-origin',
      });
      if (!response.ok) {
        throw Error();
      }
      const userResponse = await response.json();
      commit('auth_success', { user: userResponse.data, status: true });
    } catch (error) {
      console.log(error);
    }
  },

  // POST method for login
  loginHandler: async ({ commit, state }, { username, password }) => {
    try {
      const response = await fetch('/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (!response.ok) {
        throw Error();
      }
      console.log(await response.json());
      state.loggedIn = true;
    } catch (error) {
      console.log(error);
    }
  },
};

export default createStore({
  state,
  mutations,
  actions,
});
