import Joi from "joi";

const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    age: Joi.number().integer().min(0).required(),
    mobileNumber: Joi.string().required(),
    isActive: Joi.boolean().default(true)
});

export default userSchema