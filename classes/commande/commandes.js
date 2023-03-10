export class Commande {
    constructor(id,client,listeProduits){
        this.id = id
        this.client= client 
        this.listeProduits = listeProduits
        this.compteur = 0;
    }
}