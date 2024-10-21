
const editUserModule = {
  namespaced: true,
  state: {
    user: null,
    updateUser : null,
    loading: false,
    error: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setError(state, error) {
      state.error = error;
    },
    setUpdateUser(state, updateUser) {
      state.setUpdateUser = updateUser;
    }
  },

  actions: {
    async fetchUserById({ commit }, userId) {
      commit("setLoading", true);
      commit("setError", null);
      try {
        const request = await fetch(
          `https://freetestapi.com/api/v1/users/${userId}`
        );
        const response = await request.json();
        console.log('API Response:', response);
        switch (true) {
          case !response:
            throw new Error("Invalid Data Format");
          default:
            commit("setUser", response);
        }
      } catch (error) {
        commit("setError", error.message || "Network Error");
      } finally {
        commit("setLoading", false);
      }
    },

    async updateUser({commit}, user) {
      commit('setLoading', true);
      commit('setError', null);
      try {
        const request = await fetch(`https://freetestapi.com/api/v1/users/${user.id}`, {
          method : 'PUT',
          headers : {
            'Content-Type': 'application/json',
          },
          body : JSON.stringify(user)
        });
        const response = request.json();
        switch(true) {
          case !response :
            throw new Error('Invalid Data Format');
            default : 
            commit('setUpdateUser', response);
        }
      }
      catch (error) {
        commit('setError', error.message || 'Network Error');
      }
      finally {
        commit('setLoading', false);
      }
    }
  },

  getters: {
    user: (state) => state.user,
    updateUser : (state) => state.updateUser,
    loading: (state) => state.loading,
    error: (state) => state.error,
  },
};
export default editUserModule;
