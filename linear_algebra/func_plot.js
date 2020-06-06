window.d3 = require('d3')
const functionPlot = require('function-plot')
const root = document.querySelector("#root");

const plot_vector=(veclist)=>{
    data=veclist.map(ele=>{
        return {
            vector: ele,
            // offset: [1, 2],
            graphType: 'polyline',
            fnType: 'vector'
        }
    })
    functionPlot({
        target: root,
        width: 580,
        height: 400,
        xAxis: { domain: [-10, 20] },
        grid: true,
        data: data
    })
    
}

module.exports={plot_vector}
