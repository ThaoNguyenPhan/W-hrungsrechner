
//  Defnition der jeweiligen Dropdowneigenschaften

var attribut = new Array(); //Ojekt wird erstellt
var unit = new Array();
var factor = new Array();

attribut[0] = "Länge";
unit[0] = new Array("Meter", "Kilometer", "Zentimeter","Millimeter","Yard");
factor[0] = new Array(1, 1000, .01,.001,.9144);

attribut[1]="Geschwindigkeit";
unit[1]=new Array("Meter pro Sekunde","Kilometer pro Stunde","Knoten","Meile pro Stunde","Fuß pro Sekunde");
factor[1]= new Array(1,.2777778,.5144444,.44704,.3048);

attribut[2] = "Fläche";
unit[2] = new Array("Quadratmeter", "Quadratkilometer", "Qudratmeile","Hectar","Acre");
factor[2] = new Array(1, 100000, 2589988, 1000, 4046.86);


attribut[3]="Datengröße";
unit[3]=new Array("Byte","Kilobyte","Megabyte","Gigabyte","Terabyte");
factor[3]= new Array(1,1000,1e+6,1e+9,1.25e+11);

//  Funktionen

function CalculateUnit(sourceForm, targetForm) {
  var sourceValue = sourceForm.unit_input.value;
  var rgx = /^[0-9]*\.?[0-9]*$/;

//Es wird kontrolliert, ob  die eingabe vom User eine Zahl ist oder zu einer zahl konvertiert werden kann
  sourceValue = parseFloat(sourceValue);
  if (!isNaN(sourceValue) || !sourceValue == 0 && sourceValue == !rgx) {
    // isNan nicht das Ergebnis von parseFloat, wenn Konvertierung an

    sourceForm.unit_input.value = sourceValue;
    ConvertFromTo(sourceForm, targetForm);
  }

//if(!)

}

function ConvertFromTo(sourceForm, targetForm) {
  var propIndex,sourceIndex, sourceFactor, targetIndex, targetFactor, result;

  // Start by checking which property we are working in...
  propIndex = document.property_form.MainMenu.selectedIndex;

  // Let's determine what unit are we converting FROM (i.e. source) and the factor needed to convert that unit to the base unit.
  sourceIndex = sourceForm.UnitMenu.selectedIndex;
  sourceFactor = factor[propIndex][sourceIndex];

  targetIndex = targetForm.UnitMenu.selectedIndex;
  targetFactor = factor[propIndex][targetIndex];

  //Berechnung
  result = sourceForm.unit_input.value;
  result = result * sourceFactor;
  result = result / targetFactor;

  targetForm.unit_input.value = result;
}

window.onload = function(e) {
  FillArray(document.property_form.MainMenu, attribut);
  ChangeUnit(document.property_form.MainMenu, document.form1.UnitMenu);
  ChangeUnit(document.property_form.MainMenu, document.form2.UnitMenu)
}

function ChangeUnit(propMenu, unitMenu) {
  var i;
  i = propMenu.selectedIndex;
  FillArray(unitMenu, unit[i]);
}

function FillArray(myMenu, myArray) {

  var i;
  myMenu.length = myArray.length;
  for (i = 0; i < myArray.length; i++) {
    myMenu.options[i].text = myArray[i];
  }
}

//------------------------------------------------------------
