import {defineStore} from 'pinia'
import axios from 'axios'

export const useDasbordStore = defineStore('dasbord', {
    state: ()=> ({
        stockInData: [],
        stockOutData: [],
        recentStock: [],
        curentStock: []
    }),
    actions: {
        async getChartData (){
            try {
                const token = localStorage.getItem('token')
                const result = await axios.get('http://localhost:3001/dasbord/chartdata', {
                    headers: {
                        Authorization: token
                    }
                })
                if(result){
                    this.stockInData = result.data.stockIn
                    this.stockOutData = result.data.stockOut
                }
            } catch(e) {
                console.error(e.message)
            }
        },
        async getRecentStock(){
            // http://localhost:3001/dasbord/recentstock
            try {
                const token = localStorage.getItem('token')
                const result = await axios.get('http://localhost:3001/dasbord/recentstock', {
                    headers: {
                        Authorization: token
                    }
                })
                if(result){
                    this.recentStock = result.data
                }
            } catch(e){
                console.error(e.message)
            }
        },
        async getCurentstock() {
            try{
                const token = localStorage.getItem('token')
                const result = await axios.get('http://localhost:3001/dasbord/curentstock', {
                    headers: {
                        Authorization: token
                    }
                })
                if(result) {
                    this.curentStock = result.data
                }
            }catch(e){
                console.error(e.message)
            }
        }
    }
})