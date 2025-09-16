import { defineStore } from 'pinia'
import axios from 'axios';

export const useProductStore = defineStore('product', {
    state: () => ({
        isLogin: false,
        productData: [],
        productSummary: []
    }),
    actions: {
        async getSummary(){
            try { 
                const token = localStorage.getItem('token')
                const result = await axios.get ('http://localhost:3001/product/summary', {
                    headers: {
                        Authorization: token
                    }
                })
                if(result){
                    this.productSummary = result.data
                }
            } catch(error) {
                console.log(error.message)
            }
        },

        async getAll() {
            try {
                const token = localStorage.getItem('token')
                if (token) {
                    const result = await axios.get('http://localhost:3001/product/', {
                        headers: {
                            Authorization: token
                        }
                    })
                    this.productData = result.data
                } else {
                    console.log('error: undefined token ')
                }
            }
            catch (e) {
                localStorage.removeItem("token")
                console.error('Error fetching products:', e.message)
            }
        },

        async createData(Formdata) {
            try {
                const token = localStorage.getItem('token')
                if (token) {
                    const result = await axios.post('http://localhost:3001/product/create', {
                        product_name: Formdata.product_name,
                        procuct_description: Formdata.product_description,
                        category_id: Formdata.category,
                        quantity: Formdata.quantity,
                        unit: Formdata.unit,
                        location_id: Formdata.location,
                        reorder_level: Formdata.level
                    }, {
                        headers: {
                            Authorization: token
                        }
                    })
                    if (result.status === 200) {
                       this.getAll()
                    }
                    else {
                        console.log(result.data.error)
                    }
                } else {
                    console.log('error: undefined token ')
                }
            } catch (e) {
                console.error("Error creating products:", e.message)
            }
        },

        async updateDate(Formdata) {
            try {
                const token = localStorage.getItem('token')
                const result = await axios.put(`http://localhost:3001/product/update/${Formdata.product_id}`, {
                    product_name: Formdata.product_name,
                    procuct_description: Formdata.product_description,
                    category_id: Formdata.category,
                    quantity: Formdata.quantity,
                    unit: Formdata.unit,
                    location_id: Formdata.location,
                    reorder_level: Formdata.level
                }, {
                    headers: {
                        Authorization: token
                    }
                })
                if(result){
                    this.getAll()
                }
                
            } catch (e) {
                console.error("Error updating products:", e.message)
            }
        },

        async deleteData(product_id) {
            try {
                const token = localStorage.getItem('token')
                const result = await axios.delete(`http://localhost:3001/product/delete/${product_id}`, {
                    headers: {
                        Authorization: token
                    }

                })
                if(result){
                    this.getAll()
                }             
            } catch (e) {
                console.error('Error deleting products:', e.message)
            }
        }
    }
})
