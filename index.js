function createEmployeeRecord(employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(employees) {
    return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employee, event) {
    let [date, hour] = event.split(' ')
    let eventObj = {
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date
    }
    employee.timeInEvents.push(eventObj)
    return employee
}

function createTimeOutEvent(employee, event) {
    let [date, hour] = event.split(' ')
    let eventObj = {
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date
    }
    employee.timeOutEvents.push(eventObj)
    return employee
}

function hoursWorkedOnDate(obj, workDate) {
    let inTime = obj.timeInEvents
      .filter((element) => element.date === workDate)
      .map((element) => element.hour);
  
    let outTime = obj.timeOutEvents
      .filter((element) => element.date === workDate)
      .map((element) => element.hour);
  
    return (outTime - inTime) / 100;
}

function wagesEarnedOnDate(obj, date) {
    return obj.payPerHour * hoursWorkedOnDate(obj, date);
}
  
function allWagesFor(obj) {
    let result = [];
    const allDates = obj.timeInEvents.map((element) => (element = element.date));
    for (let element of allDates) {
      result.push(wagesEarnedOnDate(obj, element));
    }
    return result.reduce((a, b) => a + b, 0);
}

function findEmployeeByFirstName(srcArray, fName) {
    return srcArray.find((obj) => obj.firstName === fName);
}

function calculatePayroll(array) {
    return array.map(obj => allWagesFor(obj))
    .reduce((a, b) => (a = a + b), 0);
}