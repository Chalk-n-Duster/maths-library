const nerdamer = require("nerdamer");
const { stringify } = require("./utils");

function get_determinant(matrix, index, size, step, output) {
  if (index == size - 1) {
    output +=
      "Step\\," +
      step.toString() +
      "\\,Calculate\\,the\\,product\\,of\\,all\\,the\\,diagonal\\,elements\\\\";
    step += 1;
    let value = 1;
    for (let i = 0; i < size; i++) {
      if (i !== size - 1)
        output += nerdamer(matrix[i][i]).toTeX() + "\\,\\times\\,";
      else output += nerdamer(matrix[i][i]).toTeX();
      value = nerdamer(value).multiply(matrix[i][i]).toString();
    }
    output += "\\,=\\," + nerdamer(value).toTeX();
    return output;
  }
  for (let i = index + 1; i < size; i++) {
    if (matrix[index][index] != matrix[i][index])
      output +=
        "Step\\," +
        step.toString() +
        "\\,Multiply\\,row\\," +
        (index + 1).toString() +
        "\\,by\\," +
        nerdamer(matrix[i][index])
          .divide(matrix[index][index])
          .expand()
          .toTeX() +
        "\\,and\\,subtract\\,from\\,row\\," +
        (i + 1).toString() +
        "\\\\";
    else
      output +=
        "Step\\," +
        step.toString() +
        "\\,Subtract\\,row\\," +
        (index + 1).toString() +
        "\\,from\\,row\\," +
        (i + 1).toString() +
        "\\\\";
    step += 1;
    const a = [matrix[i][index]];
    for (let j = index; j < size; j++)
      matrix[i][j] = nerdamer(matrix[i][j]).subtract(
        nerdamer(nerdamer(matrix[index][j]).multiply(a[0]).toString())
          .divide(matrix[index][index])
          .expand()
          .toString()
      );
    output += nerdamer(stringify(matrix)).toTeX() + "\\\\";
  }
  return get_determinant(matrix, index + 1, size, step, output);
}
matrix = [
  ["4", "3", "1", "5"],
  ["2", "5", "1", "4"],
  ["3", "3", "2", "1"],
  ["1", "4", "2", "3"],
];
console.log(get_determinant(matrix, 0, 4, 1, "\\\\"));

module.exports = { get_determinant };