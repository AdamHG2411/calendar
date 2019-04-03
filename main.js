//Defining the function
function calendar(thisMonth, thisYear = 2019) {
  //Printing year/month headers
  let days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  week = days.join(" ")
  console.log(months[(thisMonth - 1)] + " " + thisYear);
  console.log(week);

  //Setup days per month (incl. leap years)
  let dates = [];
  let DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (thisYear % 4 === 0) {
    DAYS_IN_MONTH[1] = 29;
  }
  
  //fill dates array with full month of values
  for (let i = 1; i <= DAYS_IN_MONTH[(thisMonth - 1)]; i++) {
    dates.push(i.toString().padStart(2, " "));
  }
  //Setup variables for annual offset from 2019 as base year
  let yearOffset = 0;
  let diffYears = [];
  let leapYears = [];

  //Offset function
  function offset (mo, year) {
  //1st day of each month of 2019 (default) - 0:sunday-6:saturday
    let daysOffset = [2, 5, 5, 1, 3, 6, 1, 4, 0, 2, 5, 0];
    //Offset for years before or after 2019
    if (year > 2019) {
      yearOffset = (year - 2019);
      for (let i = 1; i <= (year - 2019); i++) {
        diffYears.push(2019 + i);
      } 
      let leapYears = diffYears.filter((yr) => yr % 4 === 0);
      yearOffset += leapYears.length;
      if (leapYears.includes(year)) {
        yearOffset -= 1;
      }
    //Trying to get > 2019 working before moving onto this section
    } else if (year < 2019) {
      yearOffset = (year - 2019);
      for (let i = 1; i <= (2019 - year); i++) {
        diffYears.push(2019 - i);
        if (diffYears[i] % 4 === 0) {
          leapYears.push(diffYears[i]);
        }
      }
      yearOffset -= leapYears.length;
    }
    //adjust daysOffset to account for yearOffset
    for (i = 0; i < 12; i++) {
      daysOffset[i] += yearOffset;
      if ((year % 4 === 0) && (i > 1)) {
        daysOffset[i] += 1;
      }
      //correct values to 0-6 for sunday-saturday
      if (daysOffset[i] < 0) {
        while (daysOffset[i] < 0) {
          daysOffset[i] += 7;
        }
      } else if (daysOffset[i] > 6) {
        while (daysOffset[i] > 6) {
          daysOffset[i] -= 7;
        }
      }
    }
    //insert empty strings for offset days at start of each month
    for (let i = 0; i < daysOffset[(mo - 1)]; i++) {
      dates.unshift("  ");
    }
  }
  //call offset function for thisMonth & thisYear - established by calling calendar()
  offset(thisMonth, thisYear);
  //Define number of weeks and print 7 array values per line
  const DAYS_IN_WEEK = 7;
  for (let i = 0; i < (Math.floor((DAYS_IN_MONTH[(thisMonth - 1)]) / DAYS_IN_WEEK) + 2); i++) {
    let weeklyDates = [];
    for (let j = 0; j < 7; j++) {
      weeklyDates.push(dates[j]);
    }
    let week = weeklyDates.join(" ");
    console.log(week);
    for (k = 0; k < 7; k++) {
      dates.shift();
    }
  }
}
//call function - calendar(m, yyyy)
//calendar(2, 2022);
for (let i = 1; i < 13; i++) {
  calendar(i, 2040);
}