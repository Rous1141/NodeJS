const baseURL = "http://localhost:3002"
export const Apiurl ={
    categories: baseURL+"/api/category",
    login: baseURL+"/api/login",
    register: baseURL+"/api/register"  // replace with your API endpoint for comments
} 

export const headers ={
    "Content-Type": "application/json",
    // Add headers such as Authorization if required
    // 'Authorization': 'Bearer your-token',
} 
