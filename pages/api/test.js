export default (req, res) => {
  res.status(200).json({ name: 'John Doe' })
}

const validate = () => {
  var valid = speakeasy.totp.verify(
    {
      secret,
      token: token,
      window: 1,
      step: 1,
      digits: 8,
      encoding: 'base32',
      algorithm: 'sha256'
    }
  );
  return valid;
}

