// to run with Jest rename the file to 'bookstore.test.js'
// execute on console with command "npm test"

const { chromium } = require('playwright');

describe ('UI tests for bookstore using playwright', () => {

    jest.setTimeout(10000);

    let browser = null;
    let page = null;
    let context = null;

    let firstRowCells = null;

    //locators
    let locatorsearchBox = "#searchBox";
    let locatorfirstRowCells = ".ReactTable .rt-tr-group:nth-child(1) .rt-td";

    beforeAll (async() => {
    
        browser = await chromium.launch({headless:false});
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://demoqa.com/books');
    
    });

    afterAll (async() => {
        await browser.close();
    });

    test ('Should load page', async() => {
        expect(page).not.toBeNull();
        expect(await page.title()).not.toBeNull();
        expect(await page.title()).toBe('ToolsQA');
    });

    test ('Should be able to search for eloquent javascript book', async() => {
        await page.fill(locatorsearchBox,'Eloquent');
    });

    test ('Should check if book image is OK', async() => {
        //obtain the four divs that are in the first row cell div
        firstRowCells = await page.$$(locatorfirstRowCells);
        let imgUrl = await firstRowCells[0].$('img');
        expect(await imgUrl.getAttribute('src')).not.toBeNull();
    });

    test ('Should check if book title is OK', async() => {
        expect(await firstRowCells[1].innerText()).toBe('Eloquent JavaScript, Second Edition');
    });

    test ('Should check if book author is OK', async() => {
        expect(await firstRowCells[2].innerText()).toBe('Marijn Haverbeke');
    });

    test ('Should check if book publisher is OK', async() => {
        expect(await firstRowCells[3].innerText()).toBe('No Starch Press');
    });

});  