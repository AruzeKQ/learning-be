import jwt from "jsonwebtoken"

export const protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token, 'skibidi');
            req.user = decode;

            return next();
        } catch (error) {
            return res.status(401).json({ message: "token không hợp lệ hoặc hết hạn" });
        }
    }
    if (!token) {
        return res.status(401).json({ message: "Không tìm thấy Token. Bạn chưa đăng nhập!" });
    }
}

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Bạn không có quyền truy cập!!!"
            })
        }

        next();
    }
}


const rateLitmitMap = new Map(); // key->value for save record login IP
export const rateLimiting = (req, res, next, maxReq = 5, windowMs = 10000) => {
    const ip = req.socket.remoteAddress || '127.0.0.1';
    const now = Date.now(); // lấy ra thời gian hiện tại 

    const recordIpLogin = rateLitmitMap.get(ip) || {
        count: 0,
        resetTime: now + windowMs
    } // lưu bản ghi của các ip login

    if (now > recordIpLogin.resetTime) {
        recordIpLogin.count = 0;
        recordIpLogin.resetTime = now + windowMs;
    } // quá thời gian tối đa của một lần kiểm tra request

    if (recordIpLogin.count >= maxReq) {
        return res.status(429).json({
            message: "Gửi quá nhiều request!!"
        })
    }

    recordIpLogin.count += 1;
    rateLitmitMap.set(ip, recordIpLogin);

    next();
}

