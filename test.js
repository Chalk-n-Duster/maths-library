// const det=require('./linear_algebra/mat_det')

// var x=(det.solveDet([[0.25,2,5/6],[3/4,2,7/9],[1/7,5/6,4]],3))
// var y=x.join('\\\\\\ = ')
// // console.log(y)
//     require('mathjax').init({
//         loader: {load: ['input/tex', 'output/svg']}
//       }).then((MathJax) => {
//         const svg = MathJax.tex2svg(y, {display: true});
//         console.log(MathJax.startup.adaptor.outerHTML(svg));
//       }).catch((err) => console.log(err.message));

const inv=require('./linear_algebra/mat_inv')

var steps=inv.elem_transformations([[1,2],[3,4]],2)
var y=steps.join('\\\\ ')
console.log(y)
//     require('mathjax').init({
//         loader: {load: ['input/tex', 'output/svg']}
//       }).then((MathJax) => {
//         const svg = MathJax.tex2svg(y, {display: true});
//         console.log(MathJax.startup.adaptor.outerHTML(svg));
//       }).catch((err) => console.log(err.message));