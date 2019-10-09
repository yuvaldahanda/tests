const { Builder, By, Key, until } = require('selenium-webdriver');
const path = require('chromedriver').path;
const chrome = require('selenium-webdriver/chrome');
let service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);




class seleniumInf {


    constructor() {
        this.driver = new Builder().forBrowser('chrome').build();
    }


    async getURL(URL) {
        await this.driver.get(URL);
    }

    async close() {
        await setTimeout(async () => { this.driver.quit() }, 2000)
    }
    async sleep() {
        await this.driver.sleep(2000)
    }


    async clickElement(locatorType, locatorValue, element, fromElement) {

        if(fromElement)
        {
            element = await this.findElementBy(null,null,fromElement)
        }
       
        if (!element) {
            try {
                element = await this.findElementBy(locatorType, locatorValue, null)
                await element.click();
                console.log('The element with the type '+locatorType +' and value '+locatorValue+' clicked \n')
            }
            catch (error) {
                throw error
            }
        }
        else {
            element.click()
        }
    }

    async write(locatorType, locatorValue, data, element) {

        if (element) {
            await element.sendKeys(data)
        }
        let getInput = await this.findElementBy(locatorType, locatorValue, null);
        await getInput.sendKeys(data)
        console.log("we write " + data + " to input")

        // element = await this.findElement(By[locatorType](locatorValue))
        // await element.sendKeys(data)


    }

    async getTextFromElement(locatorType, locatorValue, element, fromElement) {
        if(fromElement)
        {
           return await fromElement.findElement(By[locatorType](locatorValue)).getText()
        }
        if (!element) {
            return await this.driver.findElement(By[locatorType](locatorValue)).getText()
        }
        else{
            return await element.getText()
        }
    }



    async clearElementField(locatorType, locatorValue, element, fromElement) {
        if (!element) {
            element = await this.findElementBy(locatorType, locatorValue, null)
        }
        element.clear()
    }

    async isElementExist(locatorType, locatorValue) {
        try {
            let element = await this.findElementBy(locatorType, locatorValue, null)
            if (element) {
                return true
            }
            else { throw "there is not such element" }
        }
        catch (error) {
            return false
        }
    }

    async findElementBy(locatorType, locatorValue, element) {
        if (!element) {
            element = await this.driver.findElement(By[locatorType](locatorValue))
        }
        else{
            element = await element.findElement(By[locatorType](locatorValue))
        }
        return await element
    }

    async findElementListBy(locatorType, locatorValue) {
        let listElement = await this.driver.findElements(By[locatorType](locatorValue))
        return listElement
    }

    async URLvalidation(pageName) {
        try {
            console.log(await this.driver.wait(until.urlContains(pageName), 8000) + " we are in the current page ->"+pageName)
        } catch (error) {
            console.log(error);
        }
    }

    async findChild() {
        // getting information from https://film.list.co.uk/listings/woody-allen/ and console log all the detils in table
        let arrayOfObject = []
        let obj = {}
        try {
            let head = await this.driver.findElements(By.className("head"))
            let ul = await this.driver.findElements(By.className("info"))
            for (let i in ul) {
                let arr = await ul[i].findElements(By.tagName("li"))//getting li array of specfic ul
                obj.name = await head[i].getText()
                for (let k in arr)//remove all the empty cells so we always left  with array with array length with 3 indexes 0,1,2 year,country,time
                    if (await arr[k].getText() == "") {
                        arr.splice(k, 1)
                    }
                for (let j in arr) {
                    if (j == 0) {
                        obj.year = await arr[j].getText()
                    }
                    if (j == 1) {
                        obj.country = await arr[j].getText()
                    }
                    if (j == 2) {
                        obj.time = await arr[j].getText()
                    }
                    ;
                }
                arrayOfObject.push(obj)
                obj = {}
            }
            console.table(arrayOfObject)
        }
        catch (error) {
            console.log(error)
        }

    }

    async findElementByLabel(elem) {
        let element = await elem.getAttribute("value")
        return element
    }


}


module.exports = seleniumInf


