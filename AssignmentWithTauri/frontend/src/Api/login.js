import axios from 'axios'
import { Apiurl,headers } from './URLs'
 export const login = async (data)=>{
    const response = await axios.post(Apiurl.login,data,headers).catch(err => alert(err));
    console.log(response)
    return response
 }
