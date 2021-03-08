import speakeasy from 'speakeasy';
import keys from './keys.json';

var last = 0;

const getToken = () => {

  const max = keys.length;

  // Generate a random index for the key array
  let index = 0;
  // don't use same as previous
  do {
    index = Math.floor(Math.random() * max);
  } while (index === last);
  last = index;

  // extract the key
  const key = keys[index];
  
  // create the string format of the index e.g. '09'
  const idxstr= index.toString().padStart(2, '0');

  var token = speakeasy.totp(
    {
      secret: key,
      step: 1,
      digits: 8,
      encoding: 'hex',
      algorithm: 'sha256'
    }
  );
  return token.concat(idxstr);  
}

const validateToken = (tokenAll) => {
  // get the token i.e. first 8 digits
  const token = tokenAll.slice(0, 8);
  console.log('validateToken() token', token);

  // get the index of the key used i.e. last two digits of token
  const index = parseInt(tokenAll.slice(-2), 10);
  console.log('validateToken() index', index);

  // get the key
  const key = keys[index];

  const valid = speakeasy.totp.verify(
    {
      secret: key,
      token,
      window: 1,
      step: 1,
      digits: 8,
      encoding: 'hex',
      algorithm: 'sha256'
    }
  );
  return valid;
}

const secure = {
  getToken,
  validateToken
}

export default secure;
