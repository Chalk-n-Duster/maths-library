const nerdamer=require('nerdamer')
const {stringify,stringTeX}=require('./utils')

const findRank=(mat,m,n)=>{
    var rank=n
    var steps=[]
    steps.push(stringTeX('Initially let rank be '+rank+' ,i.e. the number of columns'))

    for(var i=0;i<rank;i++){
       
            
            var x=mat[i][i]
            if(x.toString()!=='0'){
            
            steps.push(stringTeX('For row '+(i+1)+', element ('+(i+1)+','+(i+1)+') is non-zero, so using elementary row transormations'))
            steps.push('Dividing\\, row\\, '+(i+1)+' \\,by\\, '+nerdamer.convertToLaTeX(x.toString()))
            for(var j=0;j<m;j++)
            mat[i][j]=nerdamer(mat[i][j]).divide(x).toString()
            nerdaug=stringify(mat)
            steps.push(nerdamer(nerdaug).toTeX())
        
        for(var j=0;j<m;j++){
            if(j==i||mat[j][i]==0)
            continue
            var x=mat[j][i]
            steps.push('Multiplying \\,row\\,'+(i+1)+'\\, by \\,'+nerdamer.convertToLaTeX(x.toString())+'\\, and\\,subtracting \\,row \\,'+(j+1)+' \\,by\\, that')
            for(var k=0;k<rank;k++)
            mat[j][k]=nerdamer(mat[j][k]).subtract(nerdamer(x).multiply(mat[i][k]))
            nerdaug=stringify(mat)
            steps.push(nerdamer(nerdaug).toTeX())
        }
        }
        else{
            
            var reduce=true
            for(j=i+1;j<m;j++){
                if(mat[j][i]!==0){
                    steps.push(stringTeX('Element ('+(i+1)+','+(i+1)+') is zero but element ('+(j+1)+','+(i+1)+') is non-zero so swapping rows '+(i+1)+' and '+(j+1)))
                    reduce=false
                    var temp=mat[j]
                    mat[j]=mat[i]
                    mat[i]=temp
                    nerdaug=stringify(mat)
                    steps.push(nerdamer(nerdaug).toTeX())
                    break
                }
            }
            if(reduce){
                rank--
                steps.push(stringTeX('Element ('+(i+1)+','+(i+1)+') is zero but there are no non-zero elements below it, therefore swapping with last column and reducing rank'))
                steps.push(stringTeX('New rank = '+rank))
                for (var j = 0; j < m; j ++) 
                    mat[j][i] = mat[j][rank]
                for (var j = 0; j < m; j ++) 
                    mat[j].pop()
                    nerdaug=stringify(mat)
                    steps.push(nerdamer(nerdaug).toTeX())
            }
        }
    }
    steps.push(stringTeX('Finally, Rank of matrix = '+rank))
    return steps.join('\\\\')
}

module.exports={findRank}