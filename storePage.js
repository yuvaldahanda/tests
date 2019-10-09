const SeleniumInfra = require("./seleniumInfra")


class StorePage {


    constructor(URL) {
        this.seleniumInfra = new SeleniumInfra()
        this.seleniumInfra.getURL(URL)
    }

    async isBold() {

        await this.seleniumInfra.sleep()

        let styleDayInfo, style, index
        let arrayOfDays = await this.seleniumInfra.findElementListBy("className", "today")
        let arrayOfDaysInfo = await this.seleniumInfra.findElementListBy("className", "todayInfo")
        let date = new Date()
        let weekday = new Array(7);




        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        let strDay = weekday[date.getDay()];

        console.log("today is " + strDay + " now lets see if the current day is bold ")

        for (let i in arrayOfDays) {
            style = await arrayOfDays[i].getAttribute("style")
            styleDayInfo = await arrayOfDaysInfo[i].getAttribute("style")
            if (style.includes("bold") && styleDayInfo.includes("bold")) {
                console.log("found bold string at day " + await arrayOfDays[i].getText())
                if (await arrayOfDays[i].getText() == strDay) {
                    console.log("the bold string at the correct day !!! awesome")
                }
                else{
                    console.log("wth .... the bold is not at the correct day progammer please fix it ,today is : "+strDay)
                }

                break;
            }

        }
        
     




        await this.seleniumInfra.close()

    }


}

module.exports = StorePage