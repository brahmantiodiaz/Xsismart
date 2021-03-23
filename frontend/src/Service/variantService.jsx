import axios from 'axios'
import { config } from '../Configure/config'

const variantService ={
    getAll : () => {
        const result = axios.get(config.apiUrl + '/variant')
        .then(respon => {
            return{
                success : respon.data.success,
                result : respon.data.result
            }
        })
        .catch(error => {
            return {
                success :false,
                error : error
            }
        })
        return result
    },
    addData: (data) =>{
        const result=axios.post(config.apiUrl + '/variant',data)
        .then(respon =>{
            return{
                success : respon.data.success,
                result : respon.data.result
            }
        })
        .catch(error => {
            return {
                success :false,
                error : error
            }
        })
        return result
    },
    getById : (id) =>{
        const result = axios.get(config.apiUrl + '/variant/'+ id)
        .then(respon => {
            return{
                success : respon.data.success,
                result : respon.data.result[0]
            }
        })
        .catch(error => {
            return {
                success :false,
                error : error
            }
        })
        return result
    },
    editData: (data) =>{
        const result=axios.put(config.apiUrl + '/variant',data)
        .then(respon =>{
            return{
                success : respon.data.success,
                result : respon.data.result
            }
        })
        .catch(error => {
            return {
                success :false,
                error : error
            }
        })
        return result
    },
    deleteData: (id) =>{
        const result=axios.delete(config.apiUrl + '/variant/'+id)
        .then(respon =>{
            return{
                success : respon.data.success,
                result : respon.data.result
            }
        })
        .catch(error => {
            return {
                success :false,
                error : error
            }
        })
        return result
    },
    getByCategoryId : (id) =>{
        const result = axios.get(config.apiUrl + '/variantcategory/'+ id)
        .then(respon => {
            return{
                success : respon.data.success,
                result : respon.data.result
            }
        })
        .catch(error => {
            return {
                success :false,
                error : error
            }
        })
        return result
    }
}

export default variantService