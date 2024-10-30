import db from "../models";
import * as mailControllers from "../controllers/mailControllers"

export const updateBill = async (cardId) => {
    try {
        // Kiểm tra và tạo Bill nếu chưa tồn tại
        const [bill, created] = await db.Bill.findOrCreate({
            where: { cardId },
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