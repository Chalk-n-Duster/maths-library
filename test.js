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
const basics=require('./linear_algebra/mat_basics')
const rank=require('./linear_algebra/mat_rank')
// var y=basics.buildFromFunc('(2^i+3*j)/i',4,4)
var y=rank.findRank([[10,20,10],[-20,-30,10],[30,50,0]],3,3)
console.log(y)
// var m='matrix([1,2],[3,4])'
// var n='matrix([1,2],[3,4])'
// var x=require('nerdamer')(m+'*'+n)
// console.log(x.toString())

    // require('mathjax').init({
    //     loader: {load: ['input/tex', 'output/svg']}
    //   }).then((MathJax) => {
    //     const svg = MathJax.tex2svg(y, {display: true});
    //     console.log(MathJax.startup.adaptor.outerHTML(svg));
    //   }).catch((err) => console.log(err.message));