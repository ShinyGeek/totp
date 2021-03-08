import secure from '../../shared/secure';

export default (req, res) => {
  const { headers } = req;
  const token = headers['totp-token'];
  const valid = secure.validateToken(token);
  if (valid) {
    res.status(200).end('Your request was successful');
  } else {
    res.status(401).end('Your request is unauthorized');
  }
}
