const dateInput = document.querySelector("#date-of-birth");
const showBtn = document.querySelector("#check-date");
var result = document.querySelector("#result");

function reverseString(str) {
  str = str.toString();
  var listOfChars = str.split("");
  var reverseListOfChars = listOfChars.reverse();
  var reversedStr = reverseListOfChars.join("");
  return reversedStr;
  //return str.split('').reverse('').join('') shprtcut code in place of line 2,3,4,5.
}

function isPlindrome(str) {
  var reverse = reverseString(str);
  return str === reverse;
}

function convertDateToStr(date) {
  var dateStr = { day: "", month: "", year: "" };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString(); ///check if is it needed
  return dateStr;
}

function getAllDateFormates(date) {
  var dateStr = convertDateToStr(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}
function checkPalindromForAllDateFormats(date) {
  var listOfPalindroms = getAllDateFormates(date);
  var flag = false;
  for (var i = 0; i < listOfPalindroms.length; i++) {
    if (isPlindrome(listOfPalindroms[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function getNextPalindromDate(date) {
  var ctr = 0;
  var nextDate = getNextDate(date);

  while (1) {
    ctr++;
    var isPalindrom = checkPalindromForAllDateFormats(nextDate);
    if (isPalindrom) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
}

function getPreviousDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 3) {
    if (isLeapYear(year)) {
      day = 29;
      month--;
    } else {
      day = 28;
      month--;
    }
  } else {
    if (day < 1) {
      month--;
      day = daysInMonth[month];
    }
  }
  if (month < 1) {
    month = 12;
    year--;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function getPreviousPalindromDate(date) {
  var ctr = 0;
  var previousDate = getPreviousDate(date);
  while (1) {
    ctr++;
    var isPalindrom = checkPalindromForAllDateFormats(previousDate);
    if (isPalindrom) {
      break;
    }
    previousDate = getPreviousDate(previousDate);
  }
  return [ctr, previousDate];
}

function clickHandler(e) {
  var bdayStr = dateInput.value;

  ////console.log(dateInput.value)

  if (bdayStr !== "") {
    var listOfDate = bdayStr.split("-");
    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };
    var isPalindrom = checkPalindromForAllDateFormats(date);
    if (isPalindrom) {
      result.innerText = "'Yay'it is a Palindrome";
    } else {
      var nextDate = getNextPalindromDate(date);
      var previousDate = getPreviousPalindromDate(date);
      result.innerText =
        "Next palindrome date is " +
        nextDate[1].day +
        "-" +
        nextDate[1].month +
        "-" +
        nextDate[1].year +
        "\n you missed it by " +
        nextDate[0] +
        "\n" +
        "previous palindrome date is " +
        previousDate[1].day +
        "-" +
        previousDate[1].month +
        "-" +
        previousDate[1].year +
        "\n you missed it by " +
        previousDate[0];
    }
  }
}

showBtn.addEventListener("click", clickHandler);
