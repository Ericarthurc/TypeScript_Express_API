import { createStore } from "vuex";

import userAPI from "./userAPI";

export default createStore({
  modules: {
    userAPI,
  },
});
