import { defineStore } from 'pinia'
import axios from 'axios';

export const useLoginStore = defineStore('login', {
    state: () => ({
        token: null,
        isLogin: false
    }),
    actions: {
        async login(fromData){
            try{
                await axios.post(`http://localhost:3001/user/login/`, {
                   email: fromData.email,
                   password: fromData.password
                })
                .then((res) => {
                    localStorage.setItem('token', res.data.token)
                    this.isLogin = true
                })
                .catch( (err) => console.log(err) )
            }catch(e){
                console.error(e.message)
            }
        },
        logout() {
            try{
                if(localStorage.getItem('token') !== null){
                    localStorage.removeItem('token')
                    localStorage.removeItem('fullname')
                    this.dataUser.fullname = ''
                    this.dataUser.role = ''
                    this.isLogin = false
                }else{
                    console.log('check localStorage')
                }
            }catch(e){
                console.log(e.message)
            }
        },

        async chechLogin(token) {
            try{
                const result = await axios.get('http://localhost:3001/user/verifytoken', {
                    headers: {
                        Authorization: token
                    }
                })
                
                if(result.status === 200){
                    this.isLogin = true
                    return true
                }else{
                    localStorage.removeItem('token')
                    return false
                }
               
            }catch (e) {
                localStorage.removeItem('token')
                return false
            }
        }

    }
})