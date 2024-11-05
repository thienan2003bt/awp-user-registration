class UserValidator {
    static async validateRegister(user) { 
        if (!user.email || !user.username || !user.password) {
            return false;
        }

        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
        if (emailRegex.test(user.email) === false) {
            return false;
        }
        return true;
    }

    static async validateLogin(user) { 
        if (!user.email || !user.password) {
            return false;
        }

        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
        if (emailRegex.test(user.email) === false) {
            return false;
        }
        return true;
    }
}

export default UserValidator;