import express from "express";
import * as cardController from "../controllers/cardControllers"

const router = express.Router()

// card route
router.post('/card/create', cardController.createCardController)

export default router