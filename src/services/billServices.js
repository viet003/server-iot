import db from "../models";
import * as mailControllers from "../controllers/mailControllers"

export const getBillService = async ({ card_id }) => {
    try {
        const bill = await db.Bill.findOne({
            where: { card_id }
        });

        return {
            err: bill ? 0 : 2, 
            msg: bill ? 'Lấy thông tin Bill thành công.' : "Lấy thông tin thất bại.",
            data: bill 
        };
    } catch (error) {
        console.error('Lỗi khi lấy Bill:', error.message);
        return {
            err: 2, 
            msg: `Không thể lấy Bill: ${error.message}`
        };
    }
};


export const updateBill = async (card_id) => {
    try {
        // Kiểm tra và tạo Bill nếu chưa tồn tại
        const [bill, created] = await db.Bill.findOrCreate({
            where: { card_id },
            defaults: { total: 0 }
        });

        // Cập nhật Bill với dữ liệu mới
        if (!created) {
            const newTotal = bill.total + 3000;
            await bill.update({ total: newTotal });
        } else {
            await bill.update({ total: 3000 });
        }

        return {
            err: created ? 0 : 2,
            msg: created ? 'Bill mới được tạo và cập nhật!' : 'Bill đã tồn tại và được cập nhật!'
        };
    } catch (error) {
        throw error;
    }
};

export const payBillService = async ({ card_id }) => {
    try {
        const [bill, created] = await db.Bill.findOrCreate({
            where: { card_id },
            defaults: { total: 0 }
        });

        if (!created) {
            await bill.update({ total: 0 });
        }

        return {
            err: 0 ,
            msg: created ? 'Thanh toán thành công!' : 'Thanh toán thành công!'
        };
    } catch (error) {
        throw error;
    }
};