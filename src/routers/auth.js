const router = require('express').Router();
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');

dotenv.config();
const User = require('../models/Users');
const emailService = require('../utils/emailService');

//verifiOTP
router.post('/verify-otp', async (req, res) => {
    const { userId, otp } = req.body;
    try {
        if (!userId || !otp) {
            return res.status(400).json({ error: 'Vui lòng nhập userId và OTP!' });
        }

        // Xác thực OTP
        const verifyResult = await emailService.verifyOTP(userId, otp); // Use userId for OTP verification
        console.log('Verification Result:', verifyResult);

        if (verifyResult.success) {
            await emailService.deleteOTP(userId); // Xóa OTP sau khi xác thực thành công

            // Update user verification status (make sure to specify the user)
            const user = await User.findOne({ _id: userId }); // Find user by userId
            if (!user) {
                return res.status(404).json({ error: 'Người dùng không tồn tại!' });
            }
            await User.updateOne({ _id: user._id }, { $set: { isVerify: true } }, { new: true });

            const accessToken = jwt.sign(
                {
                    id: user._id,
                    role: user.role,
                },
                process.env.JWT_SECRET,
                { expiresIn: '3d' }
            );
            res.status(201).json({ data: { token: accessToken }, message: 'Xác thực OTP thành công!', status: 201 });
        } else {
            res.status(400).json({ error: 'OTP không chính xác hoặc đã hết hạn!' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ data: {}, message: err.message, status: 500 });
    }
});

//REGISTER
// Đăng ký người dùng mới
router.post('/signup', async (req, res) => {
    const { email } = req.body;
    console.log("Password from request:", req.body.password);
    try {
        // Kiểm tra xem người dùng đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(406).json({
                data: {},
                message: 'Email already exists',
                status: 406,
            });
        }
        const userCount = await User.countDocuments(); // Đếm số người dùng hiện tại

        const role = userCount === 0 ? 'admin' : 'customer'; // Người đầu tiên => admin, còn lại => customer
        const newUser = new User({
            username: req.body.username,
            email: email,
            // Mã hóa mật khẩu bằng CryptoJS và lưu trữ dưới dạng chuỗi
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
            isVerify: false,
            role: role,
        });

        const user = await newUser.save();

        await emailService.sendEmail(user._id, user.email, 'Verify Email');

        res.status(201).json({
            data: { userId: user._id },
            message: 'Please verify your email',
            status: 201,
        });
    } catch (err) {
        res.status(500).json({
            data: {},
            message: err.message || 'Server error',
            status: 500,
        });
    }
});
//LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).json({
                data: {},
                message: 'User not found!',
                status: 404,
            });
        } else if (user.isDelete) {
            res.status(406).json({
                data: {},
                message: 'Your account is restricted mode',
                status: 406,
            });
        } else {
            const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);
            const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
            const inputPassword = req.body.password;
            const role = user.role ? 'user' : 'viewer';
            if (originalPassword != inputPassword) {
                res.status(401).json({
                    data: {},
                    message: 'Incorrect account or password',
                    status: 401,
                });
            } else {
                const accessToken = jwt.sign(
                    {
                        id: user._id,
                        role: role,
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '3d' }
                );
                res.status(200).json({ data: { token: accessToken }, message: 'login Success', status: 200 });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ data: {}, message: err, status: 500 });
    }
});
//FORGOT PASSWORD
router.post('/forgotPassword', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).json({ data: {}, message: 'khong ton tai user', status: 404 });
        } else if (user.isDelete) {
            res.status(406).json({
                data: {},
                message: 'Your account is restricted mode',
                status: 406,
            });
        } else {
            const forgotPassword = true;
            await emailService.sendEmail(user._id, user.email, 'Verify Email Forgot Password', forgotPassword);
            res.status(200).json({ data: { userId: user._id }, message: 'Please verify email', status: 200 });
        }
    } catch (err) {
        res.status(500).json({ data: {}, message: err, status: 500 });
    }
});
router.post('/verify-forgotPassword', async (req, res) => {
    const { userId, otp } = req.body;
    try {
        if (!userId || !otp) {
            return res.status(400).json({ error: 'Vui lòng nhập email và OTP cần cấp lại!' });
        }

        // Xác thực OTP
        const verifyResult = await emailService.verifyOTP(userId, otp);
        if (verifyResult.success) {
            await emailService.deleteOTP(userId); // Xóa OTP sau khi xác thực thành công

            const user = await User.findOne({ userId }); // Fetch user info based on email
            if (!user) {
                return res.status(404).json({ error: 'Người dùng không tồn tại!' });
            }
            await User.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
                    },
                },
                { new: true }
            );
            res.status(201).json({ data: {}, message: 'Email verified successfully', status: 201 });
        } else {
            res.status(400).json({ error: 'OTP không chính xác hoặc đã hết hạn!' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ data: {}, message: err.message, status: 500 });
    }
});

module.exports = router;
