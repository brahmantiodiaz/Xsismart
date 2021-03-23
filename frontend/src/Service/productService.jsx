import axios from 'axios'
import {config} from '../Configure/config'

const productService ={
    getAll : (filter) =>{
        const result = axios.post(config.apiUrl + '/productfilter', filter)
        .then(respon =>{
            return{
                success : respon.data.success,
                result : respon.data.result
            }
        })
        .catch(error => {
            return {
                success:false,
                error:error
            }
        })
        return result
    },
    addData: (data) =>{
        const result=axios.post(config.apiUrl + '/product',data)
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
        const result = axios.get(config.apiUrl + '/product/'+ id)
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
        const result=axios.put(config.apiUrl + '/product',data)
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
        const result=axios.delete(config.apiUrl + '/product/'+id)
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
    countData : () =>{
        const result = axios.get(config.apiUrl + '/productJumlah')
        .then(respon =>{
            return{
                success : respon.data.success,
                result : respon.data.result[0]
            }
        })
        .catch(error => {
            return {
                success:false,
                error:error
            }
        })
        return result
    }
}

export default productService