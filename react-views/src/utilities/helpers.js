const validateEmail = (inputEmail) => {
  const emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test(inputEmail);
};

const doSomeThing = () => {

};

export {
  validateEmail,
  doSomeThing,
};
