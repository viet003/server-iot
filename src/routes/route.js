import express from "express";
import * as authController from "../controllers/authControllers"
import * as userController from "../controllers/userControllers"
import * as cardController from "../controllers/cardControllers"
import * as historyController from "../controllers/historyControllers"

const router = express.Router()

// auth route
router.post('/auth/login', authController.loginController)
router.post('/auth/register', authController.registerController)
router.post('/auth/changepass', authController.changePassWordController)

// user route
router.get('/user', userController.getAllUsersController)
router.post('/user/id', userController.getUserByIdController)
router.post('/user/update', userController.updateUserController)
router.post('/user/delete', userController.deleteUserController)

// card route
router.get('/card', cardController.getAllCardController)
router.get('/card/noac', cardController.getCardWithoutAccountController)
router.post('/card/add', cardController.createCardController)
router.post('/card/update', cardController.updateCardController)
router.post('/card/delete', cardController.deleteCardController)


// history route
router.get('/history', historyController.getHistoryController)

export default router