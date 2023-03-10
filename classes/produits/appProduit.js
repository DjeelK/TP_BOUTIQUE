import { writeFileSync , readFileSync } from "fs"
import { Produit } from "./produits.js"

export class appProduit {
    constructor(){
        this.produits = []
        this.compteur = 0
        this.file = "dataProduits.json"
    }

    lire(){
        const contenuProduits = readFileSync(this.file).toString()
        this.produits = JSON.parse(contenuProduits)
        this.compteur = (this.produits[this.produits.length-1]!=undefined ? this.produits[this.produits.length-1].id : 0)
    }

    ecrire(){
        writeFileSync(this.file,JSON.stringify(this.produits))
    }

    creationProduit(titre,prix,stock){
        const produit = new Produit (++this.compteur,titre,prix,stock)
        this.produits.push(produit)
        this.ecrire()
    }

    afficherProduitParId(id){
        return this.produits.find(p => p.id ==id)

}

}