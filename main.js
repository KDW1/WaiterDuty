
let cadetList = [];

let warningText = document.getElementById("warningText");
warningText.style.display = "none";

function getCadetInfo() {
    //console.log("Testing...Testing...1.2.3...");

    let mondaySelect = document.getElementById("monLunch");
    let tuesdaySelect = document.getElementById("tuesLunch");
    let thursdaySelect = document.getElementById("thursLunch");
    let fridaySelect = document.getElementById("friLunch");

    let cadetName = document.getElementById("cadetName").value;
    let monLunch = (mondaySelect.value == "Daily Lunches") ? "No Reported Lunch" : document.getElementById("monLunch").value;
    let tuesLunch = (tuesdaySelect.value == "Daily Lunches") ? "No Reported Lunch" : document.getElementById("tuesLunch").value;
    let thursLunch = (thursdaySelect.value == "Daily Lunches") ? "No Reported Lunch" : document.getElementById("thursLunch").value;
    let friLunch = (fridaySelect.value == "Daily Lunches") ? "No Reported Lunch" : document.getElementById("friLunch").value;

    let proceedFurther = true;

    if (monLunch == "No Reported Lunch") {
        proceedFurther = false;
    } else if (tuesLunch == "No Reported Lunch") {
        proceedFurther = false;
    } else if (thursLunch == "No Reported Lunch") {
        proceedFurther = false;
    } else if (friLunch == "No Reported Lunch") {
        proceedFurther = false;
    } else if (cadetName == "") {
        proceedFurther = false;
    }

    let canProceedFurther = proceedFurther;

    if (canProceedFurther == true) {
        console.log(`Cadet ${cadetName}: ${monLunch} on Monday, ${tuesLunch} on Tuesday, ${thursLunch} on Thursday, ${friLunch} on Friday`);
        let tableBody = document.getElementById("tableBody");
        let row = document.createElement("tr");
        let rowContent = `<th>${cadetName}</th><th>|</th><th>${monLunch}</th><th>${tuesLunch}</th><th>${thursLunch}</th><th>${friLunch}</th>`;
        rowContent += "<th><button class='btn btn-sm rounded-circle px-2 btn-danger '><span class='icon'><i class='fa-solid fa-lg fa-xmark'></i></span></button></th>";
        row.append(rowContent)
        tableBody.innerHTML += rowContent;
    } else if (canProceedFurther == false) {
        console.log("Error");
        alert("Modal Form failed. Have to complete all fields");
    }

    document.getElementById("cadetName").value = "";
    document.getElementById("monLunch").value = "";
    document.getElementById("tuesLunch").value = "";
    document.getElementById("thursLunch").value = "";
    document.getElementById("friLunch").value = "";

    if (canProceedFurther) {
        let monNumber = (monLunch == "Free") ? 0 : parseInt(monLunch[0]);
        let tuesNumber = (tuesLunch == "Free") ? 0 : parseInt(tuesLunch[0]);
        let thursNumber = (thursLunch == "Free") ? 0 : parseInt(thursLunch[0]);
        let friNumber = (friLunch == "Free") ? 0 : parseInt(friLunch[0]);
        let newCadet = new Cadet(cadetName, monNumber, tuesNumber, 0, thursNumber, friNumber);
        newCadet.printInfo();
    }

}

// General Waiter Duty Program -------------------------------
class Cadet {
    cadetName = "";
    lunchTimes = [];
    shiftAmounts = 0;
    shifts = [];


    constructor(cadetName, mon, tues, wed, thurs, fri) {
        this.cadetName = cadetName;
        this.lunchTimes.unshift(mon, tues, wed, thurs, fri);
        this.shifts = [];
    }

    printInfo() {
        for (let i = 0; i < this.lunchTimes.length; i++) {
            switch (this.lunchTimes[i]) {
                case 0:
                    console.log(`${this.cadetName} has a Free 3rd Period on Day: ${i}`);
                    break;
                case 1:
                    console.log(`${this.cadetName} has 1st Lunch on Day: ${i}`);
                    break;
                case 2:
                    console.log(`${this.cadetName} has 2nd Lunch on Day: ${i}`);
                    break;
                case 3:
                    console.log(`${this.cadetName} has 3rd Lunch on Day: ${i}`);
                    break;
            }
        }
    }
}

class Day {
    breakfast = [];
    wednesday = [];
    lunches = {
        firstLunch: [],
        secondLunch: [],
        thirdLunch: []
    };
    dinners = {
        firstDinner: [],
        secondDinner: []
    };

