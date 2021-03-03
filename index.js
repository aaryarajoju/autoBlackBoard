"use strict"

const {Builder, By, Key, util} = require("selenium-webdriver");
const robot = require("robotjs");
const {username, password} = require("./config.json");
const timetable = require("./timetable.json");
var searchTerm = undefined;

async function open(){
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await driver.get("https://cuchd.blackboard.com");

    await driver.manage().setTimeouts( { implicit: 20000 } );

    robot.keyTap("tab");
    robot.keyTap("tab");
    robot.keyTap("tab");
    robot.keyTap("enter");

    await driver.findElement(By.id('user_id')).sendKeys(username);
    await driver.findElement(By.id('password')).sendKeys(password);
    await driver.findElement(By.id('entry-login')).sendKeys(Key.ENTER);

    getSearchTerm();

    if (searchTerm != undefined){
        await driver.findElement(By.className('ng-pristine ng-untouched ng-valid ng-empty')).sendKeys(searchTerm);
        await (await driver.findElement(By.className('js-course-title-element'))).click();
        await (await driver.findElement(By.id('sessions-list-dropdown'))).click();
    }    
}

function getSearchTerm(){
    let current = new Date();
    let currentHour = current.getHours();
    let currentMinutes = current.getMinutes();
    let currentDay = current.getDay();

    switch (currentDay) {
        case 1:
            if ((currentHour == 9 && currentMinutes >= 45) || (currentHour == 10 && currentMinutes < 45)) searchTerm = timetable.MONDAY.one;
            else if ((currentHour == 10 && currentMinutes >= 45) || (currentHour == 11 && currentMinutes < 45)) searchTerm = timetable.MONDAY.two;
            else if ((currentHour == 11 && currentMinutes >= 45) || (currentHour == 12 && currentMinutes < 45)) searchTerm = timetable.MONDAY.three;
            else if ((currentHour == 13 && currentMinutes >= 30) || (currentHour == 14 && currentMinutes < 30)) searchTerm = timetable.MONDAY.four;
            else if ((currentHour == 14 && currentMinutes >= 30) || (currentHour == 15 && currentMinutes < 30)) searchTerm = timetable.MONDAY.five;
            else if ((currentHour == 15 && currentMinutes >= 30) || (currentHour == 16 && currentMinutes < 30)) searchTerm = timetable.MONDAY.six;
            break;

        case 2:
            if ((currentHour == 9 && currentMinutes >= 45) || (currentHour == 10 && currentMinutes < 45)) searchTerm = timetable.TUESDAY.one;
            else if ((currentHour == 10 && currentMinutes >= 45) || (currentHour == 11 && currentMinutes < 45)) searchTerm = timetable.TUESDAY.two;
            else if ((currentHour == 11 && currentMinutes >= 45) || (currentHour == 12 && currentMinutes < 45)) searchTerm = timetable.TUESDAY.three;
            else if ((currentHour == 13 && currentMinutes >= 30) || (currentHour == 14 && currentMinutes < 30)) searchTerm = timetable.TUESDAY.four;
            else if ((currentHour == 14 && currentMinutes >= 30) || (currentHour == 15 && currentMinutes < 30)) searchTerm = timetable.TUESDAY.five;
            else if ((currentHour == 15 && currentMinutes >= 30) || (currentHour == 16 && currentMinutes < 30)) searchTerm = timetable.TUESDAY.six;
            break;

        case 3:
            if ((currentHour == 9 && currentMinutes >= 45) || (currentHour == 10 && currentMinutes < 45)) searchTerm = timetable.WEDNESDAY.one;
            else if ((currentHour == 13 && currentMinutes >= 30) || (currentHour == 14 && currentMinutes < 30)) searchTerm = timetable.WEDNESDAY.four;
            else if ((currentHour == 14 && currentMinutes >= 30) || (currentHour == 15 && currentMinutes < 30)) searchTerm = timetable.WEDNESDAY.five;
            else if ((currentHour == 15 && currentMinutes >= 30) || (currentHour == 16 && currentMinutes < 30)) searchTerm = timetable.WEDNESDAY.six;
            break;

        case 4:
            if ((currentHour == 9 && currentMinutes >= 45) || (currentHour == 10 && currentMinutes < 45)) searchTerm = timetable.THURSDAY.one;
            else if ((currentHour == 10 && currentMinutes >= 45) || (currentHour == 11 && currentMinutes < 45)) searchTerm = timetable.THURSDAY.two;
            else if ((currentHour == 11 && currentMinutes >= 45) || (currentHour == 12 && currentMinutes < 45)) searchTerm = timetable.THURSDAY.three;
            else if ((currentHour == 13 && currentMinutes >= 30) || (currentHour == 14 && currentMinutes < 30)) searchTerm = timetable.THURSDAY.four;
            else if ((currentHour == 14 && currentMinutes >= 30) || (currentHour == 15 && currentMinutes < 30)) searchTerm = timetable.THURSDAY.five;
            else if ((currentHour == 15 && currentMinutes >= 30) || (currentHour == 16 && currentMinutes < 30)) searchTerm = timetable.THURSDAY.six;
            break;

        case 5:
            if ((currentHour == 9 && currentMinutes >= 45) || (currentHour == 10 && currentMinutes < 45)) searchTerm = timetable.FRIDAY.one;
            else if ((currentHour == 10 && currentMinutes >= 45) || (currentHour == 11 && currentMinutes < 45)) searchTerm = timetable.FRIDAY.two;
            else if ((currentHour == 11 && currentMinutes >= 45) || (currentHour == 12 && currentMinutes < 45)) searchTerm = timetable.FRIDAY.three;
            else if ((currentHour == 13 && currentMinutes >= 30) || (currentHour == 14 && currentMinutes < 30)) searchTerm = timetable.FRIDAY.four;
            else if ((currentHour == 14 && currentMinutes >= 30) || (currentHour == 15 && currentMinutes < 30)) searchTerm = timetable.FRIDAY.five;
            else if ((currentHour == 15 && currentMinutes >= 30) || (currentHour == 16 && currentMinutes < 30)) searchTerm = timetable.FRIDAY.six;
            break;

        case 6:
            if ((currentHour == 13 && currentMinutes >= 30) || (currentHour == 14 && currentMinutes < 30)) searchTerm = timetable.SATURDAY.four;
            else if ((currentHour == 14 && currentMinutes >= 30) || (currentHour == 15 && currentMinutes < 30)) searchTerm = timetable.SATURDAY.five;
            break;
    }
}

open();
