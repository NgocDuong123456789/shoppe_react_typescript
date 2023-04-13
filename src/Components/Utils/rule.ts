import * as yup from 'yup'
import { InferType } from 'yup'

export const schema = yup.object({
  email: yup
    .string()
    .required('không  để trống trường này')
    .email('nhập phải đúng định dạng email')
    .min(5, 'độ dài tối thiểu phải 5 ký tự')
    .max(160, 'không nhập quá 160 ký tự'),
  password: yup
    .string()
    .required('không để trống trường này')
    .min(6, 'độ dài tối thiểu 6 ký tự')
    .max(160, 'không nhập quá 160 ký tự'),
  confirm_password: yup
    .string()
    .required('không để trống trường này')
    .min(6, 'độ dài tối thiểu 6 ký tự')
    .max(160, 'không nhập quá 160 ký tự')
    .oneOf([yup.ref('password')], 'mật khẩu nhập không đúng'),
  name: yup.string().required('không để trống trường này').max(160, 'Trường name không được để trống'),
  avatar: yup.string().max(1000, 'avatar không quá 1000 ký tự'),
  phone: yup.string().required('không để trống trường này').max(20, 'Trường sđt không được để trống'),
  address: yup.string().required('không để trống trường này').max(160, 'Trường address không được để trống'),
  date_of_birth: yup.date().max(new Date(), 'Hãy nhập 1 ngày trong quá khứ'),
  new_password: yup
    .string()
    .required('không để trống trường này')
    .min(6, 'độ dài tối thiểu 6 ký tự')
    .max(160, 'không nhập quá 160 ký tự'),

  passwordConfirm: yup
    .string()
    .required('không để trống trường này')
    .min(6, 'độ dài tối thiểu 6 ký tự')
    .max(160, 'không nhập quá 160 ký tự')
    .oneOf([yup.ref('new_password')], 'mật khẩu nhập không đúng'),

  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'nhập chưa đúng yêu cầu',
    test: function (value) {
      const price_max = value as string
      const { price_min } = this.parent as { price_min: string }
      if (price_min !== '' && price_max !== '') {
        return Number(price_max) >= Number(price_min)
      }
      return price_min !== '' || price_max !== ''
    }
  }),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'nhập chưa đúng yêu cầu',
    test: function (value) {
      const price_min = value as string
      const { price_max } = this.parent as { price_max: string }
      if (price_min !== '' && price_max !== '') {
        return Number(price_max) >= Number(price_min)
      }
      return price_max !== '' || price_min !== ''
    }
  })
})

export type SchemaForm = InferType<typeof schema>
