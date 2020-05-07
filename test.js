const mat=require('./linear_algebra/mat_det')

var x=(mat.solveDet([[1,2,3,4],[3,4,5,6],[7,8,9,10],[6,7,8,9]],4))
var y=x.join(' = ')
// console.log(x)
    require('mathjax').init({
        loader: {load: ['input/tex', 'output/svg']}
      }).then((MathJax) => {
        const svg = MathJax.tex2svg(y, {display: true});
        console.log(MathJax.startup.adaptor.outerHTML(svg));
      }).catch((err) => console.log(err.message));