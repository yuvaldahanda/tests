let SeleniumInf = require('./seleniumInfra')


class ProductPage{

    constructor(URL){
        this.seleniumInfra = new SeleniumInf()
        this.seleniumInfra.getURL(URL)
        this.up
        this.down
    }

    async getTableElements()
    {
        let elementFromTable =await this.seleniumInfra.findElementListBy("className","ItemContainerHeadline")

        this.up={
            left:await elementFromTable[0].getText(),
            right:await elementFromTable[1].getText()
        }
        this.down = {
            left:await elementFromTable[2].getText(),
            right:await elementFromTable[3].getText()
        }
        

    }
    async checkIfTheCakeInTheirPlace(cakes)
    {
        if(this.up.left == cakes[0] && this.up.right == cakes[1])
        {
            console.log("The cakes: "+cakes+" that you check is the Same yay! \n")
        }
        else{
            console.log("something Wrong the cakes that you send: "+cakes+" are not the same")
        }

    }
    
    
    async pressUp(cakeBefore, cakeAfter) 
    {
        await this.getTableElements()
        await this.checkIfTheCakeInTheirPlace(cakeBefore)
        await this.seleniumInfra.clickElement("id","arrow-up") 
        await this.getTableElements()
        await this.checkIfTheCakeInTheirPlace(cakeAfter)
        await this.seleniumInfra.close()
    }
    
    async pressDown(cakeBefore,cakeAfter)
    {
        await this.getTableElements()
        await this.checkIfTheCakeInTheirPlace(cakeBefore)
        await this.seleniumInfra.clickElement("id","arrow-down") 
        await this.getTableElements()
        await this.checkIfTheCakeInTheirPlace(cakeAfter)
        await this.seleniumInfra.close()
    }



}
module.exports = ProductPage