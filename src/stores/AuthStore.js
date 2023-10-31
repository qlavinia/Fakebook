import { defineStore } from 'pinia'

export const useAuthStore = defineStore("AuthStore",
    {
        state: () => ({
            user: null
        }),
        actions: {
            async setUserDetails(result) {
                if (result && result.username && result.token) {
                    this.user = { 
                        userId:result.id, 
                        username: result.username, 
                        token: result.token,
                        name: result.name
                    };
                } else {
                    console.error('Invalid result object:', result);
                }
            },
            clearUser() {
                this.$state.user = null;
            },

        },
        getters: {
            isAuthenticated: state => state.user != null ? true : false,
            userId : state =>  state.user!= null ? state.user.userId : -1,
            name: state => state.user != null ? state.user.name : ''
          },
        persist: true
    })   
