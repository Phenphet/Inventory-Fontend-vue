import { defineStore } from 'pinia'
import axios from 'axios';

export const useWarehouseStore = defineStore('warehouse', {
    state: () => ({
        warehouseData: []
    }),
    actions: {
        async getAll() {
            try {
                const token = localStorage.getItem('token')
                const result = await axios.get('http://localhost:3001/warehouse/', {
                    headers: {
                        Authorization: token
                    }
                })
                this.warehouseData = result.data
            } catch (error) {
                console.error('Error fetching warehouse:', error)
            }
        },
        async createData(formData) {
            try {
                const token = localStorage.getItem('token')
                const result = await axios.post(`http://localhost:3001/warehouse/create`, {
                    location_name: formData.name,
                    location_address: formData.address,
                    location_zone: formData.zone
                }, {
                    headers: {
                        Authorization: token
                    }
                })

                if (result) {
                    console.log('create data warehouse successfulyyy!')
                    this.getAll()
                }
            } catch (e) {
                console.error("Error create warehouse:", e.message)
            }
        },
        async updateData(formData) {
            try {
                const token = localStorage.getItem('token')
                const result = await axios.put(`http://localhost:3001/warehouse/update/${formData.location_id}`, {
                    location_name: formData.name,
                    location_address: formData.address,
                    location_zone: formData.zone
                }, {
                    headers: {
                        Authorization: token
                    }
                })
                if (result) {
                    console.log('update data warehouse successfulyyy!!!')
                    this.getAll()
                }
            } catch (e) {
                console.error("Error updating products:", e.message)
            }
        },
        async deleteData(location_id) {
            try {  
                const token = localStorage.getItem('token')
                const result = await axios.delete(`http://localhost:3001/warehouse/delete/${location_id}`, {
                    headers: {
                        Authorization: token
                    }   
                })
                if(result){
                    console.log('delete data successfulyyy!')
                    this.getAll()
                }

            } catch (e) {
                console.error("Error updating products:", e.message)
            }
        }
    }
})