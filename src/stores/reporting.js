import { defineStore } from 'pinia'
import axios from 'axios'

export const useReportingStore = defineStore('reporting', {
    state: () => ({
        reportOut: []
    }),
    actions: {
        async getReport(){
            try{
                const token = localStorage.getItem('token')
                const result = await axios.get('http://localhost:3001/report/reportstock', {
                    headers: {
                        Authorization: token
                    }
                })
                if(result) {
                    console.log(result.data)
                    this.reportOut = result.data
                }
            } catch (error) {
                console.error(error.message)
            }
        }
    }
})