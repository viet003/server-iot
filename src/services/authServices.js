import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require('dotenv').config();

// đăng nhập
export const loginService = ({ email, pass_word }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { email },
            include: [
                {
                    model: db.Card,
                    as: 'card',
                    required: false,
                    attributes: ['id'],
                    include: [
                        {
                            model: db.Bill,
                            as: 'bill',
                            required: false
                        }
                    ],
                }
            ],
        });

        if (!response) {
            return resolve({
                err: 2,
                msg: 'Không tìm thấy thông tin email hoặc loại tài khoản không chính xác.',
                token: null,
            });
        }

        // const isCorrectPass = bcrypt.compareSync(pass_word, response.pass_word);
        // if (!isCorrectPass) {
        //     return resolve({
        //         err: 2,
        //         msg: 'Mật khẩu không chính xác.',
        //         token: null,
        //     });
        // }

        const token = jwt.sign(
            {
                id: response.id,
                email: response.email,
                user_name: response.user_name,
                type: response.type,
                card_id: response.card_id,
                vehicle_type: response.vehicle_type,
                bill: response.card.bill ?? 0
            },
            process.env.SECRET_KEY,
            { expiresIn: '1d' }
        );

        resolve({
            err: 0,
            msg: 'Đăng nhập thành công!',
            type: response.type,
            token,
        });
    } catch (error) {
        console.log(error)
        reject({
            err: 1,
            msg: 'Lỗi khi đăng nhập.',
            error: error,
        });
    }
});


// đăng ký
const hash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const registerService = ({ email, pass_word, user_name, card_id, vehicle_type, type }) =>
    new Promise(async (resolve, reject) => {
        try {
            // Sử dụng findOrCreate để tìm hoặc tạo mới người dùng
            const [user, created] = await db.User.findOrCreate({
                where: { email },
                defaults: {
                    email,
                    pass_word: pass_word ? hash(pass_word) : hash("12345678"),
                    user_name,
                    card_id,
                    vehicle_type: vehicle_type ?? null,
                    type,
                }
            });

            if (!created) {
                return resolve({
                    err: 2,
                    msg: 'Email đã được sử dụng.',
                });
            }

            resolve({
                err: 0,
                msg: 'Đăng ký thành công!',
                data: {
                    id: user.id,
                    email: user.email,
                    user_name: user.user_name,
                },
            });
        } catch (error) {
            reject({
                err: 1,
                msg: 'Lỗi khi đăng ký người dùng mới.',
                error: error.message,
            });
        }
    });

export const changePassWordService = ({ type, pass_word, old_pass_word, email }) =>
    new Promise(async (resolve, reject) => {
        try {
            switch (type) {
                case 2:
                    const response = await db.User.update(
                        { pass_word: hash(pass_word) },
                        {
                            where: { email },
                        })
                    resolve({
                        err: response[0] ? 0 : 2,
                        msg: response[0] ? 'Đổi mật khẩu thành công thành công!' : 'Không tìm thấy thông tin để cập nhật.',
                    });
                    break;
                default:


                    break;
            }
        } catch (error) {
            reject({
                err: 1,
                msg: 'Lỗi khi đổi mật khẩu.',
                error: error.message,
            });
        }
    });

// update token_device
export const updateTokenDeviceService = async ({ token, email }) => {
    try {
        const user = await db.User.findOne({ where: { email } });

        if (!user) {
            return {
                err: 2,
                msg: 'Không tìm thấy người dùng với email này.',
            };
        }
        const result = await user.update({ token_device: token });

        // Trả về kết quả cập nhật
        return {
            err: result ? 0 : 2,
            msg: result ? 'Thành công!' : 'Không thành công!',
        };
    } catch (error) {
        // Xử lý lỗi và trả về thông báo lỗi
        return {
            err: 2,
            msg: 'Lỗi khi cập nhật token thiết bị.',
            error: error.message,
        };
    }
};
