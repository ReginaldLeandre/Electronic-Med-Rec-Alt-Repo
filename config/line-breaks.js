

module.exports = function lineBreak(str){

    str = str.replace(/\r?\n/g, '\n');
  
    console.log(str)
    return str;

  }