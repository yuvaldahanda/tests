const SeleniumInfra = require("./seleniumInfra")


class StorePage {


    constructor(URL) {
        this.seleniumInfra = new SeleniumInfra()
        this.seleniumInfra.getURL(URL)
    }

    async isBold() {
        let styleDayInfo,style,index
        let arrayOfDays = await this.seleniumInfra.findElementListBy("className", "today")
        let arrayOfDaysInfo = await this.seleniumInfra.findElementListBy("className", "todayInfo")



        for (let i in arrayOfDays) {
            style = await arrayOfDays[i].getAttribute("style")
            styleDayInfo= await arrayOfDaysInfo[i].getAttribute("style")
            if (style.includes("bold") && styleDayInfo.includes("bold"))
            {   
                console.log("found bold string at day " + i )
                index=i
                break;
            }

        }
        if(new Date().getDay() == index)
        {
            console.log("the bold string at the correct day")
        }







    }


}

