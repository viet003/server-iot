import { where } from "sequelize-cockroachdb";
import db from "../models";

// tạo comment
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



// xóa comment
export const deleteCardService = async ({ id }) => {
    try {
        const response = await db.Card.destroy({
            where: {
                id
            }
        })
        return {
            err: response ? 0 : 2,
            msg: response ? 'Thành công!' : 'Không thành công.'
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
