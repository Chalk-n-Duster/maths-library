const nerdamer=require('nerdamer')
const {stringify,matrixTex,replaceAll,stringTeX}=require('./utils')


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

const add=(m1,m2)=>{
    
    var steps=[],nm3=''
    if(m1.length!=m2.length||m1[0].length!=m2[0].length)
    steps.push(stringTeX('Matrices incompatible for addition'))
    else
    {
    const nm1=stringify(m1),nm2=stringify(m2)
    steps.push(matrixTex(m1)+'+'+matrixTex(m2))
    const m3=[]
    for(var i=0;i<m1.length;i++)
    {
        const m_row=[]
        m3.push(m_row)
        for(var j=0;j<m1[0].length;j++){
            if(m2[i][j]>=0)
            m_row.push(m1[i][j].toString()+'+'+m2[i][j].toString())
            else
            m_row.push(m1[i][j].toString()+m2[i][j].toString())
        }
        
    }
    steps.push('='+matrixTex(m3))
    const nm3=(nerdamer(nm1).add(nm2).toString())
    steps.push('='+nerdamer(nm3).toTeX())
}
    return {
        tex:steps.join('\\\\'),
        sum:nm3,
        
    }
}
const subtract=(m1,m2)=>{
    
    var steps=[],nm3=''
    if(m1.length!=m2.length||m1[0].length!=m2[0].length)
    steps.push(stringTeX('Matrices incompatible for subtraction'))
    else
    {
    const nm1=stringify(m1),nm2=stringify(m2)
    steps.push(matrixTex(m1)+'-'+matrixTex(m2))
    const m3=[]
    for(var i=0;i<m1.length;i++)
    {
        const m_row=[]
        m3.push(m_row)
        for(var j=0;j<m1[0].length;j++){
            if(m2[i][j]>=0)
            m_row.push(m1[i][j].toString()+'-'+m2[i][j].toString())
            else
            m_row.push(m1[i][j].toString()+'-('+m2[i][j].toString()+')')
        }
        
    }
    steps.push('='+matrixTex(m3))
    const nm3=(nerdamer(nm1).subtract(nm2).toString())
    steps.push('='+nerdamer(nm3).toTeX())
}
    return {
        tex:steps.join('\\\\'),
        diff:nm3,
        
    }
}

const multiply=(m1,m2)=>{
    
    var steps=[],nm3=''
    if(m1[0].length!=m2.length)
    steps.push(stringTeX('Matrices incompatible for multiplication'))
    else
    {
    const nm1=stringify(m1),nm2=stringify(m2)
    steps.push(matrixTex(m1)+'\\times'+matrixTex(m2))
    const m3=[]
    for(var i=0;i<m1.length;i++)
    {
        const m_row=[]
        m3.push(m_row)
        for(var j=0;j<m2[0].length;j++){
            var st='('
            for(var k=0;k<m2.length;k++){
                st+=(m1[i][k].toString()+'\\times'+m2[k][j].toString()+')')
                if(k!==m2.length-1)
                st+='+('
            }
            m_row.push(st)
        }
        
    }
    steps.push('='+matrixTex(m3))
    const nm3=(nerdamer(nm1).multiply(nm2).toString())
    steps.push('='+nerdamer(nm3).toTeX())
}
    return {
        tex:steps.join('\\\\'),
        product:nm3,
        
    }
}


const transpose=(mat)=>{
    if(typeof(mat)==='string')
    var nerdmat=mat
    else
    var nerdmat=stringify(mat)
    nerdamer.setVar('M',nerdmat)
    return {'tp':nerdamer('transpose(M)').toString(),'tex':nerdamer('transpose(M)').toTeX()}

}

const trace=(mat)=>{
    const steps=[]
    var st='tr(A)= '
    var ans=0
    for(var i=0;i<mat.length;i++){
        if(i==mat.length-1)
        st+=mat[i][i]
        else
        st+=(mat[i][i]+' + ')
        ans+=mat[i][i]
    }
    steps.push(stringTeX(st))
    steps.push(stringTeX('= '+ans))
    return {'trace':ans,'tex':steps.join('\\\\')}
}

