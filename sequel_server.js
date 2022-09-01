import {Sequelize, Model, DataTypes} from 'sequelize';

let sequelize = new Sequelize('sqlite::memory:');

let User = sequelize.define('User', {
    username: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    password: DataTypes.STRING
});

async function main() {
    // Error: SQLITE_ERROR: no such table: Users
    await sequelize.sync();

    await User.create({
        username: "janedoe",
        birthday: new Date(1997, 5, 1),
        password: "danejoe"
    });

    const users = await User.findAll();

    return users;
}

console.log(main());
