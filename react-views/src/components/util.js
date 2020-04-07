/**
 * @function - validate a string of email (just the format)
 * @param {string} inputEmail - input email to be verified
 * @return {boolean}
 */
const validateEmail = (inputEmail) => {
<<<<<<< HEAD
<<<<<<< HEAD
  if (!inputEmail) {
    return false;
  }
=======
>>>>>>> f86c3d6... Split common logic (util.js)
=======
  if (!inputEmail) {
    return false;
  }
>>>>>>> 560a7fe... add formik + reform redux store
  const emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test(inputEmail);
};

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
export const dosth = () => {};

export {
  validateEmail,
=======
const doSth = () => {};

export {
  validateEmail, doSth,
>>>>>>> f86c3d6... Split common logic (util.js)
=======
const dosth = () => {};
=======
export const dosth = () => {};
>>>>>>> 2d5cfb4... finish post component (backend and frontend)

export {
  validateEmail,
>>>>>>> 560a7fe... add formik + reform redux store
};
