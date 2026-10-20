import Joi from "joi";

export const productValidation = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
        'string.empty': 'Tên sản phẩm cấm để trống',
        'string.min': 'Tên sản phẩm phải có ít nhất 3 kí tự',
        'any.required': 'Trường name là bắt buộc bro ơi'
    }),
    price: Joi.number().min(0).required().messages({
        'number.base': 'Giá sản phẩm phải là số',
        'number.min': 'Giá không được âm nha bro!!'
    }),
    instock: Joi.boolean()
}).options({ stripUnknown: true }); // option để tránh bị gửi các trường rác, chỉ giữ lại các trường cần thiết

