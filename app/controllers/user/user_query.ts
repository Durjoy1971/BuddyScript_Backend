import User from "#models/user";

export class UserQueries {
    public static async createUser(userName: string, password: string, email: string, picURL: string) {
        return await User.create({
            userName,
            password,
            email,
            picURL
        })
    }

    public static async findUserByEmail(email: string) {
        return await User.query().where('email', email).first()
    }

    public static async findUserByUserName(userName: string) {
        return await User.query().where('userName', userName).first()
    }

    public static async EmailAlreadyExistOrNot(email: string) {
        return !!await User.query().where('email', email).first()
    }

    public static async UserNameAlreadyExistOrNot(userName: string) {
        return !!await User.query().where('userName', userName).first()
    }

    public static async findUserByEmailAndUserName(email: string, userName: string) {
        return await User.query().where('email', email).andWhere('userName', userName).first()
    }
}