import { FileTesto } from "./FileTesto";


export class Cartella {
    percorso = "";
    nome = "";
    listaCartella: Cartella[] = [];
    listaFile: FileTesto[] = [];
    constructor(percorso: string, nome: string) {
        this.nome = nome;
        this.percorso = percorso;
    }
    Print() {
        let ritorno: string = "";
        ritorno = `percorso : ${this.percorso} ;
nome : ${this.nome} ; `;
        let ritTmp = "" + "\n";
        for (let index = 0; index < this.listaCartella.length; index++) {
            const element = this.listaCartella[index];
            ritTmp = ritTmp + element.Print() + "\n";
        }
        for (let index = 0; index < this.listaFile.length; index++) {
            const element = this.listaFile[index];
            ritTmp = ritTmp + element.Print() + "\n";            
        }
        return ritorno + ritTmp;
    }
}