    dayNum = 0;

    constructor(dayNum) {
        this.dayNum = dayNum;
    }

    get firstLunchFull() {
        return fullShifts(this.lunches.firstLunch, 3);
    }

    get secondLunchFull() {
        return fullShifts(this.lunches.secondLunch, 3);
    }

    get thirdLunchFull() {
        return fullShifts(this.lunches.thirdLunch, 3);
    }

    get day() {
        switch (this.dayNum) {
            case 1:
                return "Monday";
                break;
            case 2:
                return "Tuesday";
                break;
            case 3:
                return "Wednesday";
                break;
            case 4:
                return "Thursday";
                break;
            case 5:
                return "Friday";
                break;
        }
    }

    assignShift(timePeriod, shift, cadet) {
        switch (timePeriod) {
            case 1:
                this.breakfast.unshift(new Shift(this.dayNum, timePeriod, shift, cadet.cadetName));
                cadet.shifts.unshift(new Shift(this.dayNum, timePeriod, shift, cadet.cadetName));
                cadet.shiftAmounts++;
                break;
            case 2:
                switch (shift) {
                    case 1:
                        let shiftData = new Shift(this.dayNum, timePeriod, shift, cadet.cadetName);
                        this.lunches.firstLunch.unshift(shiftData);
                        if (Array.isArray(cadet.shifts)) {
                            cadet.shifts.unshift(shiftData);
                        }
                        cadet.shiftAmounts++;
                        break;
                    case 2:
                        let shiftDataSec = new Shift(this.dayNum, timePeriod, shift, cadet.cadetName);
                        this.lunches.secondLunch.unshift(shiftDataSec);
                        if (Array.isArray(cadet.shifts)) {
                            cadet.shifts.unshift(shiftDataSec);
                        }
                        cadet.shiftAmounts++;
                        break;
                    case 3:
                        let shiftDataThir = new Shift(this.dayNum, timePeriod, shift, cadet.cadetName);
                        this.lunches.thirdLunch.unshift(shiftDataThir);
                        if (Array.isArray(cadet.shifts)) {
                            cadet.shifts.unshift(shiftDataThir);
                        }
                        cadet.shiftAmounts++;
                        break;
                }
                break;
            case 3:
                switch (shift) {
                    case 1:
                        let shiftData = new Shift(this.dayNum, timePeriod, shift, cadet.cadetName);
                        this.dinners.firstDinner.unshift(shiftData);
                        if (Array.isArray(cadet.shifts)) {
                            cadet.shifts.unshift(shiftData);
                        }
                        cadet.shiftAmounts++;
                        break;
                    case 2:
                        let shiftDataSec = new Shift(this.dayNum, timePeriod, shift, cadet.cadetName);
                        this.dinners.secondDinner.unshift(shiftDataSec);
                        if (Array.isArray(cadet.shifts)) {
                            cadet.shifts.unshift(shiftDataSec);
                        }
                        cadet.shiftAmounts++;
                        break;
                }
                break;
            case 4:
                this.wednesday.unshift(new Shift(this.dayNum, timePeriod, shift, cadet.cadetName));
                cadet.shifts.unshift(new Shift(this.dayNum, timePeriod, shift, cadet.cadetName));
                cadet.shiftAmounts++;
                break;
        }
    }

    logShift(shift) {
        if (shift != null) {
            let message = shift.description;
            console.log(message);
        } else {
            console.log("No one was available for this shift. :(");
        }
    }

    displayAllShifts() {
        for (let i = 0; i < 5; i++) {
            console.log("Breakfast---------");
            this.logShift(this.breakfast[i]);
        }
        for (let i = 0; i < 7; i++) {
            if (this.wednesday.length > 0) {
                console.log("Wednesday Lunch---------");
                this.logShift(this.wednesday[i]);
            }
        }
        for (let i = 0; i < 3; i++) {
            console.log("First Lunch---------");
            this.logShift(this.lunches.firstLunch[i]);
        }
        for (let i = 0; i < 3; i++) {
            console.log("Second Lunch---------");
            this.logShift(this.lunches.secondLunch[i]);
        }
        for (let i = 0; i < 3; i++) {
            console.log("Third Lunch---------");
            this.logShift(this.lunches.thirdLunch[i]);
        }
        for (let i = 0; i < 3; i++) {
            console.log("First Dinner---------");
            this.logShift(this.dinners.firstDinner[i]);
        }
        for (let i = 0; i < 2; i++) {
            console.log("Second Dinner---------");
            this.logShift(this.dinners.secondDinner[i]);
        }
    }
}

