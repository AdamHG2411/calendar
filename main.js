//Heading
function calendar(thisMonth, thisYear = 2019) {
  let days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  week = days.join(" ")
  console.log(months[(thisMonth - 1)] + " " + thisYear);
  console.log(week);
  let dates = [];
  let DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (thisYear % 4 === 0) {
    DAYS_IN_MONTH[1] = 29;
  }
  for (let i = 1; i <= DAYS_IN_MONTH[(thisMonth - 1)]; i++) {
    dates.push(i.toString().padStart(2, " "));
  }
  const DAYS_IN_WEEK = 7;
  //Loop for the weekday of the 1st of the month:
  //Su=0 Mo=1 Tu=2 We=3
  let yearOffset = 0;
  let diffYears = [];
  let leapYears = [];
  function offset (mo, year) {
    if (year > 2019) {
      yearOffset = (year - 2019);
      for (let i = 1; i < (year - 2019); i++) {
        diffYears.push(2019 + i);
        if (diffYears[i] % 4 === 0) {
          leapYears.push(diffYears[i]);
        }
        yearOffset += leapYears.length;
      } 
    } else if (year < 2019) {
      for (let i = 1; i < (2019 - year); i++) {
        diffYears.push(2019 - i);
        if (diffYears[i] % 4 === 0) {
          leapYears.push(diffYears[i]);
        }
        yearOffset += leapYears.length;
      }
    }
    let daysOffset = [2, 5, 5, 1, 3, 6, 1, 4, 0, 2, 5, 0]
    for (let i = 0; i < daysOffset[(mo - 1)]; i++) {
      dates.unshift("  ");
    }
  }
  offset(thisMonth, thisYear);
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
calendar(4);