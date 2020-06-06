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

  const v_stringify=(v)=>{
    // console.log(mat)
    var st='vector('
    for(var i=0;i<v.length;i++){
      st+=v[i].toString()
      if(i!=v.length-1)
      st+=','
  
    }
    st+=')'
    return st
  }

  const vectorTex=(v)=>{
    var tex=''
    for(var i=0;i<3;i++){
      if(i>0&&typeof(v[i])==='string')
      tex+='+'
      else if(i>0&&v[i]>=0)
      tex+='+'
        if(i==0)
        tex+=(v[i].toString()+'\\hat\\imath')
        else if(i==1)
        tex+=(v[i].toString()+'\\hat\\jmath')
        else if(i==2)
        tex+=(v[i].toString()+'\\hat k')
      
      
    }
    return tex
  }

  module.exports={stringify,matrixTex,replaceAll,stringTeX,v_stringify,vectorTex}