import db from "../models";

export const getAllHistoriesService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.History.findAll({
            include: [
                {
                    model: db.Card,
                    attributes: ['type'],
                    include: [
                        {
                            model: db.User,
                            attributes: ['username']
                        }
                    ]
                }
            ]
        });

        resolve({
            sender: "react",
            type: "get_data",
            body: {
                err: response.length ? 0 : 2,
                msg: response.length ? 'Lấy dữ liệu thành công!' : 'Không có dữ liệu trong bảng History.',
                data: response
            }
        });
    } catch (error) {
        reject({
            err: 2,
            msg: 'Lỗi khi lấy dữ liệu từ bảng History!',
            error: error.message
        });
    }
});

// Tạo một bản ghi mới trong bảng History
export const createHistory = async (cardId, status) => {
    try {
        const response = await db.History.create({
            cardId: cardId,
            status: status,
            time: new Date() // Lấy thời gian hiện tại để lưu vào cột `time`
        });

        return response;
    } catch (error) {
        console.error("Lỗi tạo lịch sử:", error);
        throw(error)
    }
};


// Lấy bản ghi gần nhất theo cardId từ bảng History
export const getLatestHistoryWithCardType = async (cardId) => {
    try {
        const response = await db.History.findOne({
            where: { cardId },
            order: [['time', 'DESC']], // Sắp xếp theo time giảm dần để lấy bản ghi mới nhất
            include: [
                {
                    model: db.Card,
                    attributes: ['type'], // Chỉ lấy trường type từ bảng Card
                }
            ]
        });

        return response;
    } catch (error) {
        throw error;
    }
};
