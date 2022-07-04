import { validationMixin as validation } from 'vuelidate'
const msg = {
  required: 'Vui lòng nhập {field}',
  minLength: '{field} phải có ít nhất 6 ký tự',
  numeric: '{field} phải là các ký tự số',
  sameAsPassword: '{field} nhập lại không khớp',
  phoneNumber: 'Số điện thoại không đúng định dạng',
}

const message = (rule = null, fieldName = null) => {
  let field = 'dữ liệu'
  if (fieldName) field = fieldName
  if (msg[rule]) return msg[rule].replace(/{field}/g, field)
  return ''
}

export const phoneNumber = (value) =>
  /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(value)

const ValidationMixin = {
  data: () => ({
    form: {},
  }),
  mixins: [validation],
  methods: {
    $state(field) {
      if (!this.$v.form[field]) return null
      const { $dirty, $error } = this.$v.form[field]
      return $dirty ? !$error : null
    },
    $errors(field) {
      if (!this.$v.form[field]) return null
      return Object.keys(this.$v.form[field]).filter(
        (e) => !e.startsWith('$') && this.$v.form[field][e] === false
      )
    },
    $message: message,
    $validated() {
      this.$v.form.$touch()
      if (this.$v.form.$anyError) {
        return false
      }
      return true
    },
    $reset() {
      this.$v.form.$reset()
    },
  },
}

export default ValidationMixin
