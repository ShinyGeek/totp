// const speakeasy = require('speakeasy');
import speakeasy from 'speakeasy';

const getToken = () => {
  const secret = '4c5d2147535e4a5a4230796c52777426684a4050474165797352236651522132'; // speakeasy.generateSecret().hex;
  var token = speakeasy.totp(
    {
      secret,
      step: 1,
      digits: 8,
      encoding: 'hex',
      algorithm: 'sha256'
    }
  );
  return token;  
}

const secure = {
  getToken
}

export default secure;

