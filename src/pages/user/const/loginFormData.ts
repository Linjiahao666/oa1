export type psw = string;

export type loginFormData = {
  account: String,
  password: psw,
  validateKey: String
}

export type signFormData = {
  account: String,
  password: psw,
}

export const enum LOGIN_FORM_LABEL {
  PASSWORD = '密码',
  ASSUREPASSWORD = '确认密码',
  ACCOUNT='账号',
  VALIDATEKEY = '验证码'
}

export const enum SIGN_FORM_LABEL {
  ACCOUNT = '账号',
  PASSWORD = '密码',
}