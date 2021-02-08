const getMessage = (req, res) => {
  return res.json({ message: 'You are successfully signed in!' });
};

module.exports = { getMessage };
