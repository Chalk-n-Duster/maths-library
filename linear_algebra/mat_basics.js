const nerdamer=require('nerdamer')
const {stringify,matrixTex,replaceAll}=require('./utils')


const buildFromFunc=(fun,x,y)=>{
    var flag=true
    fun=fun.toLowerCase()
    for(var i=0;i<fun.length;i++){
        if(fun.charAt(i).match(/[a-z]/i)){
            
            if(!(fun.charAt(i)==='i'||fun.charAt(i)==='j'))
                {
                    flag=false
                    break
                }
        }
    }
    if(!flag)
    return "Function\\, must\\,contain\\,only\\,i\\,j\\,as\\,variables"
    try{
    nerdamer.setFunction('f', ['i', 'j'], fun)
    var calc=[],ans=[]
    for(var i=1;i<=x;i++){
        var calcsub=[],anssub=[]
        for(var j=1;j<=y;j++){
            var res=nerdamer.convertToLaTeX(fun)
            
            res=replaceAll(res,'i',i.toString())
            res=replaceAll(res,'j',j.toString())
            calcsub.push(res)
            anssub.push(nerdamer('f('+i+','+j+')').toString())
        }
        // console.log(calcsub)
        calc.push(calcsub)
        ans.push(anssub)
    }
    var res=[]
    
    res.push("Putting\\, values\\, of\\,i\\,and\\,j")
    res.push(matrixTex(calc))
    res.push("Finally\\,,after\\,calculating")
    res.push(nerdamer(stringify(ans)).toTeX())
    return res.join('\\\\')
    }catch(err){
        return "Invalid\\,function "+err.message
    }

}



module.exports={buildFromFunc}