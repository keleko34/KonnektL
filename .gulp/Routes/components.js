var konnektRT = require('konnektrt')();

module.exports = function(req,res,next){
  if(!req.sessions) req.sessions = {};
  req.sessions.cms = true;
  konnektRT(req,res,next);
};
