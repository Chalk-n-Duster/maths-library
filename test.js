function determinant(matrix) {
  const det = require("./linear_algebra/mat_det");
  let x = det.get_determinant(matrix, 0, matrix.length, 1, "\\\\");
  console.log(x);
  /*
  require("mathjax")
    .init({
      loader: { load: ["input/tex", "output/svg"] },
    })
    .then((MathJax) => {
      const svg = MathJax.tex2svg(x, { display: true });
      console.log(MathJax.startup.adaptor.outerHTML(svg));
    })
    .catch((err) => console.log(err.message));
    */
}

function cramer(matrix1, matrix2) {
  const cr = require("./linear_algebra/mat_cramer");
  let x = cr.get_cramer(matrix1, matrix2, matrix1[0].length);
  console.log(x);
  /*
  require("mathjax")
    .init({
      loader: { load: ["input/tex", "output/svg"] },
    })
    .then((MathJax) => {
      const svg = MathJax.tex2svg(x, { display: true });
      console.log(MathJax.startup.adaptor.outerHTML(svg));
    })
    .catch((err) => console.log(err.message));
    */
}

function inverse(matrix) {
  const inv = require("./linear_algebra/mat_inv");
  var steps = inv.elem_transformations(matrix, matrix.length);
  var y = steps.join("\\\\");
  console.log(y);
  /*
  // var m='matrix([1,2],[3,4])'
  // var n='matrix([1,2],[3,4])'
  // var x=require('nerdamer')(m+'*'+n)
  // console.log(x.toString())
  
  require("mathjax")
    .init({
      loader: { load: ["input/tex", "output/svg"] },
    })
    .then((MathJax) => {
      const svg = MathJax.tex2svg(y, { display: true });
      console.log(MathJax.startup.adaptor.outerHTML(svg));
    })
    .catch((err) => console.log(err.message));
  */
}

const mat = [
  [4, 3, 1, 5],
  [2, 5, 1, 4],
  [3, 3, 2, 1],
  [1, 4, 2, 3],
];

console.log("\nDeterminant:\n")
determinant(mat);

console.log("\nInverse:\n")
inverse(mat);

const mat1 = [
  [3, 2, -1],
  [1, -1, 5],
  [2, 1, 0],
];
const mat2 = [1, -2, 3];

console.log("\nCramer's Rule:\n")
cramer(mat1, mat2);
