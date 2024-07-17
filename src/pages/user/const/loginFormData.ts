export type psw = string;

export type loginFormData = {
  account: String,
  password: psw,
  validateKey: String
}

export const LOGIN_FORM_LABEL = {
  PASSWORD: '密码',
  ACCOUNT: '账号',
  VALIDATEKEY: '验证码'
}