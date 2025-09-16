import { defineStore } from 'pinia'
import axios from 'axios'

export const useStockStore = defineStore('stock', {
    state: () => ({
        stockDataIN : null,
        stockDataOUT : null,
        stockDataTranfer: null
    }),
    actions: {
        async getInbound() {
            try{
                const token = localStorage.getItem('token')
                if(token){
                    const inString = 'IN'
                    const result = await axios.get(`http://localhost:3001/stock/movement/${inString}`, {
                        headers: {
                            Authorization: token
                        }
                    })
                    this.stockDataIN = await result.data
                }else{
                    console.log('error token')
                }
            }
            catch(error){
                console.error('Error fetching storck:', error)
            }
        },

        async createInbound(formData) {
            try {
                const token = localStorage.getItem('token')
                const result = await axios.post('http://localhost:3001/stock/create/inbound', {
                    product_id: formData.productID ,
                    movement_date: formData.date,
                    destination_location: formData.dli,
                    quantity: formData.quantity,
                    remarks: formData.remake,
                    reference_number: formData.referenceNumber
                },{
                    headers: {
                        Authorization: token
                    }
                })
                if(result){
                    this.getInbound()
                }
            } catch(error){
                console.error(error.message)
            }
        },

        async updateInbound(formData) {
            try {
                const token = localStorage.getItem('token')
                const result = await axios.put(`http://localhost:3001/stock/update/inbound/${formData.movementId}`, {
                    product_id: formData.productID ,
                    movement_date: formData.date,
                    destination_location: formData.dli,
                    quantity: formData.quantity,
                    remarks: formData.remake,
                    reference_number: formData.referenceNumber
                }, {
                    headers: {
                        Authorization: token
                    }
                })
                if(result){
                    this.getInbound()
                }
            } catch(error){
                console.error(error.message)
            }
        }, 

        async deleteInbound(movementId) {
            try{
                const token = localStorage.getItem('token')
                const result = await axios.delete(`http://localhost:3001/stock/delete/inbound/${movementId}`, {
                    headers: {
                        Authorization: token
                    }
                })
                if(result){
                    this.getInbound()
                }
            } catch(error) {
                console.log(error.message)
            }
        },

        async getOutbound() {
            try{
                const token = localStorage.getItem('token')
                if(token){
                    const inString = 'OUT'
                    const result = await axios.get(`http://localhost:3001/stock/movement/${inString}`, {
                        headers: {
                            Authorization: token
                        }
                    })
                    this.stockDataOUT = await result.data
                }else{
                    console.log('error token')
                }
            }
            catch(error){
                console.error('Error fetching storck:', error)
            }
        },

        async createOutbound(formData) {
            try {
                const token = localStorage.getItem('token')
                const result = await axios.post('http://localhost:3001/stock/create/outbound',{
                    product_id: formData.productID ,
                    movement_date: formData.date,
                    source_location: formData.sli,
                    quantity: formData.quantity,
                    remarks: formData.remake,
                    reference_number: formData.referenceNumber
                },{
                    headers: {
                        Authorization: token
                    }
                })
                if(result) {
                    this.getOutbound()
                }
            } catch(error) {
                console.log(error.message)
            }
        },

        async updateOutbound(formData){
            try {
                const token = localStorage.getItem('token')
                const result = await axios.put(`http://localhost:3001/stock/update/outbound/${formData.movementId}`,{
                    product_id: formData.productID ,
                    movement_date: formData.date,
                    source_location: formData.sli,
                    quantity: formData.quantity,
                    remarks: formData.remake,
                    reference_number: formData.referenceNumber
                },{
                    headers:{
                        Authorization: token
                    }
                })
                if(result){
                    this.getOutbound()
                }
            } catch(error){
                console.log(error.message)
            }
        },

        async deleteOutbound(movementId){
            try { 
                const token = localStorage.getItem('token')
                const result = await axios.delete(`http://localhost:3001/stock/delete/outbound/${movementId}`, {
                    headers: {
                        Authorization: token
                    }
                })
                if(result){
                    this.getOutbound()
                }
            } catch(error) {
                console.log(error.message)
            }
        },
        
        async getTransfer() {
            try{
                const token = localStorage.getItem('token')
                if(token){
                    const inString = 'TRANSFER'
                    const result = await axios.get(`http://localhost:3001/stock/movement/${inString}`, {
                        headers: {
                            Authorization: token
                        }
                    })
                    this.stockDataTranfer = await result.data
                }else{
                    console.log('error token')
                }
            }
            catch(error){
                console.error('Error fetching storck:', error)
            }
        },

        async createTransfer (formData) {
            try {
                const token = localStorage.getItem('token')
                const result = await axios.post('http://localhost:3001/stock/create/tranfer', {
                    product_id: formData.productID ,
                    movement_date: formData.date,
                    source_location: formData.sli,
                    destination_location: formData.dli,
                    quantity: formData.quantity,
                    remarks: formData.remake,
                    reference_number: formData.referenceNumber
                }, {
                    headers: {
                        Authorization: token
                    }
                })
                if(result){
                    this.getTransfer()
                }
            } catch(error) {
                console.log(error.message)
            }
        },

        async updateTransfer(formData){
            try {
                const token = localStorage.getItem('token')
                const result = await axios.put(`http://localhost:3001/stock/update/tranfer/${formData.movementId}`, {
                    product_id: formData.productID ,
                    movement_date: formData.date,
                    source_location: formData.sli,
                    destination_location: formData.dli,
                    quantity: formData.quantity,
                    remarks: formData.remake,
                    reference_number: formData.referenceNumber
                }, {
                    headers: {
                        Authorization: token
                    }
                })
                if(result){
                    this.getTransfer()
                }
            } catch(error) {
                console.log(error.message)
            }
        },

        async deleteTransfer(movementId){
            try {
                const token = localStorage.getItem('token')
                const result = await axios.delete(`http://localhost:3001/stock/delete/tranfer/${movementId}`,{
                    headers: {
                        Authorization: token
                    }
                })
                if(result){
                    this.getTransfer()
                }
            } catch(error) {
                console.log(error.message)
            }
        }
    }
})