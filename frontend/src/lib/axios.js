import axios from "axios"

export const axiosInstance =axios.create({
    baseURL:"http://localhost:5001/api" , //backendport
    withCredentials:true   //allowing to send cookies in every request
})