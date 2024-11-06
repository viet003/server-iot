import * as cardService from "../services/cardServices"

// tạo thẻ
export const createCardController = async (req, res) => {
    const { id, type } = req.body;

    try {
        if (!id || type < 0) {
            return res.status(400).json({
                err: 1,
                msg: "Thiếu dữ liệu đầu vào!"
            })
        }
        const rs = await cardService.createCardService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// tạo thẻ
export const updateCardController = async (req, res) => {
    const { id, type } = req.body;

    try {
        if (!id || type < 0) {
            return res.status(400).json({
                err: 1,
                msg: "Thiếu dữ liệu đầu vào!"
            })
        }
        const rs = await cardService.updateCardService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// xóa thẻ
export const deleteCardController = async (req, res) => {
    const { id } = req.body;

    try {
        if (!id) {
            return res.status(400).json({
                err: 1,
                msg: "Thiếu dữ liệu đầu vào!"
            })
        }
        const rs = await cardService.deleteCardService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// lấy thẻ
export const getAllCardController = async (req, res) => {
    try {
        const rs = await cardService.getAllCardsService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// lay ra tat ca the chua co user
export const getCardWithoutAccountController  = async (req, res) => {
    try {
        const rs = await cardService.getCardWithoutAccountService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}