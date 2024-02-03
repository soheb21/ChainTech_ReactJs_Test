import axios from "axios"
export const register = async (data) => {
    try {
        const res = await axios.post("http://localhost:8000/api/v1/auth/register", data)
        return res;

    } catch (e) {
        if (e) {
            throw e
        }
    }
}
export const login = async (data) => {
    try {
        const res = await axios.post("http://localhost:8000/api/v1/auth/login", data)
        JSON.parse(localStorage.setItem("auth", res.data.data._id))
        return res;

    } catch (e) {
        if (e) {
            throw e
        }
    }
}