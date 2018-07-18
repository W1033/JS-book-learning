/** Created on 2017/2/27. **/
var reg = /(\d{2}).(\d{2})\/(\d{4})/;
var data = "12.21/2017";
data = data.replace(reg, "$3-$1-$2");
console.log(data);