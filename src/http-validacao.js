function extraiLinks(arrLinks){
    return arrLinks.map((objetoLink)=>Object.values(objetoLink).join());
}

//criar uma função listaValidada
export default function listaValidada(listaDeLinks){
    return extraiLinks(listaDeLinks);
}