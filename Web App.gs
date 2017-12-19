function doGet(evt) {
  var email = evt.parameter['email'].toLowerCase();
  var htmlOutput = HtmlService.createHtmlOutputFromFile('Operations')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setTitle('Cab-Ease Dev');
  return htmlOutput.append('<script> var driverEmail = "'+email+'";</script>');
}

function sheetUpdate(sheetName, data, editFare) {
  var date = new Date();
  var output = [];
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var sheetRow = sheet.getLastRow();

  if (editFare !== "" && editFare !== undefined) {
    var findRow = 0;
    var sheetData = sheet.getDataRange().getDisplayValues();

    sheetData.forEach(function (row,index) {
      if (row[0] == editFare) {
        findRow = index;
        return false;
      }
    });
    sheet.getRange(findRow+1,1,1,data.length).setValues([data]);
  }
  else {
    data.unshift(date);
    sheet.getRange(sheetRow+1,1,1,data.length).setValues([data]);
  }
  sheet.sort(1, false);
}

function getPastFares(agentId) {
  var output = [];
  var today = new Date();
  var dateMin = 0;
  var dateMax = 0;

  switch (today.getDay()) {
    case 0:
      dateMin = new Date(today.getFullYear(),today.getMonth(),today.getDate()-7);
      dateMax = new Date(today.getFullYear(),today.getMonth(),today.getDate(),23,59,59);
      break;
    case 1:
      dateMin = new Date(today.getFullYear(),today.getMonth(),today.getDate()-1);
      dateMax = new Date(today.getFullYear(),today.getMonth(),today.getDate()+6,23,59,59);
      break;
    case 2:
      dateMin = new Date(today.getFullYear(),today.getMonth(),today.getDate()-2);
      dateMax = new Date(today.getFullYear(),today.getMonth(),today.getDate()+5,23,59,59);
      break;
    case 3:
      dateMin = new Date(today.getFullYear(),today.getMonth(),today.getDate()-3);
      dateMax = new Date(today.getFullYear(),today.getMonth(),today.getDate()+4,23,59,59);
      break;
    case 4:
      dateMin = new Date(today.getFullYear(),today.getMonth(),today.getDate()-4);
      dateMax = new Date(today.getFullYear(),today.getMonth(),today.getDate()+3,23,59,59);
      break;
    case 5:
      dateMin = new Date(today.getFullYear(),today.getMonth(),today.getDate()-5);
      dateMax = new Date(today.getFullYear(),today.getMonth(),today.getDate()+2,23,59,59);
      break;
    case 6:
      dateMin = new Date(today.getFullYear(),today.getMonth(),today.getDate()-6);
      dateMax = new Date(today.getFullYear(),today.getMonth(),today.getDate()+1,23,59,59);
      break;
  }

  var data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(agentId).getDataRange().getDisplayValues();

  for (var x=1; x<data.length; x++) {
    var unformattedDate = data[x][0].split(" ");
    var dateObj = unformattedDate[0].split("/");
    var timeObj = unformattedDate[1].split(":");

    var formattedDate = new Date(dateObj[2],dateObj[0]-1,dateObj[1],timeObj[0],timeObj[1],timeObj[2]);

    if (formattedDate.valueOf() >= dateMin.valueOf() && formattedDate.valueOf() <= dateMax.valueOf()) {
      output.push(data[x]);
    }
  }

  if (output.length > 0) {
    return output;
  }
  else {
    return [];
  }
}

function getAgentPolicies(agentName) {
  var database = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Agent Policies').getDataRange().getDisplayValues();
  var agentPolicies = [];
  database.forEach(function (row) {
    if (agentName == row[1]) {
       agentPolicies.push(row);
    }
  });
  return agentPolicies;
}

function getEmail() {
  return Session.getActiveUser().getEmail();
}

function getDriverId(email) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Roster').getRange('C:C').getDisplayValues();

  for(var x=0; x<sheet.length; x++) {
    if(sheet[x][0] == email) {
      return sheet[x][0];
    }
  }
}

function getId() {
  return getDriverId(getEmail());
}

function getLogIn(email,password) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Roster').getRange('C:D').getDisplayValues();
<<<<<<< HEAD
=======
  
>>>>>>> origin/master
  sheet.forEach(function (driver) {
    Logger.log(driver);
    if (email == driver[0] && password == driver[1]) {
      return true;
    }
  });
  return false;
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/master
