/**
 * @function - validate a string of email (just the format)
 * @param {string} inputEmail - input email to be verified
 * @return {boolean}
 */
const validateEmail = (inputEmail) => {
  const emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test(inputEmail);
};

const doSth = () => {};

export {
  validateEmail, doSth,
};
