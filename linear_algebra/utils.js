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

  module.exports={stringify}