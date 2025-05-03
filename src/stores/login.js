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
                .then( async (res) => {
                    this.token = await res.data.token
                    await axios.get(`http://localhost:3001/user/verifytoken`, {
                        headers: {
                            Authorization: this.token
                        }
                    })
                    .then((res) => {
                        if (res.status === 200){
                            localStorage.setItem('fullname', res.data.fullname)
                            this.isLogin = true
                        }
                    } )
                    .catch((err) => console.log(err))


                    localStorage.setItem('token', this.token)
                })
                .catch( (err) => console.log(err) )
            }catch(e){
                console.log(e.message)
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
        }
    }
})