import * as historyService from "../services/historyServices"

// lấy lịch sử gửi xe
export const getHistoryController = async (req, res) => {
    try {
        const rs = await historyService.getAllHistoriesService();
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}


// lấy lịch sử gửi xe
export const getHistoryByIdController = async (req, res) => {
    const { card_id } = req.body;
    try {
        if (!card_id) {
            return res.status(400).json({
                err: 1,
                msg: "Thiếu dữ liệu đầu vào!"
            })
        }
        const rs = await historyService.getAllHistorieByIdService(req.body);
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}
