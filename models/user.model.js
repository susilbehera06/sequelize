import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'
import bcrypt from 'bcrypt'

const UserModel = sequelize.define('users', {
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    },
    mobileNumber: {
        type: DataTypes.STRING
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    hooks: {
        // Hash the password before creating a new user
        beforeCreate: async (user) => {
            if (user.password) {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword; // Store hashed password
            }
        },
        // Hash the password before updating an existing user (if password is modified)
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword; // Store hashed password
            }
        }
    }
});

export default UserModel