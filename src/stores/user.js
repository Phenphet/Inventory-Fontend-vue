import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
    state: () => ({
        userData: []
    }),
    actions: {
        async getData() {
            try {
                const token = localStorage.getItem('token')
                const result = await axios('http://localhost:3001/user', {
                    headers: {
                        Authorization: token
                    }
                })
                if (result) {
                    this.userData = result.data
                }
            } catch (error) {
                console.error(error.message)
            }

        }
    }
}) 