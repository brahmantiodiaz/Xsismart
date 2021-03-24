import axios from 'axios'
import { config } from '../Configure/config'

const orderService ={
    getPay : () =>{
        const result = axios.get(config.apiUrl + '/payment')
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
        console.log(data)
        const result=axios.post(config.apiUrl + '/order',data)
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
    }
}

export default orderService