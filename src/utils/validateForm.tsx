/**
 * Validate that the input value is not empty or only contains whitespace characters.
 *
 * @param {Object} rule - The validation rule object in antd.
 * @param {String} value - The value to validate.
 * @param {function} callback - Function, the callback function to trigger upon validation completion.
 */
export const notBeEmpty = (rule: any, value: string, callback: any) => {
  if (value && value.trim() === '') {
    callback(`Không được nhập toàn dấu cách`)
  } else {
    callback()
  }
}
