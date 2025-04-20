const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        order_code: {    //'Mã đơn hàng',   // 'Mã đơn hàng' là một chuỗi duy nhất để xác định đơn hàng
            type: String,   //  cần tự động sinh ra và không được trùng lặp (tao thể sử dụng thư viện như uuid để tạo mã ngẫu nhiên)
            unique: true,   // cần làm bên middleware để tự động sinh ra mã đơn hàng khi tạo mới đơn hàng
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        total_price: {
            type: Number,
            required: true,
            min: 0,
        },
        shipping_fee: {
            type: Number,
            default: 0,
            min: 0,
        },
        payment_method: {
            type: String,
            enum: ['cod', 'banking', 'credit_card', 'ewallet'],
            required: true,
        },
        payment_status: {
            type: String,
            enum: ['pending', 'paid', 'failed', 'refunded'],
            default: 'pending',
        },
        status: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'pending',
        },
        shipping_address: {
            type: String,
            required: true,
        },
        shipping_phone: {
            type: String,
            required: true,
        },
        shipping_method: {
            type: String,
        },
        estimated_delivery_date: {
            type: Date,
        },
        notes: {
            type: String,
        },
        payment_date: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Order', orderSchema);
