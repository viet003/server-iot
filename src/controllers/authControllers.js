import * as authService from "../services/authServices"
import jwt from 'jsonwebtoken';

// đăng ký
export const registerController = async (req, res) => {
    const { email, pass_word, user_name, card_id, vehicle_type, type } = req.body;

    try {
        if (!email || !card_id || !user_name || type < 0) {
            return res.status(400).json({
                err: 1,
                msg: "Thiếu dữ liệu đầu vào!",
            });
        }
        const rs = await authService.registerService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}


// đăng nhập
export const loginController = async (req, res) => {
    const { email, pass_word } = req.body;

    try {
        if (!email || !pass_word) {
            return res.status(400).json({
                err: 1,
                msg: "Thiếu dữ liệu đầu vào!"
            })
        }
        const rs = await authService.loginService(req.body)
        return res.status(200).json(rs)

    } catch (error) {
        return res.status(500).json(error)
    }
}


// đổi mật khẩu
export const changePassWordController = async (req, res) => {
    const { email, type, old_pass_word, pass_word } = req.body;

    try {
        if (email && type === 2 && pass_word) {
            const rs = await authService.changePassWordService(req.body)
            return res.status(200).json(rs)
        }

        if (email && old_pass_word && pass_word) {
            const rs = await authService.changePassWordService(req.body)
            return res.status(200).json(rs)
        }

        return res.status(400).json({
            err: 1,
            msg: "Thiếu dữ liệu đầu vào!"
        })

    } catch (error) {
        return res.status(500).json(error)
    }
}

// check token
export const checkTokenExpiredController = async (req, res) => {
    const { token } = req.body;

    try {
        // Kiểm tra xem token có tồn tại không
        if (!token) {
            return res.status(400).json({
                err: 1,
                msg: "Thiếu dữ liệu đầu vào!"
            });
        }
        const decoded = jwt.decode(token);
        if (!decoded || !decoded.exp) {
            return res.status(400).json({
                err: 1,
                msg: "Token không hợp lệ hoặc không có thời gian hết hạn!"
            });
        }
        const currentTime = Math.floor(Date.now() / 1000);
        const isExpired = decoded.exp < currentTime;

        return res.status(200).json({
            err: 0,
            isExpired,
            msg: isExpired ? "Token đã hết hạn!" : "Token còn hiệu lực."
        });

    } catch (error) {
        // Trả về lỗi nếu có lỗi không mong muốn
        return res.status(500).json({
            err: 2,
            msg: "Lỗi trong quá trình xử lý token!",
            error: error.message
        });
    }
};

// update token device
export const updateTokenDeviceController = async (req, res) => {
    const { token, email } = req.body;

    try {
        // Kiểm tra xem token có tồn tại không
        if (!token || !email) {
            return res.status(400).json({
                err: 1,
                msg: "Thiếu dữ liệu đầu vào!"
            });
        }
        
        const rs = await authService.updateTokenDeviceService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        // Trả về lỗi nếu có lỗi không mong muốn
        return res.status(500).json({
            err: 2,
            msg: "Lỗi trong quá trình xử lý token!",
            error: error.message
        });
    }
};


