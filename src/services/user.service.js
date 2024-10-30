import axios from '../configs/axios.config';

class UserService {
    static async registerUser(user) { 
        return await axios.post("/user/register", user);
    }
}

export default UserService;