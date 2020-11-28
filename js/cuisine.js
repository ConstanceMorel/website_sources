/// DRAW
function GenerateHTMLDropdownElement(e_type, e_className, e_key, e_textContent) {
    var element = document.createElement(e_type);
    element.className = e_className;
    element.id = e_key;
    element.setAttribute("onclick", "LunchDropDownUpdate(this)");
    if (e_textContent) {
        element.textContent = e_textContent;
    }
    return element.outerHTML;
}

function GenerateHTMLElement(e_type, e_className, e_textContent, e_innerHTML) {
    var element = document.createElement(e_type);
    element.className = e_className;
    if (e_textContent) {
        element.textContent = e_textContent;
    }
    if (e_innerHTML) {
        element.innerHTML = e_innerHTML;
    }
    return element.outerHTML;
}

function DrawMeal(text, key) {
    return GenerateHTMLDropdownElement(
        "a",
        "dropdown-item",
        key,
        text["name"] + " - " + text["nb_person"] + " Personnes")
}
function DrawDropDownLunch() {
    var lunchs = ListLunch();
    var dropdownHTML = "";
    for (var key in lunchs) {
        dropdownHTML += DrawMeal(lunchs[key], key);
    }
    document.getElementById("lunch").innerHTML = dropdownHTML;
}
function DrawDropDownDinner() {
    var lunchs = ListDinner();
    var dropdownHTML = "";
    for (var key in lunchs) {
        dropdownHTML += DrawMeal(lunchs[key], key);
    }
    document.getElementById("dinner").innerHTML = dropdownHTML;
}

function DrawListing() {
    var lunchs = ListLunch();
    var dinners = ListDinner();
    var meals = Object.assign(lunchs, dinners)
    var ListHTML = "";
    for (var key in basketCRUD.getAll()) {
        ListHTML += GenerateHTMLElement("div", "", meals[key]["name"] + "  x" + basketCRUD.get(key));
    }
    document.getElementById("listing").innerHTML = ListHTML;
}
function DrawRecipe() {
    var full_recipe = GetFullRecipe()
    var RecipeHTML = "";
    for (var key in full_recipe) {
        RecipeHTML += GenerateHTMLElement(
            "div",
            "",
            key + "  " + full_recipe[key]
        );
    }
    document.getElementById("recipe").innerHTML = RecipeHTML;
}

// EVENTS
function LunchDropDownUpdate(origin) {
    basketCRUD.increment(origin.id);
    DrawListing();
    DrawRecipe();
}

function Dropall() {
    basketCRUD.deleteAll();
    DrawListing();
    DrawRecipe();
}


/// CRUD
var basketCRUD = {
    create: function() {
        sessionStorage.setItem("basket", "{}");
        return true;
    },
    deleteAll: function() {
        sessionStorage.removeItem("basket");
        return true;
    },
    getAll: function() {
        if (sessionStorage.getItem("basket") == null) {
            this.create();
        }
        return JSON.parse(sessionStorage.getItem("basket"));
    },
    get: function(key) {
        return this.getAll()[key];
    },
    delete: function(key) {
        var lunch = this.getAll();
        delete lunch[key];
        sessionStorage.setItem("basket", JSON.stringify(lunch));
        return true;
    },
    update: function(key, value) {
        var lunch = this.getAll();
        lunch[key] = value;
        sessionStorage.setItem("basket", JSON.stringify(lunch));
        return true;
    },
    increment: function(key) {
        var lunch = this.get(key);
        if (lunch == null) {
            lunch = 0;
        }
        this.update(key, lunch + 1)
        return true;
    },
};

function GetFullRecipe() {
    var lunchs = ListLunch();
    var dinners = ListDinner();
    var meals = Object.assign(lunchs, dinners)
    var fullRecipe = {};
    for (var key in basketCRUD.getAll()) {
        for (var ingredient in meals[key]["recipe"]) {
            if (fullRecipe[ingredient] == null) {
                fullRecipe[ingredient] = 0
            }
            fullRecipe[ingredient] += meals[key]["recipe"][ingredient] * basketCRUD.get(key)
        }
    }
    return fullRecipe;
}

// Database :)
function ListLunch() {
    return {
        "meal-1": {
            name: "Repas 1",
            nb_person: 4,
            recipe: {
                "farine": 50,
                "oeufs": 3,
                "lait": 50
            }
        },
        "meal-2": {
            name: "Repas 2",
            nb_person: 4,
            recipe: {
                "farine": 50,
                "oeufs": 3,
                "lait": 50
            }
        }
    }
}
function ListDinner() {
    return {
        "meal-3": {
            name: "Repas 3",
            nb_person: 4,
            recipe: {
                "farine": 50,
                "oeufs": 3,
                "lait": 50
            }
        },
        "meal-4": {
            name: "Repas 4",
            nb_person: 4,
            recipe: {
                "farine": 50,
                "oeufs": 3,
                "lait": 50
            }
        }
    }
}