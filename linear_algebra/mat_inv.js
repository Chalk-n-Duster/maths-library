const nerdamer=require('nerdamer')
const {stringify}=require('./utils')

const elem_transformations=(mat,n)=>{
    const nerdmat=stringify(mat)
    var det=parseInt(nerdamer.determinant(nerdmat).toString(),10)
    steps=[]
    steps.push('\\det'+nerdamer(nerdmat).toTeX()+' = '+det)
    if(det==0){
        steps.push('Since, \\Delta = 0')
        steps.push('Therefore,\\, inverse\\, does\\, not\\, exist')
    }
    else{
        var augmtx=mat
        for(var i=0;i<n;i++){
            
            for(var j=0;j<n;j++){
                if(j==i)
                augmtx[j].push(1)
                else
                augmtx[j].push(0)
            }
            }
        steps.push('Augmented\\, matrix:')
        var nerdaug=stringify(augmtx)
        steps.push(nerdamer(nerdaug).toTeX())
        
        for(var i=0;i<n;i++){
            if(augmtx[i][i]!=1){
                
                var x=augmtx[i][i]
                steps.push('Dividing\\, row\\, '+(i+1)+' \\,by\\, '+nerdamer.convertToLaTeX(x.toString()))
                for(var j=0;j<2*n;j++)
                augmtx[i][j]/=x
                nerdaug=stringify(augmtx)
                steps.push(nerdamer(nerdaug).toTeX())
            }
            for(var j=0;j<n;j++){
                if(j==i||augmtx[j][i]==0)
                continue
                var x=augmtx[j][i]
                steps.push('Multiplying \\,row\\,'+(i+1)+'\\, by \\,'+nerdamer.convertToLaTeX(x.toString())+'\\, and\\,subtracting \\,row \\,'+(j+1)+' \\,by\\, that')
                for(var k=0;k<2*n;k++)
                augmtx[j][k]-=(x*augmtx[i][k])
                nerdaug=stringify(augmtx)
                steps.push(nerdamer(nerdaug).toTeX())
            }
        }
        steps.push('Finally,\\, inverse \\,is:')
        var inv=[]
        for(var i=0;i<n;i++)
        inv.push(augmtx[i].slice(n,2*n))
        var nerdinv=stringify(inv)
        console.log(augmtx)
        steps.push(nerdamer(nerdinv).toTeX())
        
    }
    return steps
}

const find_solutions=(mat,n)=>{
    var mainmat=[]
    for(var i=0;i<n;i++)
    mainmat.push(mat[i].slice(0,n))
    var nerdmat=stringify(mainmat)
    steps=[]
    steps.push('Main\\,matrix\\,='+nerdamer(nerdmat).toTeX())
    
    var det=parseInt(nerdamer.determinant(nerdmat).toString(),10)
    steps.push('\\det'+nerdamer(nerdmat).toTeX()+' = '+det)
    if(det==0){
        steps.push('Since,\\, \\Delta = 0')
        steps.push('Therefore,\\, inverse\\, does\\, not\\, exist')
        steps.push('Thus\\,, no\\, solution\\, exists\\,or\\,infinite\\,solutions\\,exist')
    }
    else{
        var inv=nerdamer.invert(nerdmat).toString()
        steps.push('inv'+nerdamer(nerdmat).toTeX()+' = '+nerdamer(inv).toTeX())
        steps.push('Now\\,,AX=B')
        steps.push('Therefore\\,,$X=A\\^-1 *B')
        var cofactor=[]
        for(var i=0;i<n;i++)
        cofactor.push([mat[i][n]])
        var ans=nerdamer(inv+'*'+stringify(cofactor)).toString()
        steps.push('X='+nerdamer(ans).toTeX())
    }
    return steps
}

module.exports={elem_transformations,find_solutions}

