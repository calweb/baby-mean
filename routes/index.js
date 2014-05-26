
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express', ngApp: 'ngDay2App' });
};
