module.exports = function(context) {
  var str = '';
  for (var k in context){
    str += context[k];
  }
  return str;
}