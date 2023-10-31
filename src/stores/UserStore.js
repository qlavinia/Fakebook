import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('UserStore',
    {
        state: () => ({
            token: null,
            username: null
        }),
        actions: {
            async setUserDetails(res) {
                    this.$state.token = res.data.token,
                    this.$state.username = res.data.username
            },

            // async fetchUser() {
            //     let res = await axios.get('https://localhost:7190/api/account/getUser' + this.$state.id)
            //         this.$state.username = res.data.username
            // },

            clearUser() {
                this.$state.id = null,
                    this.$state.token = null,
                    this.$state.username = null
            },

        },
        persist: true
    })
