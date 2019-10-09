let SeleniumInf = require('./seleniumInfra')


class HomePage {

    constructor(URL) {
        this.selenium = new SeleniumInf()
        this.selenium.getURL(URL)
    }

    async search(input) {
        try {
            await this.selenium.write("id", "inputSearch", input)
            await this.selenium.clickElement("id", "inputSearchSubmit", null, null)
            await this.selenium.URLvalidation(input)
        }
        catch (error) {
            console.error("theere is error in function search class HomePage")
        }

    }


    async advancedSearch(cakes, rating, date, s1, s2) {

        //click on specific check boxes
        let str
        let isValid
        await this.selenium.clickElement("id", "myBtn")
        await this.selenium.sleep() //create a function in selenium infra that make driver sleep for 2 sec
       
        for (let i in cakes) {
            try {
                await this.selenium.clickElement("xpath", "//input[@value='" + cakes[i] + "']")
            }
            catch (error) {
                console.log("the cake -> " + cakes[i] + " does not exist")
                
            }
        }
        for (let i in rating) {
            try {
                await this.selenium.clickElement("xpath", "//input[@value='" + rating[i] + "']")
            }
            catch (error) {
                console.log("the rate -> " + rating[i] + " does not exist")
            }
        }

        await this.selenium.write("className", "inputDate", date)
        await this.selenium.write("id", "input1", s1)
        await this.selenium.write("id", "input2", s2)
        await this.selenium.clickElement("id", "myBtnForm")

        let getTextFromOutPut = await this.selenium.findElementListBy("className", "searchOutput")
        let outPutresult = []
        for (let ob of getTextFromOutPut) {
            str += " " + await this.selenium.getTextFromElement(null, null, ob)
        }

        //once we have in isValid false then the output is not the same as the input
        for (let i in cakes) {
            if (!str.includes(cakes[i])) {
                    isValid = false
                    break;
            }
        }
        for (let i in rating) {
            if (!str.includes(rating[i])) {
                    isValid = false
                    break;
            }
        }
        if(!str.includes(date) )
        {   
            isValid = false
        }
        if(!str.includes(s1) )
        {   
            isValid = false
        }
        if(!str.includes(s2) )
        {   
            isValid = false
        }
        
        if(!isValid){
            console.log("the output does not match to input")
        }
        else{
            console.log("the outputmatch to input")
        }   

         await this.selenium.close()

    }



}
module.exports = HomePage




