import axios from "axios";
export const getUserInfo = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/v1/userInfo/${id}`)
        return response.data;

    } catch (error) {
        if (error) {
            throw error
        }

    }
}

export const createUserInfo = async (data) => {
    try {
        const response = await axios.post("http://localhost:8000/api/v1/userInfo", data)
        return response.data;

    } catch (error) {
        if (error) {
            throw error
        }

    }
}
export const editUserInfo = async (data) => {
    try {
        const response = await axios.patch(`http://localhost:8000/api/v1/userInfo/${data.id}`, data)
        return response.data;

    } catch (error) {
        if (error) {
            throw error
        }

    }
}
export const deleteUserInfo = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8000/api/v1/userInfo/${id}`,)
        return response.data;

    } catch (error) {
        if (error) {
            throw error
        }

    }
}