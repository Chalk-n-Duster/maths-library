const det = require("./linear_algebra/mat_det");

function determinant(matrix) {
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

function inverse(matrix) {
  const inv = require("./linear_algebra/mat_inv");

  var steps = inv.elem_transformations(
    matrix,
    matrix.length
  );
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

determinant(mat);
inverse(mat)