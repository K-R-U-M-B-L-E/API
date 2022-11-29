catalogue = db.getSiblingDB('krumble-catalogue');

// [VOCABULAIRE] collection = table SQL
catalogue.createCollection('associations');
    // permet d'avoir un index lors de l'insersation d'un nouveau doc dans la collection
    // obligatoire pour que mongo puisse insérer sans qu'on lui fournisse de clé primaire (_id)
catalogue.associations.createIndex(
      { name: "text" }
);