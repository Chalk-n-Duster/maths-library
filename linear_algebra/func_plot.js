window.d3 = require('d3')
const functionPlot = require('function-plot')
const root = document.querySelector("#root");

const plot_vector=(x,y)=>{
    functionPlot({
        target: root,
        xAxis: { domain: [-10, 10] },
        grid: true,
        data: [{
            vector: [x,y],
            // offset: [1, 2],
            graphType: 'polyline',
            fnType: 'vector'
        }]
    })
    
}

module.exports={plot_vector}
