import axios from '../configs/axios.config';

class UserService {
    static async registerUser(user) { 
        return await axios.post("/user/register", user);
    }

    static async loginUser(user) {
        return await axios.post("/user/login", user);
    }

    static async getUserProfile() {
        return await axios.get("/user/profile");
    }
}

export default UserService;