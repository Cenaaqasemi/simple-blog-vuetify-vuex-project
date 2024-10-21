import { fetchRetryLimited, validateUser } from "@/api/api";
const getUsersModule = {
  state: {
    users: [],
    loading: false,
    error: null,
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      commit("setLoading", true);
      commit("setError", null);
      try {
        const request = await fetchRetryLimited(
          "https://freetestapi.com/api/v1/users",
          {
            headers: {
              "Content-Type": "application/json",
              // 'Authorization': 'token-authentication'
            },
          }
        );
        const response = await request.json();
        if (!validateUser(response)) {
          throw new Error("Invalid Data Format");
        }
        commit("setUsers", response);
      } catch (error) {
        commit("setError", error.message || "Network Error");
      } finally {
        commit("setLoading", false);
      }
    },
  },
  getters: {
    allUsers: (state) => state.users,
    loading: (state) => state.loading,
    error: (state) => state.error,
  },
};
export default getUsersModule;