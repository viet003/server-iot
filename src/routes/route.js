import express from "express";
import * as cardController from "../controllers/cardControllers"
import * as historyController from "../controllers/historyControllers"

const router = express.Router()

// card route
router.post('/card/create', cardController.createCardController)

// history route
router.get('/history', historyController.getHistoryController)

export default router