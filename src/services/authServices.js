import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require('dotenv').config();

// đăng nhập
export const loginService = ({ email, pass_word }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { email }, // Kiểm tra email và loại tài khoản
            raw: true,
        });

        if (!response) {
            return resolve({
                err: 2,
                msg: 'Không tìm thấy thông tin email hoặc loại tài khoản không chính xác.',
                token: null,
            });
        }

        const isCorrectPass = bcrypt.compareSync(pass_word, response.pass_word);
        if (!isCorrectPass) {
            return resolve({
                err: 2,
                msg: 'Mật khẩu không chính xác.',
                token: null,
            });
        }

        const token = jwt.sign(
            {
                id: response.id,
                email: response.email,
                user_name: response.user_name,
                type: response.type,
            },
            process.env.SECRET_KEY,
            { expiresIn: '1d' }
        );

        resolve({
            err: 0,
            msg: 'Đăng nhập thành công!',
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
                    pass_word: hash(pass_word),
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