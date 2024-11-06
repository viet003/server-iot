import db from "../models";

// tạo the
export const createCardService = async ({ id, type }) => {
    try {
        const response = await db.Card.create({
            id,
            type,
            createdAt: new Date(),  // Đảm bảo có giá trị cho createdAt
            updatedAt: new Date()    // Đảm bảo có giá trị cho updatedAt
        });

        return {
            err: response ? 0 : 2,
            msg: response ? 'Thành công!' : 'Không thành công.'
        };
    } catch (error) {
        throw error;
    }
};

// update the
export const updateCardService = ({ id, type }) =>
    new Promise(async (resolve, reject) => {
        try {
            // Cập nhật bản ghi thông tin dựa trên id
            const response = await db.Card.update(
                { type },
                {
                    where: { id },
                }
            );

            resolve({
                err: response[0] ? 0 : 2,
                msg: response[0] ? 'Cập nhật thông tin thành công!' : 'Không tìm thấy thông tin để cập nhật.',
            });
        } catch (error) {
            reject({
                err: 1,
                msg: 'Lỗi khi cập nhật thông tin!',
                error: error,
            });
        }
    });



// xóa the
export const deleteCardService = async ({ id }) => {
    try {
        const response = await db.Card.destroy({
            where: {
                id
            }
        })
        return {
            err: response ? 0 : 2,
            msg: response ? 'Xóa thành công!' : 'Xóa không thành công.'
        }
    } catch (error) {
        throw (error)
    }
}

// kiểm tra thẻ
export const checkCardService = async (id) => {
    try {
        const response = await db.Card.findOne({
            where: { id }
        });

        return response;
    } catch (error) {
        throw error;
    }
};

// lay ra tat ca the
export const getAllCardsService = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Card.findAll({
                raw: true, // Trả về dữ liệu dưới dạng object đơn giản
            });

            resolve({
                err: response.length ? 0 : 1,
                msg: response.length ? 'Lấy dữ liệu thành công!' : 'Không có dữ liệu trong bảng cards.',
                data: response,
            });
        } catch (error) {
            reject({
                err: 1,
                msg: 'Lỗi khi lấy dữ liệu từ bảng cards!',
                error: error.message,
            });
        }
    });

// Lấy ra tất cả thẻ chưa có user
export const getCardWithoutAccountService = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Card.findAll({
                include: [
                    {
                        model: db.User,
                        as: 'users',  // Use the alias defined in the association
                        required: false, // This makes the join a LEFT OUTER JOIN
                    }
                ],
                where: {
                    '$users.id$': null // Condition to filter cards with no associated user
                },
                raw: true, // Return data in a plain object format
            });

            resolve({
                err: response.length ? 0 : 1,
                msg: response.length ? 'Lấy danh sách nhân viên thành công!' : 'Không có nhân viên nào không có tài khoản.',
                data: response,
            });
        } catch (error) {
            reject({
                err: 1,
                msg: 'Lỗi khi lấy danh sách nhân viên!',
                error: error.message,
            });
        }
    });