class Shift {
    dayNum = 0;
    timePeriod = 0;
    shift = 0;
    assignedPerson = "";

    constructor(dayNum, timePeriod, shift, cadetName) {
        this.dayNum = dayNum;
        this.timePeriod = timePeriod;
        this.shift = shift;
        this.assignedPerson = cadetName;
    }

    get day() {
        switch (this.dayNum) {
            case 1:
                return "Monday";
                break;
            case 2:
                return "Tuesday";
                break;
            case 3:
                return "Wednesday";
                break;
            case 4:
                return "Thursday";
                break;
            case 5:
                return "Friday";
                break;
        }
    }

    get period() {
        switch (this.timePeriod) {
            case 1:
                return "Breakfast";
                break;
            case 2:
                switch (this.shift) {
                    case 1:
                        return "1st Lunch";
                        break;
                    case 2:
                        return "2nd Lunch";
                        break;
                    case 3:
                        return "3rd Lunch";
                        break;
                    default:
                        return "a time unspecified.";
                        break;
                }
                break;
            case 3:
                switch (this.shift) {
                    case 1:
                        return "the 1st Dinner Shift";
                        break;
                    case 2:
                        return "the 2nd Dinner Shift";
                        break;
                    default:
                        return "a time unspecified.";
                        break;
                }
                break;
            case 4:
                return "Wednesday Lunch";
                break;
            default:
                return "a time unspecified.";
                break;
        }
    }

    get description() {
        console.log(`On ${this.day} | ${this.assignedPerson} has waiter duty during ${this.period}\n`);
    }
}

let week = [];
let mon = new Day(1);
let tues = new Day(2);
let wed = new Day(3);
let thur = new Day(4);
let fri = new Day(5);
let baseShifts = 1; //base number of shifts

week.unshift(mon, tues, wed, thur, fri);
//Iterate throug lunch





function AssignBreakfastShifts(cadetList, chosenWeek) {
    breakfastShift = chosenWeek.breakfast;
    for (let i = 0; i < cadetList.length; i++) {
        if (equalNumberOfShifts(cadetList) && (cadetList[i].shiftAmounts == baseShifts) && (cadetList[i].shiftAmounts != 0)) {
            baseShifts++;
            console.log(`${baseShifts} is the base number of shifts at breakfast`);
            // console.log(cadetList);
        }
        if (!fullShifts(breakfastShift, 5)) {
            if (cadetList[i].shiftAmounts < baseShifts) {
                chosenWeek.assignShift(1, 1, cadetList[i]);
                // cadetList[i].shiftAmounts++;
                // console.log(`${cadetList[i].cadetName} assigned shift, taking ${cadetList[i].shiftAmounts} shifts`);
            }
        }
    }
    if (Array.isArray(breakfastShift)) {
        if (!fullShifts(breakfastShift, 5)) {
            AssignBreakfastShifts(cadetList, chosenWeek);
        }
    }
}

function AssignWednesdayShifts(cadetList, chosenWeek) {
    wednesdayShift = chosenWeek.wednesday;
    for (let i = 0; i < cadetList.length; i++) {
        if (equalNumberOfShifts(cadetList) && (cadetList[i].shiftAmounts == baseShifts) && (cadetList[i].shiftAmounts != 0)) {
            baseShifts++;
            console.log(`${baseShifts} is the base number of shifts at breakfast`);
            // console.log(cadetList);
        }
        if (!fullShifts(wednesdayShift, 7)) {
            if (cadetList[i].shiftAmounts < baseShifts) {
                chosenWeek.assignShift(4, 1, cadetList[i]);
                // cadetList[i].shiftAmounts++;
                // console.log(`${cadetList[i].cadetName} assigned shift, taking ${cadetList[i].shiftAmounts} shifts`);
            }
        }
    }
    if (Array.isArray(wednesdayShift)) {
        if (!fullShifts(wednesdayShift, 7)) {
            AssignWednesdayShifts(cadetList, chosenWeek);
        }
    }
}

