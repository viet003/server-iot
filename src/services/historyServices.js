import { where } from "sequelize";
import db from "../models";

export const getAllHistoriesService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.History.findAll({
            include: [
                {
                    model: db.Card,
                    attributes: ['type'],
                    as: 'card',
                    include: [
                        {
                            model: db.User,
                            as: "users",
                            attributes: ['user_name']
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

// lay ra lich su theo card
export const getAllHistorieByIdService = ({ card_id }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.History.findAll({
            where: { card_id }
        });

        resolve({
            err: response.length ? 0 : 2,
            msg: response.length ? 'Lấy dữ liệu thành công!' : 'Không có dữ liệu trong bảng History.',
            data: response
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
export const createHistory = async (card_id, status) => {
    try {
        const response = await db.History.create({
            card_id: card_id,
            status: status,
            time: new Date() // Lấy thời gian hiện tại để lưu vào cột `time`
        });

        return response;
    } catch (error) {
        console.error("Lỗi tạo lịch sử:", error);
        throw (error)
    }
};


// Lấy bản ghi gần nhất theo card_id từ bảng History
export const getLatestHistoryWithCardType = async (card_id) => {
    try {
        const response = await db.History.findOne({
            where: { card_id },
            order: [['time', 'DESC']], // Sắp xếp theo time giảm dần để lấy bản ghi mới nhất
            include: [
                {
                    model: db.Card,
                    as: 'card',
                    attributes: ['type'], // Chỉ lấy trường type từ bảng Card
                }
            ]
        });

        return response;
    } catch (error) {
        throw error;
    }
};
