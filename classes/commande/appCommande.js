import { writeFileSync , readFileSync } from "fs"
import { Commande } from "./commandes.js"

export class appCommande {
    constructor(){
        this.commandes = []
        this.compteur = 0
        this.file = "dataCommandes.json"
    }

    lire(){
        const contenuCommandes = readFileSync(this.file).toString()
        this.commandes = JSON.parse(contenuCommandes)
        this.compteur = (this.commandes[this.commandes.length-1] != undefined ? this.commandes[this.commandes.length-1].id : 0)
    }
    
    ecrire(){
        writeFileSync(this.file, JSON.stringify(this.commandes))
    }
    
    creationCommande(client, listeProduits) {
        const commande = new Commande(++this.compteur, client, listeProduits)
        this.commandes.push(commande)
        this.ecrire()
    }
    
    afficherCommandeParId(id) {
        return this.commandes.find(c => c.id ==id)

    }

    afficherCommandesParClientId(clientId) {
        return this.commandes.filter(c => c.client.id == clientId)
    }
    
    afficherCommandes() {
        return this.commandes
    }

    //Méthodes pour modifier le compteur qui va permettre d'incrémenter ou décrémenter en fonction de l'ajout ou la supp

    ajouterProduitACommande(commandeId, produit) {
        const commande = this.afficherCommandeParId(commandeId)
        if (commande) {
        commande.listeProduits.push(produit)
        this.ecrire()
        }
    }

    retirerProduitDeCommande(commandeId, produitId) {
        const commande = this.afficherCommandeParId(commandeId)
        if (commande) {
        commande.listeProduits = commande.listeProduits.filter(p => p.id != produitId)
        this.ecrire()
        }
    }
}
