import fs from "fs";

import chalk from 'chalk';

// const textoTeste='São geralmente recuperados a partir de um objeto [FileList](https://developer.mozilla.org/pt-BR/docs/Web/API/FileList) que é retornado como resultado da seleção, pelo usuário, de arquivos através do elemento [<input>](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input), a partir do objeto [DataTransfer](https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer) utilizado em operações de arrastar e soltar, ou a partir da API `mozGetAsFile()` em um [HTMLCanvasElement](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement). Em Gecko, códigos com privilégiios podem criar objetos File representando qualquer arquivo local sem a intereção do usuário (veja [Implementation notes](https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes) para mais informações.).'

function extraiLinks (texto){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.]*[^\s]*)\)/gm;

    // const capturas=texto.match(regex);
    //const capturas=regex.exec(texto);
    // const capturas=texto.matchAll(regex);

    //operador de espalhamento
    const capturas=[...texto.matchAll(regex)];

    const resultados=capturas.map(captura=>({[captura[1]]:captura[2]}))

    // console.log(capturas);
    // console.log(resultados);
    return resultados.length!==0?resultados:"Não há links no arquivo";

}

// extraiLinks(texto);

// console.log(chalk.blue('Olá, mundo!'));

// console.log(chalk.blue.bgWhite.bold("SENAI"));

// console.log(chalk.blue('Curso', 'de', 'Node.JS'));

// console.log(chalk.red('vermelho', chalk.underline.bgBlue('azul')));

// console.log(`
// CPU: ${chalk.red('90%')}
// RAM: ${chalk.green('40%')}
// DISK: ${chalk.yellow('70%')}
// `);

//2) tratamento de erros, função para tratar dos erros
function trataErro(erro){
    console.log(erro);
    throw new Error(chalk.red(erro.code,"Não há arquivo no diretório"));
}

//1) escrever uma function que traga arquivos .md
// function pegaArquivo(caminhoDoArquivo){
//     const encoding="utf-8";
//     fs.readFile(caminhoDoArquivo, encoding, (erro,texto)=>{
//         if(erro){
//             trataErro(erro)
//         }
//         console.log(chalk.green(texto));
//     })
// }

// pegaArquivo('./arquivos/');
//callback(erro, texto)

//------------------------------ Aula sobre Promessas -----inserir método assincrono no código
//1) reescrevendo (refatorando)
// function pegaArquivo(caminhoDoArquivo){
//     const encoding='utf-8';
//     fs.promises.readFile(caminhoDoArquivo,encoding)
//     .then((texto)=>console.log(chalk
//         .yellow(texto)))
//         .catch((erro)=>trataErro(erro));
// }
// pegaArquivo('./arquivos/texto.md');

//------------------------------ Usando outra forma de solucionar as promessas (async/await)

async function pegaArquivo(caminhoDoArquivo){
    try{
        const encoding = "utf-8";
        const texto=await fs.promises.readFile(caminhoDoArquivo,encoding);
        //1)console.log(extraiLinks(texto));
        return extraiLinks(texto);
    } catch(erro) {
        trataErro(erro);
    } finally {
        console.log(chalk.magenta("Operação concluída"));
    }
}

// pegaArquivo('./arquivos/');
// pegaArquivo('./arquivos/texto.md');
export default pegaArquivo;