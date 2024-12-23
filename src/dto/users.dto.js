class UserDto {
    constructor (user) {
        this.first_name = user.first_name,
        this.last_name = user.last_name,
        this.full_name = `${user.first_name} ${user.last_name}`
        this.user_name = user.user_name,
        this.email = user.email,
        this.password = user.password,
        this.phone = user.phone
    }
}

export {
    UserDto
}