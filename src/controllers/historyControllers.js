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

