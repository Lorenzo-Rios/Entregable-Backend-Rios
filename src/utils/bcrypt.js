import bcrypt from 'bcrypt'

const createHash = password => bcrypt.hashSync (password, bcrypt.genSaltSync(10))

const isValidPassword = (passwordBody, userPassword) => bcrypt.compareSync(passwordBody, userPassword)


export {
    bcrypt
}