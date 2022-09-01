import {Sequelize, Model, DataTypes} from 'sequelize';

let sequelize = new Sequelize('sqlite::memory:');

let User = sequelize.define('User', {
    username: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    password: DataTypes.STRING
});

async function main() {
    // Error: SQLITE_ERROR: no such table: Users
    await User.sync();

    await User.create({
        username: "janedoe",
        birthday: new Date(1997, 5, 1),
        password: "danejoe"
    });

    return await User.findAll();
}
let userList = main()
console.log(userList);
