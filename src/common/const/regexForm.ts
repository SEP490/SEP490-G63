export const REGEX_EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
export const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[0-9]).{8,16}$/
export const REGEX_NUMBER = /^\d{8,30}$/
export const REGEX_NAME = /^[A-Za-zÀ-ỹà-ỹ\s]{8,30}$/
export const REGEX_PHONE = /^(03|05|07|08|09)\d{8}$/
export const REGEX_ADDRESS = /^[A-Za-zÀ-ỹà-ỹ0-9\s.,-_]{8,100}$/
export const REGEX_TAX_NUMBER = /^\d{10}(\d{3})?$/
export const REGEX_CCCD = /^\d{12}$/
export const DEFAULT_PASSWORD = '12345678'
