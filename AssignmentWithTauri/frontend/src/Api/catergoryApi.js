
import axios from 'axios'
import { Apiurl, headers } from './URLs'

const productUrl = Apiurl.categories
export const GetAllProducts = async () => {
    const jwtCode = sessionStorage.getItem("token")
    const newHeaders = {
        ...headers,
        "Authorization": `Bearer ${jwtCode}`
    }
    console.log(newHeaders)
    const response = await axios.get(
        productUrl,
        {
            headers: {
                "Authorization": `Bearer ${jwtCode}`
            }
        }
    ).catch(err => alert(err));
    return response
}