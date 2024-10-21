import { fetchRetryLimited, validateUser } from "@/api/api";
const addUserModule = {
  state: {
    error: null,
    loading: false,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    async addNewUser({ commit }, user) {
      commit("setLoading", true);
      commit("setError", null);
      // ? Validation
      const nameRegex = /^[a-zA-Z\s]+$/;
      const usernameRegex = /^[a-zA-Z0-9]+$/;
      const emailRegex = /.+@.+\..+/;
      const phoneRegex = /^\d{10}$/;
      const ageRegex = /^\d+$/;
      let validationError = "";

      switch (true) {
        case !nameRegex.test(user.name):
          validationError = "Invalid name";
          break;
        case !usernameRegex.test(user.username):
          validationError = "Invalid Email";
          break;
        case !emailRegex.test(user.email):
          validationError = "Invalid Email";
          break;
        case !phoneRegex.test(user.phone):
          validationError = "Invalid Phone";
          break;
        case !ageRegex.test(user.age):
          validationError = "Invalid Age";
          break;
      }
      switch (true) {
        case !validationError:
          commit("setError", validationError);
          commit("setLoading", false);
          return;
        default:
          try {
            const request = await fetchRetryLimited(
              "https://freetestapi.com/api/v1/users",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
              }
            );
            const response = await request.json();
            if (!validateUser(response)) {
              throw new Error("Invalid Response Data");
            }
          } catch (error) {
            // Handle success response
            commit("setError", error.message);
          } finally {
            commit("setLoading", false);
          }
      }
    },
  },
};
export default addUserModule;