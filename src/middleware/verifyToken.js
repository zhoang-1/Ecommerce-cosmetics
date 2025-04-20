const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // Lấy token từ tiêu đề yêu cầu HTTP
  if (authHeader) { // Nếu có token
      const token = authHeader.split(' ')[1]; // Loại bỏ từ 'Bearer ' nếu có
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => { // Xác minh token
          if (err) { // Token không hợp lệ
              res.status(403).json({ data: {}, message: 'Token is not valid!', status: 403 });
          } else { // Token hợp lệ
              req.user = user; // Gán thông tin người dùng vào request
              next(); // Chuyển tiếp sang middleware tiếp theo
          }
      });
  } else { // Không có token
      return res.status(401).json('You are not authenticated!');
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => { // Đầu tiên xác thực token
      if (req.user.role === 'admin' || req.user.role === 'customer' || req.user.role === 'staff') {
          next(); // Nếu vai trò hợp lệ, tiếp tục
      } else { // Nếu không, từ chối quyền
          res.status(403).json({ data: {}, message: 'You are not alowed to do that!', status: 403 });
      }
  });
};

const verifyTokenAdminOrStaff = (req, res, next) => {
  verifyToken(req, res, () => {
      if (req.user.role === 'admin' || req.user.role === 'staff') {
          next(); 
      } else {
          res.status(403).json({ data: {}, message: 'You are not alowed to do that!', status: 403 });
      }
  });
};

const isCustomer = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === 'customer') { // Chỉ customer mới được phép
            next();
        } else {
            res.status(403).json({ data: {}, message: 'You are not alowed to do that!', status: 403 });
        }
    });
  };

const isAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
      if (req.user.role === 'admin') { // Chỉ admin mới được phép
          next();
      } else {
          res.status(403).json({ data: {}, message: 'You are not alowed to do that!', status: 403 });
      }
  });
};

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAdminOrStaff,isCustomer, isAdmin};