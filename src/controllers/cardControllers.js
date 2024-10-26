import * as cardService from "../services/cardServices"

// tạo thẻ
export const createCardController = async (req, res) => {
    const { id, type } = req.body;

    try {
        if (!id || !type) {
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