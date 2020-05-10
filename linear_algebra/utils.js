const stringify=(mat)=>{
    // console.log(mat)
    var st='matrix('
    for(var i=0;i<mat.length;i++){
      st+=('['+mat[i].toString()+']')
      if(i!=mat.length-1)
      st+=','
  
    }
    st+=')'
    return st
  }

  const matrixTex=(mat)=>{
    var st='\\begin{vmatrix}'
    for(var i=0;i<mat.length;i++){
      for(var j=0;j<mat[i].length;j++){
        if(j==mat[i].length-1)
        st+=(mat[i][j].toString())
        else
        st+=(mat[i][j].toString()+' & ')
      }
      if(i==mat.length-1)
      st+=('\\end{vmatrix}')
      else
      st+=(' \\cr ')
    }
    return st
  }
  function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }
  function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
  }
  function stringTeX(str){
    return replaceAll(str,' ','\\,')
  }

  module.exports={stringify,matrixTex,replaceAll,stringTeX}