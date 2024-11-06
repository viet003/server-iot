import * as userService from "../services/userService"

// lấy tất cả tài khoản
export const getAllUsersController = async (req, res) => {
    try {
        const rs = await userService.getAllUsersService();
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}

// lấy tất cả tài khoản
export const getUserByIdController = async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) {
            return res.status(400).json({
                err: 1,
                msg: "Thiếu dữ liệu đầu vào!",
            });
        }
        const rs = await userService.getUserByIdService(req.body);
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}

// sửa
export const updateUserController = async (req, res) => {
    const { id, user_name, vehicle_type } = req.body;
    try {
        if (!id || !user_name || vehicle_type < 0) {
            return res.status(400).json({
                err: 1,
                msg: "Thiếu dữ liệu đầu vào!",
            });
        }
        const rs = await userService.updateUserService(req.body);
        return res.status(200).json(rs);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
};

// Xoas
export const deleteUserController = async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) {
            return res.status(400).json({
                err: 1,
                msg: "Thiếu dữ liệu đầu vào!",
            });
        }
        const rs = await userService.deleteUserService(req.body);
        return res.status(200).json(rs);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
};

