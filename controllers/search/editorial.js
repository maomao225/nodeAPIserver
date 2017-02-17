const request = require('superagent');

module.exports = (req, res, next) => {

  console.log(req.body)
  console.log(req.query)

  request.post('http://dev.edgeservice.vcg.com/web/searchResimage')
    .query({assetFamily: 1})
    .send(req.query)
    .then(response => {
      console.log(response.body);
      res.json(response.body);
    })
    .catch(err => next(err));
}
