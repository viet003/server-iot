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
        const LIMIT = 99000; // Giới hạn tối đa
        const INCREMENT = 3000; // Giá trị tăng thêm

        // Kiểm tra và tạo Bill nếu chưa tồn tại
        const [bill, created] = await db.Bill.findOrCreate({
            where: { card_id },
            defaults: { total: INCREMENT } // Đặt total thành 3000 khi tạo mới
        });

        // Nếu bill đã tồn tại và vượt quá hoặc bằng giới hạn, trả về false
        if (!created && bill.total >= LIMIT) {
            return false;
        }

        // Nếu bill đã tồn tại, tăng `total` thêm giá trị `INCREMENT`
        if (!created) {
            const newTotal = bill.total + INCREMENT;
            await bill.update({ total: Math.min(newTotal, LIMIT) });
        }

        // Trả về true khi cập nhật thành công
        return true;
    } catch (error) {
        console.error("Lỗi khi cập nhật hóa đơn:", error.message);
        throw new Error(`Lỗi khi cập nhật hóa đơn cho card_id ${card_id}: ${error.message}`);
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