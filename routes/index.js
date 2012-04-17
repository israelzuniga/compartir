
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { 
    title: 'Compart.ir', 
    user: null,
    classes: "front" 
  })
};