function AssignDinnerShifts(cadetList, chosenWeek) {
    dinnerShift = chosenWeek.dinners;
    for (let i = 0; i < cadetList.length; i++) {
        if (equalNumberOfShifts(cadetList) && (cadetList[i].shiftAmounts == baseShifts) && (cadetList[i].shiftAmounts != 0)) {
            baseShifts++;
            console.log(`${baseShifts} is the base number of shifts at dinner`);
            // console.log(cadetList);
        }
        if (!fullShifts(dinnerShift.firstDinner, 3)) {
            if (cadetList[i].shiftAmounts < baseShifts) {
                chosenWeek.assignShift(3, 1, cadetList[i]);
                // cadetList[i].shiftAmounts++;
            }
        }
        if (!fullShifts(dinnerShift.secondDinner, 2)) {
            if (cadetList[i].shiftAmounts < baseShifts) {
                chosenWeek.assignShift(3, 2, cadetList[i]);
                // cadetList[i].shiftAmounts++;
            }
        }
    }
    let checkFirstDinner = !fullShifts(dinnerShift.firstDinner, 3);
    let checkSecondDinner = !fullShifts(dinnerShift.secondDinner, 2);
    if (Array.isArray(dinnerShift.firstDinner)) {
        if (checkFirstDinner) {
            AssignDinnerShifts(cadetList, chosenWeek);
            return;
        }
    }
    if (Array.isArray(dinnerShift.secondDinner)) {
        if (checkSecondDinner) {
            AssignDinnerShifts(cadetList, chosenWeek);
            return;
        }
    }
    if (!checkSecondDinner && !checkFirstDinner) {
        return;
    }
}





function AssignLunchShifts(cadetList, chosenWeek, currentDay) {
    lunchSections = chosenWeek.lunches;
    for (let i = 0; i < cadetList.length; i++) {
        if (equalNumberOfShifts(cadetList) && (cadetList[i].shiftAmounts == baseShifts) && (cadetList[i].shiftAmounts != 0)) {
            baseShifts++;
            console.log(`${baseShifts} is the base number of shifts at lunch`);
            // console.log(cadetList);
        }
        // let lunchTime = cadetList[i].lunchTimes[bruh];
        let lunchTime = 0;
        switch (cadetList[i].lunchTimes[currentDay]) {
            case 0:
                if (!chosenWeek.firstLunchFull) {
                    if (cadetList[i].shiftAmounts < baseShifts) {
                        chosenWeek.assignShift(2, 1, cadetList[i]);
                        // cadetList[i].shiftAmounts++;
                    }
                }
                if (!chosenWeek.secondLunchFull) {
                    if (cadetList[i].shiftAmounts < baseShifts) {
                        chosenWeek.assignShift(2, 2, cadetList[i]);
                        // cadetList[i].shiftAmounts++;
                    }
                }
                if (!chosenWeek.thirdLunchFull) {
                    if (cadetList[i].shiftAmounts < baseShifts) {
                        chosenWeek.assignShift(2, 3, cadetList[i]);
                        // cadetList[i].shiftAmounts++;
                    }
                }
                break;
            case 1:
                if (!chosenWeek.firstLunchFull) {
                    if (cadetList[i].shiftAmounts < baseShifts) {
                        chosenWeek.assignShift(2, 1, cadetList[i]);
                        // cadetList[i].shiftAmounts++;
                    }
                }
                break;
            case 2:
                if (!chosenWeek.secondLunchFull) {
                    if (cadetList[i].shiftAmounts < baseShifts) {
                        chosenWeek.assignShift(2, 2, cadetList[i]);
                        // cadetList[i].shiftAmounts++;
                    }
                }
                break;
            case 3:
                if (!chosenWeek.thirdLunchFull) {
                    if (cadetList[i].shiftAmounts < baseShifts) {
                        chosenWeek.assignShift(2, 3, cadetList[i]);
                        // cadetList[i].shiftAmounts++;
                    }
                }
                break;
            default:
                break;
        }
    }

    let firstFull = chosenWeek.firstLunchFull;
    let secondFull = chosenWeek.secondLunchFull;
    let thirdFull = chosenWeek.thirdLunchFull;
    let enoughForFirst = hasEnoughToFillLunch(cadetList, 1, currentDay);
    let enoughForSecond = hasEnoughToFillLunch(cadetList, 2, currentDay);
    let enoughForThird = hasEnoughToFillLunch(cadetList, 3, currentDay);
    // console.log(`First Lunch has enough? Ans: ${enoughForFirst}. Full Shifts: ${firstLunchFull},\nSecond Lunch is ok? Ans: ${enoughForSecond}. Full Shifts: ${secondLunchFull},\nThird Lunch is ok? Ans: ${enoughForThird}. Full Shifts: ${thirdLunchFull}\n`);
    let runFirstLunchAgain = !firstFull && enoughForFirst;
    let runSecondLunchAgain = !secondFull && enoughForSecond;
    let runThirdLunchAgain = !thirdFull && enoughForThird;
    let allOk = firstFull && secondFull && thirdFull;
    // console.log(`Should Run Again: 1st) ${runFirstLunchAgain}, 2nd) ${runSecondLunchAgain}, 3rd) ${runThirdLunchAgain}`);
    if (runFirstLunchAgain || runSecondLunchAgain || runThirdLunchAgain) {
        AssignLunchShifts(cadetList, chosenWeek, currentDay);
        return;
    }
    if (allOk) {
        return;
    }
}



