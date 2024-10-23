import express from 'express'
import { createUser, deleteUser, getAllUser, getUserById, updateUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/create', createUser);
router.get('/getalluser', getAllUser);
router.get('/getuser/:id', getUserById);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router