const adjoint=(mat,n)=>{
    const steps=[]
    const step1mat=[]
    const step2mat=[]
    for(var i=0;i<n;i++){
        var step1matrow=[],step2matrow=[]
        for(var j=0;j<n;j++){
        
        var cofmat=[]
        for(var k=0;k<n;k++){
            if(k==i)continue;
            var cofmatrow=[]
            for(var l=0;l<n;l++){
                if(l==j)continue;
                cofmatrow.push(mat[k][l])
            }
            cofmat.push(cofmatrow)
        }
        if((i+j)%2==0){
            step1matrow.push('det'+matrixTex(cofmat))
            step2matrow.push(nerdamer('determinant('+stringify(cofmat)+')').toString())
        }
        else{
            step1matrow.push('(-)det'+matrixTex(cofmat))
            step2matrow.push(nerdamer('determinant('+stringify(cofmat)+')').multiply(-1).toString())
        }
    }
    step1mat.push(step1matrow)
    step2mat.push(step2matrow)
    }
    steps.push(stringTeX('Calculating cofactor matrix:'))
    steps.push(matrixTex(step1mat))
    steps.push(stringTeX('After calculating all determinants,'))
    steps.push(matrixTex(step2mat))
    steps.push(stringTeX('Finally, adjoint of matrix is transpose of the cofactor matrix'))
    steps.push(stringTeX('\\therefore adj(A)='))
    var tr=transpose(step2mat)
    steps.push(tr['tex'])
    return {'adj':tr['tp'],'tex':steps.join('\\\\')}
}

const isOrthogonal=(mat)=>{
    if(typeof(mat)==='string')
    var nerdmat=mat
    else
    var nerdmat=stringify(mat)
    nerdamer.setVar('M',nerdmat)

    if(nerdamer('invert(M)').toString()===nerdamer('transpose(M)').toString())
    return true
    else
    return false
}
const isInvolutory=(mat)=>{
    if(typeof(mat)==='string')
    var nerdmat=mat
    else
    var nerdmat=stringify(mat)
    nerdamer.setVar('M',nerdmat)
    
    if(nerdamer('invert(M)').toString()===nerdmat)
    return true
    else
    return false
}
const isSymmetric=(mat)=>{
    if(typeof(mat)==='string')
    var nerdmat=mat
    else
    var nerdmat=stringify(mat)
    nerdamer.setVar('M',nerdmat)
  
    if(nerdamer('transpose(M)').toString()===nerdmat)
    return true
    else
    return false
}
const isSkewSymmetric=(mat)=>{
    if(typeof(mat)==='string')
    var nerdmat=mat
    else
    var nerdmat=stringify(mat)
    nerdamer.setVar('M',nerdmat)
  
    if(nerdamer('transpose(M)*-1').toString()===nerdmat)
    return true
    else
    return false
}
const isIdempotent=(mat)=>{
    if(typeof(mat)==='string')
    var nerdmat=mat
    else
    var nerdmat=stringify(mat)
    
    
    if(nerdamer(nerdmat+'*'+nerdmat).toString()===nerdmat)
    return true
    else
    return false
}
const isNilpotent=(mat,n)=>{
    if(typeof(mat)==='string')
    var nerdmat=mat
    else
    var nerdmat=stringify(mat)
   
    var zeromat=nerdamer('imatrix('+n+')-imatrix('+n+')').toString()
    var temp=nerdmat
    for(var i=1;i<=n;i++){
        if(temp==zeromat)
        return {'isNilpotent':true,'index':i}
        temp=nerdamer(temp+'*'+nerdmat).toString()
    }
    return {'isNilpotent':false,'index':-1}
    
}
const isSingular=(mat)=>{
    if(typeof(mat)==='string')
    var nerdmat=mat
    else
    var nerdmat=stringify(mat)
    if(nerdamer('determinant('+nerdmat+')').toString()==='0')
    return true
    else
    return false
    
}


module.exports={buildFromFunc,add,subtract,multiply,transpose,trace,adjoint,isOrthogonal,isInvolutory,isSymmetric,isSkewSymmetric,isIdempotent,isNilpotent,isSingular}