import axios from 'axios'
import { Apiurl,headers } from './URLs'
 export const login = async (data)=>{
   console.log(headers)
    const response = await axios.post(Apiurl.login,data,headers).catch(err => console.log(err));
    console.log(response)
    return response
 }
