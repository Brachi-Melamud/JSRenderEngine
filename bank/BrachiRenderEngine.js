function BrachiRender(template, dataArr) {
    let h= '';
    let regex =/\[(.*)\]/g;
    let propertiesInTemplate = template.match(regex);
    for (let i=0; i<propertiesInTemplate.length; i++){
        let p = propertiesInTemplate[i];
        p=p.replace('[','').replace(']','');
        propertiesInTemplate[i]=p;
    }
            
    dataArr.forEach(item => {
        let itemHTML= template
        propertiesInTemplate.forEach(p=>{
            let propValue= item[p]
            itemHTML= itemHTML.replace(`[${p}]`,propValue);
        })
        h+=itemHTML;
  });
  return h
}
