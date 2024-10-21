import { createStore } from "vuex";
import getUsersModule from "./modules/userModule";
import addUserModule from "./modules/addUserModule.js";
import editUserModule from "./modules/editUserModule";
import todosModule from "./modules/todosModule";
const store = createStore({
  modules: {
    getUsersModule,
    addUserModule,
    editUserModule,
    todosModule,
  },
});

export default store;
