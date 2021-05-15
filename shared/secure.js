import { authenticator, totp } from 'otplib';

const secret = 'FZTWMO3OE5OUARDG';

// const secret2 = authenticator.generateSecret();
// console.log(secret2);

const getToken = () => {

  totp.options = {
    step: 30,
    digits: 6,
    encoding: 'hex',
    algorithm: 'sha256'
  }

  var token = totp.generate(secret);

  return token;
}

const validateToken = (token) => {
  console.log('validateToken() token', token);

  totp.options = {
    window: 1,
    step: 30,
    digits: 6,
    encoding: 'hex',
    algorithm: 'sha1'
  }

  const valid = authenticator.verify({ token, secret });

  return valid;
}

const secure = {
  getToken,
  validateToken
}

export default secure;
