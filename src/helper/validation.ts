/* eslint-disable no-useless-escape */
export const validatePassword = (input: string) => {
  return !input || input.length < 3;
};

export const validateEmail = (input: string) => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const result = reg.test(input);
  const b1 = input === '';
  const error = !result && !b1;

  return error;
};

export const isAlphanumeric = (input: string) => {
  const onlyAlphanumericRegex = /[^a-z0-9]/gi;
  if (onlyAlphanumericRegex.test(input)) return false;
  return true;
};

export const validateName = (input: string) => {
  const regex = /^[a-zA-Z].*[\s\.]*$/g;
  if (regex.test(input)) return false;
  return true;
};

export const validatePhoneNumber = (input: string) => {
  const regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
  if (regex.test(input)) return false;
  return true;
};
