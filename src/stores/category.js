import { defineStore } from 'pinia'
import axios from 'axios';


export const useCategoryStore = defineStore('category', {
    state: () => ({
        categoryData: []
    }),
    actions: {
        async getAll() {
            try{
                const token = localStorage.getItem('token')
                const result = await axios.get('http://localhost:3001/category/', {
                    headers:{
                        Authorization: token
                    }
                })
                if(result){
                    this.categoryData = result.data
                }
            }
            catch(error){
                console.log('Error fetching category:', error)
            }
        },

        async createData(formData){
           try{
            const token = localStorage.getItem('token')
            const result = await axios.post('http://localhost:3001/category/create', {
                categoryName: formData.name,
                categoryDescription: formData.description,
            }, {
                headers:{
                    Authorization: token
                }
            })
            if(result.status === 200){
                this.getAll()
            }
            
           }catch(e){
            console.log('Error fetching category:', e.emssage)
           }
        },  

        async updateDate(formData) {
            try {
                const token = localStorage.getItem('token')
                const result = await axios.put(`http://localhost:3001/category/update/${formData.category_id}`,{
                    categoryName: formData.name,
                    categoryDescription: formData.description,
                },{
                    headers: {
                        Authorization: token
                    }
                })
                if(result){
                    this.getAll()
                    console.log(result.data)
                }
            }catch(e){
                console.log('Error fetching category:', e.emssage)
            }
        },

        async deleteData(category_id) {
            try{
                const token = localStorage.getItem('token')
                const result = await axios.delete(`http://localhost:3001/category/delete/${category_id}`,{
                    headers: {
                        Authorization : token
                    }
                })
                if(result){
                    this.getAll()
                }
            }catch(e){
                console.log('Error fetching category:', e.emssage)
            }
        }
    }
})