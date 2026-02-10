import axios from "axios";

const backendUrl = axios.create({
    baseURL:"http://localhost:3000/api/note/"
})

export default backendUrl