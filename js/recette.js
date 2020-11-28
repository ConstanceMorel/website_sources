// Database :)
function ListLunch() {
  return {
    risotto: {
      name: "Risotto",
      nb_person: 4,
      recipe: {
        "Cube de bouillon": 2,
        Oignon: 1,
        Echalotte: 1,
        Beurre: "40g",
        "Riz Risotto": "320g",
        "Vin blanc": "100mL",
        Fenouil: 1,
        Champignons: "100g",
        "Crème fraîche": "50g",
        Parmesan: "100g",
      },
      formula: ["TODO"],
    },
    "poulet-moutarde": {
      name: "Poulet moutarde",
      nb_person: 4,
      recipe: {
        "Escalope de poulet": 4,
        "Crème fraîche": "5cL",
      },
      formula: [
        "Faire cuire à feu moyen les escalopes de poulet dans une poêle avec une noisette de beurre",
        "Dans un bol, mélangez la crème fraîche, la moutarde et le poivre",
        "Dans une petite casserole, faite chauffer queslques instants la sauce à feu doux",
        "Nappez les escalopes de poulet de sauce.",
      ],
    },
    "chili-con-carne": {
      name: "Chili con carne",
      nb_person: 6,
      recipe: {
        Oignon: 1,
        "Viande hachée": "400g",
        "Haricots rouges": "400g",
        "Tomates pelées": "400g",
        Tomates: 2.5,
        Maïs: "400g",
      },
      formula: ["todo"],
    },
    lasagnes: {
      name: "Lasagnes",
      nb_person: 6,
      recipe: {
        Oignon: 1,
        "Viande hachée": "400g",
        "Huile d'olives": "5cL",
        "Tomates pelées": "500g",
        Farine: "50g",
        Beurre: "50g",
        Lait: "50cL",
      },
      formula: ["todo"],
    },
    crepes: {
      name: "Crêpes",
      nb_person: 2,
      recipe: {
        Farine: "250g",
        Oeuf: 4,
        Lait: "25cL",
        Bière: "25cL",
      },
      formula: [
	  	"Mélanger énergiquement tout sauf la bière",
		"Ajouter la bière et mélanger doucement",
	  ],
    },
  };
}
function ListDinner() {
  return {
    "pate-carbo": {
      name: "Pâtes à la Carbonara",
      nb_person: 2,
      recipe: {
        "Crème fraîche": "25cL",
        Oeuf: 2,
        Lardons: "125g",
        Oignon: 1,
        Pâtes: "250g",
      },
      formula: ["todo"],
    },
    pizza: {
      name: "Pizza",
      nb_person: 4,
      recipe: {
        "Pâte à pizza": 1,
        "Sauce tomate": 0.5,
        Champignons: "100g",
        Jambon: 2,
        Gruyère: "50g",
      },
      formula: ["todo"],
    },
    "tarte-tomate": {
      name: "Tarte à la tomate",
      nb_person: 4,
      recipe: {
        "Pâte brisée": 1,
        Tomate: 5,
        Gruyère: "50g",
      },
      formula: ["todo"],
    },
    quiche: {
      name: "Quiche",
      nb_person: 4,
      recipe: {
        "Pâte brisée": 1,
        Oeuf: 3,
        Lardons: "200g",
        "Crème fraîche": "20cL",
        Lait: "20cL",
      },
      formula: ["todo"],
    },
    "tarte-poireaux": {
      name: "Tarte aux poireaux",
      nb_person: 4,
      recipe: {
        "Pâte brisée": 1,
        Poireaux: 3,
        Gruyère: "50g",
        "Crème fraîche": "5cL",
        Oeuf: 1,
      },
      formula: ["todo"],
    },
    "tarte-flambee": {
      name: "Tarte flambée",
      nb_person: 4,
      recipe: {
        Farine: "250g",
        Huile: "5cL",
        Oignon: 2,
        Lardons: "200g",
        "Fromage blanc": "100g",
        "Crème fraîche": "10cL",
        Gruyère: "50g",
      },
      formula: ["todo"],
    },
    "cake-jambon-olive": {
      name: "Cake Jambon Olive",
      nb_person: 4,
      recipe: {
        Farine: "150g",
        Jambon: "200g",
        "Olives vertes": "150g",
        Gruyère: "75g",
        Oeuf: 4,
        Lait: "10cL",
        "Levure chimique": 1,
      },
      formula: ["todo"],
    },
    "cake-menthe-feta": {
      name: "Cake Menthe Féta",
      nb_person: 4,
      recipe: {
        Farine: "150g",
        "Menthe fraîche": 1,
        Féta: "200gg",
        Oeuf: 4,
        "Huile d'olives": "10cL",
        "Crème fraîche": "15cL",
        "Levure chimique": 1,
        Concombre: 1,
      },
      formula: ["todo"],
    },
  };
}
