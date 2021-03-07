export class FileTesto {
    percorso = "";
    nome = "";
    costrutto: string = "";
    importazioni:string="";
    constructor(percorso: string, nome: string, 
        costrutto: string, importazione:string) {
        this.percorso = percorso;
        this.nome = nome;
        this.costrutto = costrutto;
        this.importazioni= importazione;
    }
    Print(){
        return `nome : ${this.nome} ; percorso : ${this.percorso}`;
    }
}
