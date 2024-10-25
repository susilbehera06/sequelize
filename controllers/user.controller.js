import Joi from "joi";
import userSchema from '../middlewares/userValidate.middleware.js'
import UserModel from '../models/user.model.js';

const createUser = async (req, res) => {
    try{
        const {error} = userSchema.validate(req.body);
        if(error){
            return res.status(400)
                      .json({
                         success: false,
                         message: error.details[0].message.replace(/"/g, '')
                      });
        }
        
        const user = await UserModel.create(req.body);

        res.status(200)
           .json({
              success: true,
              message: 'User created successfully',
              data: user
           });
    }catch(error){
        console.log(error)
        res.status(500)
           .json({
              success: false,
              message: 'Something went wrong'
           })
    }
}

const getAllUser = async (req, res) => {
    try{
      const user = await UserModel.findAll();
      if(!user){
         return res.status(500)
                     .json({
                        success: false,
                        message: 'No users found'
                     });
      }

      res.status(200)
         .json({
            success: true,
            message: 'All users fetched successfully',
            data: user
         });
    }catch(error){
        console.log(error)
        res.status(500)
           .json({
              success: false,
              message: 'Something went wrong'
           });
    }
}

const getUserById = async (req, res) => {
    try{
      const user = await UserModel.findByPk(req.params.id);
      if(!user){
         return res.status(500)
                     .json({
                        success: false,
                        message: 'User not found'
                     });
      }

      res.status(200)
         .json({
            success: true,
            message: 'All users fetched successfully',
            data: user
         });
    }catch(error){
        console.log(error)
        res.status(500)
           .json({
              success: false,
              message: 'Something went wrong'
           })
    }
}

const updateUser = async (req, res) => {
    try{
      const {error} = userSchema.validate(req.body);
      if(error){
          return res.status(400)
                    .json({
                       success: false,
                       message: error.details[0].message.replace(/"/g, '')
                    });
      }
      
      const user = await UserModel.findByPk(req.params.id);
      if(!user){
         return res.status(500)
                     .json({
                        success: false,
                        message: 'User not found'
                     });
      }
      const updatedUser = await user.update(req.body);
      res.status(200)
         .json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
         });
    }catch(error){
        console.log(error)
        res.status(500)
           .json({
              success: false,
              message: 'Something went wrong',
              error: error
           })
    }
}

const deleteUser = async (req, res) => {
    try{
      const user = await UserModel.findByPk(req.params.id);
      if(!user){
         return res.status(404)
                   .json({
                     success: false,
                     message: 'User not found'
                   });
      }

      await user.destroy();
      res.status(200)
         .json({
            success: true,
            message: 'User deleted successfully',
         });
    }catch(error){
        console.log(error)
        res.status(500)
           .json({
              success: false,
              message: 'Something went wrong'
           })
    }
}

export {
    createUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser
}