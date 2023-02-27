const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const bcrypt = require('bcrypt')


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        max: [60, 'ユーザー名は最大60文字までです']
    },
    email: {
        type: String,
        required: true,
        lowercase: true, //小文字
        unique: true, //同一アドレスがあってはならないので、
        max: [60, 'メールアドレスは最大60文字までです']
    },
    password: {
        type: String,
        required: true,
        min: [6, 'パスワードは6文字以上入力してください'],
        max: [30, 'パスワードは最大30文字までです'],
    }

})

UserSchema.methods.hasSamePassword = function (inputPassword) {
    const user = this
    return bcrypt.compareSync(inputPassword, user.password)
}



UserSchema.pre('save', function (next) {   //saveする前にfunctionを走らせる。

    const user = this  //this = UserSchemaのこと。
    const saltRounds = 10  //1秒で10個Hashを作る
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash
            next()  //functionが走ったらsaveが走る。
        })
    })

})


module.exports = mongoose.model('User', UserSchema)
