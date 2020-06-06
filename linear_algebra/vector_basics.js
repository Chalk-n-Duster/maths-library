const nerdamer=require('nerdamer')
const {v_stringify,stringTeX,vectorTex,matrixTex}=require('./utils')

const add=(v1,v2)=>{
    var steps=[]
    const nv1=v_stringify(v1),nv2=v_stringify(v2)
    // console.log(nv1,nv2)
    steps.push('('+vectorTex(v1)+')+('+vectorTex(v2)+')')
    const v3=[]
    for(var i=0;i<3;i++)
    {
        if(v2[i]>=0)
        v3[i]='('+v1[i].toString()+'+'+v2[i].toString()+')'
        else
        v3[i]='('+v1[i].toString()+v2[i].toString()+')'
    }
    steps.push('='+vectorTex(v3))
    const nv3=JSON.parse(nerdamer(nv1).add(nv2).toString())
    steps.push('='+vectorTex(nv3))
    return {
        tex:steps.join('\\\\'),
        sum:nv3,
        plot:[
            {
                type:'vector',
                vector:v1
            },
            {
                type:'vector',
                vector:v2,
                offset:v1
            },
            {
                type:'vector',
                vector:nv3
            }
        ]
    }
}

const subtract=(v1,v2)=>{
    var steps=[]
    const nv1=v_stringify(v1),nv2=v_stringify(v2)
    // console.log(nv1,nv2)
    steps.push('('+vectorTex(v1)+')-('+vectorTex(v2)+')')
    const v3=[]
    for(var i=0;i<3;i++)
    {
        if(v2[i]>=0)
        v3[i]='('+v1[i].toString()+'-'+v2[i].toString()+')'
        else
        v3[i]='('+v1[i].toString()+'-('+v2[i].toString()+'))'
    }
    steps.push('='+vectorTex(v3))
    const nv3=JSON.parse(nerdamer(nv1).subtract(nv2).toString())
    steps.push('='+vectorTex(nv3))
    return {
        tex:steps.join('\\\\'),
        diff:nv3,
        plot:[
            {
                type:'vector',
                vector:v1
            },
            {
                type:'vector',
                vector:v2,
            },
            {
                type:'vector',
                vector:nv3
            }
        ]
    }
}
const scal_mult=(a,v)=>{
    var steps=[]
    const nv=v_stringify(v)
    // console.log(nv1,nv2)
    steps.push(a.toString()+'*('+vectorTex(v)+')')
    const v3=[]
    for(var i=0;i<3;i++)
    v3[i]='('+a.toString()+'*'+v[i].toString()+')'
    steps.push('='+vectorTex(v3))
    const nv3=JSON.parse(nerdamer(a).multiply(nv).toString())
    steps.push('='+vectorTex(nv3))
    return {
        tex:steps.join('\\\\'),
        product:nv3,
        plot:[
            {
                type:'vector',
                vector:nv3
            }
        ]
    }
}
const dot_product=(v1,v2)=>{
    var steps=[]
    const nv1=v_stringify(v1),nv2=v_stringify(v2)
    // console.log(nv1,nv2)
    steps.push('('+vectorTex(v1)+')\\cdot('+vectorTex(v2)+')')
    const v3=[]
    for(var i=0;i<3;i++)
    v3[i]='('+v1[i].toString()+'*'+v2[i].toString()+')'
    steps.push('='+v3.join('+'))
    const nv3=(nerdamer.dot(nv1,nv2).toString())
    steps.push('='+(nv3))
    return {
        tex:steps.join('\\\\'),
        product:nv3,
      
    }
}
const cross_product=(v1,v2)=>{
    var steps=[]
    const nv1=v_stringify(v1),nv2=v_stringify(v2)
    // console.log(nv1,nv2)
    steps.push('('+vectorTex(v1)+')\\times('+vectorTex(v2)+')')
    const v3=[['\\hat\\imath','\\hat\\jmath','\\hat k'],v1,v2]
    
    steps.push('=\\,det'+matrixTex(v3))
    const nv3=JSON.parse(nerdamer.cross(nv1,nv2).toString())
    steps.push('='+vectorTex(nv3))
    return {
        tex:steps.join('\\\\'),
        prod:nv3,
        plot:[
            {
                type:'vector',
                vector:v1
            },
            {
                type:'vector',
                vector:v2,
            },
            {
                type:'vector',
                vector:nv3
            }
        ]
    }
}

module.exports={add,subtract,scal_mult,dot_product,cross_product}