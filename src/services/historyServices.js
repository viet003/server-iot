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
