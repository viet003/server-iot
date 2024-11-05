import express from "express";
import * as authController from "../controllers/authControllers"
import * as userController from "../controllers/userControllers"
import * as cardController from "../controllers/cardControllers"
import * as historyController from "../controllers/historyControllers"

const router = express.Router()

// auth route
router.post('/auth/login', authController.loginController)
router.post('/auth/register', authController.registerController)

// user route
router.get('/user', userController.getAllUsersController)
router.post('/user/id', userController.getUserByIdController)
router.post('/user/update', userController.updateUserController)

// card route
router.post('/card/create', cardController.createCardController)
router.post('/card/delete', cardController.deleteCardController)
router.get('/card/get', cardController.getAllCardController)


// history route
router.get('/history', historyController.getHistoryController)

export default router