const nerdamer=require('nerdamer')
const {stringify,stringTeX}=require('./utils')

const pow=(mat,n,x)=>{
    if(typeof(mat)==='string')
    var nerdmat=mat
    else
    var nerdmat=stringify(mat)
    var steps=[]
    var res=nerdamer('imatrix('+n+')').toString()
    var power=1,temp=x,powy=0
    steps.push(stringTeX('Initialising result as identity matrix'))
    steps.push('I=\\,'+nerdamer(res).toTeX())
    while(x>0){
        if(x&1){
            powy+=power
            steps.push(stringTeX('Setting result as (result*A^{'+power+'}) = A^{'+powy+'}'))
            steps.push('='+nerdamer(res).toTeX()+'*'+nerdamer(nerdmat).toTeX())
            res=nerdamer(res+'*'+nerdmat).toString()
            steps.push('='+nerdamer(res).toTeX())
        }
        if(powy===temp)
        break
        x=x>>1
        power=power<<1
        steps.push(stringTeX('Calculating A^{'+power+'}'))
        steps.push('='+nerdamer(nerdmat).toTeX()+'*'+nerdamer(nerdmat).toTeX())
        nerdmat=nerdamer(nerdmat+'*'+nerdmat).toString()
        steps.push('='+nerdamer(nerdmat).toTeX())
    }
    steps.push(stringTeX('\\therefore A^{'+temp+'} = ')+nerdamer(res).toTeX())
    return {'power':res,'tex':steps.join('\\\\')}
}
module.exports={pow}