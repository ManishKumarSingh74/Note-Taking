import axios from "axios";

const backendUrl = axios.create({
    baseURL:"https://note-taking-backend-hzac.onrender.com/"
})

export default backendUrl
