import * as billService from "../services/billServices"

// lấy bill
export const getBillController = async (req, res) => {
    const { card_id } = req.body;

    try {
        if (!card_id) {
            return res.status(400).json({
                err: 1,
                msg: "Thiếu dữ liệu đầu vào!"
            })
        }
        const rs = await billService.getBillService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// thanh toán thẻ
export const payBillController = async (req, res) => {
    const { card_id } = req.body;

    try {
        if (!card_id) {
            return res.status(400).json({
                err: 1,
                msg: "Thiếu dữ liệu đầu vào!"
            })
        }
        const rs = await billService.payBillService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}
