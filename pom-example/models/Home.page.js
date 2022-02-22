const BasePage = require('./Base.page');

class HomePage extends BasePage {
    constructor(page){
        super(page);

        //locators
        this.loggedUser = '.logged-user-name';
        this.balances = '.balance-value';
    }

    async navigate(){
        await super.navigate('app.html');
    }

    async getUserName(){
        let user = await this.page.$(this.loggedUser);
        return await user.innerText();
    }

    async getBalance(balType){
        //obtain the three balance values
        let balArray = await this.page.$$(this.balances);
        if(balType == 'total'){
            return (await balArray[0].$('span')).innerText();
        }
        else if(balType == 'credit'){
            return (await balArray[1]).innerText(); 
        }
        else { //default for due today
            return (await balArray[2]).innerText();
        }
    }
}
module.exports = HomePage;