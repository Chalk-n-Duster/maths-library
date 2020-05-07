const nerdamer=require('nerdamer')
const {stringify}=require('./utils')

const solveDet=(mat,n)=>{
  
    if(n==2){
        var ans=[]
        ans.push(nerdamer.convertToLaTeX(mat[0][0].toString()+'*'+mat[1][1].toString()+' - '+mat[0][1].toString()+'*'+mat[1][0].toString()))
        
        ans.push(nerdamer('determinant('+stringify(mat)+')').toTeX())
        return ans
    }
    else if(n>=3&&n<=6){
      var k=1
      var lines=[]
      for(var i=0;i<n;i++)
      lines.push('')
      for(var i=0;i<n;i++){
        var p=k*mat[0][i]
        // console.log(i)
        var cominor=[]
        for(var j=1;j<n;j++){
          var sublist=[]
          for(var m=0;m<n;m++){
            if(m==i)continue;
            sublist.push(mat[j][m])
            
          }
          cominor.push(sublist)
        }
        // console.log(i)
        var cominortex=nerdamer(stringify(cominor)).toTeX()
        if(i<n-1){
          lines[0]+=(nerdamer.convertToLaTeX('('+p.toString()+')')+cominortex+' + ')
          var subcomtex=solveDet(cominor,n-1)
          for(var j=0;j<n-1;j++){
            lines[j+1]+=(nerdamer.convertToLaTeX('('+p.toString()+')')+'*('+subcomtex[j]+') + ')
          }
        }
        else{
          lines[0]+=(nerdamer.convertToLaTeX('('+p.toString()+')')+cominortex)
          var subcomtex=solveDet(cominor,n-1)
          for(var j=0;j<n-1;j++){
            lines[j+1]+=(nerdamer.convertToLaTeX('('+p.toString()+')')+'*('+subcomtex[j]+')')
          }
        }
        
        k*=-1
        
      }
      var ans=nerdamer(nerdamer.convertFromLaTeX(lines[n-1])).toTeX()
      lines.push(ans)
      return lines
      
      
    }
    else{
      return [nerdamer('determinant('+stringify(mat)+')').toTeX()]
    }
   
}

module.exports={solveDet}