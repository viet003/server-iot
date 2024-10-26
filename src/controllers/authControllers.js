import * as authService from "../services/authServices"

// đăng ký
export const register = async (req, res) => {
    const { email, password, cardId } = req.body;

    try {
        if (!email || !password || !cardId) {
            return res.status(400).json({
                err: 1,
                msg: "Thiếu dữ liệu đầu vào!"
            })
        }
        const rs = await authService.registerService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}


// đăng nhập
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await authService.loginService(req.body)
        return res.status(200).json(rs)

    } catch (error) {
        return res.status(500).json(error)
    }
}
