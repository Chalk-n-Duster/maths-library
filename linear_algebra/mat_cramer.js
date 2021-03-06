const nerdamer = require("nerdamer");
const { stringify } = require("./utils");

function get_cramer(coeff, result, size) {
  det = [];
  output =
    "\\\\Step\\,1:\\,Calculate\\,the\\,determinant\\,of\\,the\\,coefficient\\,matrix\\\\D\\,=\\,";
  let d = nerdamer(stringify(coeff));
  output += d.toTeX();
  d = nerdamer.determinant(d);
  output += "\\,=\\," + d.toString() + "\\\\";
  output +=
    "Step\\,2:\\,Replace\\,the\\,n^{th}\\,column\\,of\\,the\\,coefficient\\,matrix\\,by\\,the\\,result\\,matrix\\,and\\,obtain\\,the\\,respective\\,determinants\\\\";
  for (let i = 0; i < size; i++) {
    let temp_d = JSON.parse(JSON.stringify(coeff));
    for (let j = 0; j < size; j++) {
      temp_d[j][i] = result[j];
    }
    temp_d = stringify(temp_d);
    temp_value = nerdamer.determinant(temp_d);
    det.push(temp_value);
    output +=
      "D" +
      (i + 1).toString() +
      "\\,=\\," +
      nerdamer(temp_d).toTeX() +
      "\\,=\\," +
      temp_value.toString() +
      "\\\\";
  }
  if (d.toString() === "0") {
    let flag = 0;
    for (let i = 0; i < size; i++) {
      if (det[i].toString() !== "0") {
        flag = 1;
        break;
      }
    }
    if (flag === 0) {
      output +=
        "Step\\,3:\\,As\\,you\\,can\\,see,\\,D\\,as\\,well\\,as\\,all\\,of\\,the\\,Dn\\,are\\,zero.\\,Hence\\,the\\,given\\,system\\,is\\,either\\,inconsistent,\\,i.e.,\\,it\\,has\\,no\\,solution,\\,or\\,it\\,has\\,infinitely\\,many\\,solutions.\\,To\\,find\\,out\\,which,\\,check\\,out\\,our\\,Gauss-Jordan\\,Elimination\\\\";
    } else {
      output +=
        "Step\\,3:\\,As\\,you\\,can\\,see,\\,D\\,=\\,0\\,but\\,all\\,of\\,the\\,Dn\\,are\\,not\\,zero.\\,Hence\\,the\\,given\\,system\\,is\\,inconsistent,\\,i.e.,\\,it\\,has\\,no\\,solution\\\\";
    }
  } else {
    output +=
      "Step\\,3:\\,Calculate\\,the\\,solution\\,by\\,dividing\\,Dn\\,by\\,D\\\\";
    output += "Solutions:";
    for (let i = 0; i < size; i++) {
      output += "\\,\\frac{" + det[i].toString() + "}{" + d.toString() + "}";
      if (i !== size - 1) {
        output += ",";
      }
    }
    output += "\\,=\\,";
    for (let i = 0; i < size; i++) {
      output += "\\," + det[i].divide(d).toTeX();
      if (i !== size - 1) {
        output += ",";
      }
    }
    output += "\\\\";
  }
  return output;
}
module.exports = { get_cramer };
