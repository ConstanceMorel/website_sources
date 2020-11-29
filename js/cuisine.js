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

function GenerateHTMLCollapseElement(meals, key) {
  var drop = document.createElement("div");
  drop.innerHTML = '<i class="fas fa-trash ml-2 mr-1" id=' + key + ' onclick="DropOne(this)"></i> ';

  var textArea = document.createElement("div");
  textArea.setAttribute("data-toggle", "collapse");
  textArea.setAttribute("href", "#collapse" + key);
  textArea.setAttribute("role", "button");
  textArea.setAttribute("aria-expanded", "false");
  textArea.setAttribute("aria-controls", "collapse" + key);
  textArea.setAttribute("onclick", "UpdateColListing(this)");
  textArea.innerHTML = "<b>" + meals[key]["name"] + "</b>  x" + basketCRUD.get(key);

  var collapse = document.createElement("div");
  collapse.className = "collapse";
  collapse.id = "collapse" + key;
  var full_formula = "";
  for (var i in meals[key]["formula"]) {
    index = parseInt(i) + 1;
    full_formula += index + ". " + meals[key]["formula"][i] + "<br><br>";
  }
  var recipe = '<p class="m-0">';
  recipe += "Nombre de personnes: " + meals[key]["nb_person"] + "<br><br>";
  for (var ingredient in meals[key]["recipe"]) {
    recipe += "<b>" + ingredient + "</b> " + meals[key]["recipe"][ingredient] + ", ";
  }
  recipe += "</p>";
  collapse.innerHTML = GenerateHTMLElement("div", "card card-body formula-ingredient", "", recipe) + GenerateHTMLElement("div", "card card-body formula", "", full_formula);

  return GenerateHTMLElement("div", "row", "", drop.outerHTML + textArea.outerHTML + collapse.outerHTML);
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
  return GenerateHTMLDropdownElement("a", "dropdown-item", key, text["name"] + " - (" + text["nb_person"] + ")");
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
  var meals = Object.assign(lunchs, dinners);
  var ListHTML = "";
  for (var key in basketCRUD.getAll()) {
    ListHTML += GenerateHTMLCollapseElement(meals, key);
  }
  document.getElementById("listing").innerHTML = ListHTML;
}
function DrawRecipe() {
  var full_recipe = GetFullRecipe();
  var RecipeHTML = "";
  for (var key in full_recipe) {
    if (full_recipe[key]["unit"] != null) {
      full_recipe[key]["value"] += full_recipe[key]["unit"];
    }
    RecipeHTML += GenerateHTMLElement("div", "", "", "<b>" + key + "</b>  " + full_recipe[key]["value"]);
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

function DropOne(origin) {
  basketCRUD.delete(origin.id);
  DrawListing();
  DrawRecipe();
}

function UpdateColListing(origin) {
  if (origin.getAttribute("aria-expanded") == "true") {
    document.getElementById("listing").className = "col-6";
  } else {
    document.getElementById("listing").className = "col-12";
  }
}

/// CRUD
var basketCRUD = {
  create: function () {
    sessionStorage.setItem("basket", "{}");
    return true;
  },
  deleteAll: function () {
    sessionStorage.removeItem("basket");
    return true;
  },
  getAll: function () {
    if (sessionStorage.getItem("basket") == null) {
      this.create();
    }
    return JSON.parse(sessionStorage.getItem("basket"));
  },
  get: function (key) {
    return this.getAll()[key];
  },
  delete: function (key) {
    var lunch = this.getAll();
    delete lunch[key];
    sessionStorage.setItem("basket", JSON.stringify(lunch));
    return true;
  },
  update: function (key, value) {
    var lunch = this.getAll();
    lunch[key] = value;
    sessionStorage.setItem("basket", JSON.stringify(lunch));
    return true;
  },
  increment: function (key) {
    var lunch = this.get(key);
    if (lunch == null) {
      lunch = 0;
    }
    this.update(key, lunch + 1);
    return true;
  },
};

function GetFullRecipe() {
  var lunchs = ListLunch();
  var dinners = ListDinner();
  var meals = Object.assign(lunchs, dinners);
  var fullRecipe = {};
  for (var key in basketCRUD.getAll()) {
    for (var ingredient in meals[key]["recipe"]) {
      if (fullRecipe[ingredient] == null) {
        fullRecipe[ingredient] = {};
        fullRecipe[ingredient]["value"] = 0;
      }
      var recipeValue = meals[key]["recipe"][ingredient];
      if (typeof recipeValue == "string") {
        var recipeUnit = recipeValue.match("([0-9.]+)([a-zA-Z]+)")[2];
        recipeValue = parseFloat(recipeValue.match("([0-9.]+)([a-zA-Z]+)")[1]);
        if (recipeUnit.endsWith("L")) {
          fullRecipe[ingredient]["unit"] = "cL";
          if (recipeUnit == "L") {
            recipeValue = recipeValue * 100;
          } else if (recipeUnit == "mL") {
            recipeValue = recipeValue / 10;
          }
        } else if (recipeUnit.endsWith("g")) {
          fullRecipe[ingredient]["unit"] = "g";
          if (recipeUnit == "kg") {
            recipeValue = recipeValue * 1000;
          } else if (recipeUnit == "mg") {
            recipeValue = recipeValue / 1000;
          }
        }
      }
      fullRecipe[ingredient]["value"] += parseFloat(recipeValue) * parseFloat(basketCRUD.get(key));
    }
  }
  return fullRecipe;
}
