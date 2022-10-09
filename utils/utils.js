module.exports.showRequest = (req, res) => {
  console.log('-----------------------');
  console.log(new Date().toISOString());
  console.log(`URL: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  console.log(req.body);
  console.log('-----------------------');
  res.status(200).end();
};