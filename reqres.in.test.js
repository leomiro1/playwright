// to run rename the file to 'reqres.in.test.js'
// execute using command 'npx playwright test'

const { test, expect } = require('@playwright/test');

// Request context is reused by all tests in the file.
let apiContext;

// translate id to a variable to use it on the following tests
let _idUser = null;

/****************************************************************************/

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    // All requests we send go to this API endpoint.
    baseURL: 'https://reqres.in'
  });
})

test.afterAll(async ({ }) => {
  // Dispose all responses.
  await apiContext.dispose();
});

/****************************************************************************/

// GET ALL
test('list users', async ({ page }) => {
  const _response = await apiContext.get(`/api/users/`);
  expect(_response.ok()).toBeTruthy();
  expect(_response.status()).toBe(200);
  //console.log(await _response.json());
});

// GET ONE
test('list single user', async ({ page }) => {
    const _response = await apiContext.get(`/api/users/2`);
    expect(_response.ok()).toBeTruthy();
    expect(_response.status()).toBe(200);
    //console.log(await _response.json());
  });

// POST  
test('post user', async ({ page }) => {
    const _response = await apiContext.post(`/api/users/`, {
        data: {
            name: 'Liam',
            job: 'lawyer'
        }
      });
    expect(_response.ok()).toBeTruthy();
    expect(_response.status()).toBe(201);
    //console.log(await _response.json());
    // translate id to a variable to use it on the following tests
    const res = await _response.json();
    _idUser = res.id;
  });

 // PUT 
 test('put user', async ({ page }) => {
    const _response = await apiContext.post(`/api/users/${_idUser}`, {
        data: {
            name: 'Sonia',
            job: 'Accountant'
        }
      });
    expect(_response.ok()).toBeTruthy();
    expect(_response.status()).toBe(201);
    //console.log(await _response.json());
  });

 // DELETE 
 test('delete user', async ({ page }) => {
    const _response = await apiContext.post(`/api/users/${_idUser}`);
    expect(_response.ok()).toBeTruthy();
    expect(_response.status()).toBe(201);
    //console.log(await _response.json());
  });