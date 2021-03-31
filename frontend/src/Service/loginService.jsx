import axios from 'axios'
import { config } from '../Configure/config'

const userService ={
    getAll : () => {
        const result = axios.get(config.apiUrl + '/user')
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
    cekUser : (data) => {
        const result = axios.post(config.apiUrl + '/Cekuser', data)
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
    addData: (data) =>{
        const result=axios.post(config.apiUrl + '/user',data)
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
    getEmail : (email) =>{
        const result = axios.get(config.apiUrl + '/user/'+ email)
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
    }


}

export default userService