function fullShifts(shiftSection, totalShifts) {
    if (Array.isArray(shiftSection)) {
        if (shiftSection.length >= totalShifts) {
            return true;
        } else {
            return false;
        }
    }
}


function minimumNumberOfShifts(cadetList) {
    let min = 0;
    for (let i = 0; i < cadetList.length; i++) {
        if ((cadetList[i].shiftAmounts < min) && (cadetList[i].shiftAmounts > 0)) {
            min = cadetList[i].shiftAmounts;
        }
    }
    return min;
}

function equalNumberOfShifts(cadetList) {
    let variations = 0;
    if (Array.isArray(cadetList)) {
        for (let i = 0; i < cadetList.length; i++) {
            if (i != 0) {
                if (cadetList[i].shiftAmounts != cadetList[i - 1].shiftAmounts) {
                    variations++;
                }
            }
        }
    }
    if (variations != 0) {
        return false;
    }
    if (variations == 0) {
        return true;
    }
    if (!(variations != 0) && !(variations == 0)) {
        return;
    }
    else {
        return;
    }
}

//for (let i = 0; i < 3; i++) {
//    if (i != 2) { //2 means that it is a Wednesday
//        shuffle(unitCadetsMonday);
//        AssignLunchShifts(unitCadetsMonday, week[i], i);
//        AssignBreakfastShifts(unitCadetsMonday, week[i]);
//        AssignDinnerShifts(unitCadetsMonday, week[i]);

//    } else if (i == 2) { //On Wednesday, a different set of shifts are made 
//        shuffle(unitCadetsMonday);
//        AssignWednesdayShifts(unitCadetsMonday, week[2]);
//        AssignBreakfastShifts(unitCadetsMonday, week[2]);
//        AssignDinnerShifts(unitCadetsMonday, week[2]);
//    }
//}

//for (let j = 0; j < 3; j++) {
//    console.log("\n\n\n\n\n\------------\n");
//    console.log(`${week[j].day} has: \n`);
//    week[j].displayAllShifts();
//}

function hasEnoughToFillLunch(cadetList, shift, day) {
    let possibleCandidates = 0;
    for (let i = 0; i < cadetList.length; i++) {
        if (cadetList[i].lunchTimes[day] == shift) {
            possibleCandidates++;
        }
    }
    if (possibleCandidates >= 3) {
        return true;
    } else {
        return false;
    }
}

function shuffle(array) { //From Stack Overflow ---------------------
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function generateWaiterRoster() {
    console.log("This would generate the roster");
    let mondayFullLunches;
    let tuesdayFullLunches;
    let thursdayFullLunches;
    let fridayFullLunches;
    for (let i = 0; i < 4; i++) {
        firstLunchPossible = hasEnoughToFillLunch(cadetList, 1, i + 1);
        secondLunchPossible = hasEnoughToFillLunch(cadetList, 2, i + 1);
        thirdLunchPossible = hasEnoughToFillLunch(cadetList, 3, i + 1);
        switch (i) {
            case 0:
                mondayFullLunches = firstLunchPossible && secondLunchPossible && thirdLunchPossible;
                break;
            case 1:
                tuesdayFullLunches = firstLunchPossible && secondLunchPossible && thirdLunchPossible;
                break;
            case 2:
                break;
            case 3:
                thursdayFullLunches = firstLunchPossible && secondLunchPossible && thirdLunchPossible;
                break;
            case 4:
                thursdayFullLunches = firstLunchPossible && secondLunchPossible && thirdLunchPossible;
                break;
        }
    }
    if (mondayFullLunches && tuesdayFullLunches && thursdayFullLunches && fridayFullLunches) {
        warningText.style.display = "none";
    } else {
        warningText.style.display = "block";
        setTimeout(() => {
            warningText.style.display = "none";
        }, 2000);
    }
}