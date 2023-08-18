import { api } from '../lib/api_endpoint'

const userName = Math.random().toString(36).substring(2, 15)
const emailId = userName + "@domain.com"


describe('CRUD Api', () => {
    context('POST /public/v2/users', () => {
        it('Test CRUD request', () => {
            cy.request({
                method: 'POST',
                url: Cypress.env('url') + api.User_Create_Post_Api,
                headers: {
                    'authorization': 'Bearer ' + Cypress.env('token'), // Generate access token from https://gorest.co.in/consumer/login and add the same to cypress.env.json
                },
                body: {
                    "name": userName,
                    "gender": Cypress.env('gender'),
                    "email": emailId,
                    "status": Cypress.env('status')
                }
            }).then((response) => {
                expect(response).to.have.property('status').to.equal(201)
                expect(response.body).to.have.property('id').to.not.be.oneOf([null, ""])
                expect(response.body).to.have.property('name').to.equal(userName)
                expect(response.body).to.have.property('email').to.equal(emailId)
                const userId = response.body.id;
                cy.wrap(userId).as('userId');
                cy.log('log', 'Created a new user with id: ' + userId)
            })

            
            cy.get('@userId').then(userId => {
                cy.request({
                    method: 'GET',
                    url: Cypress.env('url') + api.User_Create_Get_Api + userId,
                    headers: {
                        'authorization': 'Bearer ' + Cypress.env('token'), // Generate access token from https://gorest.co.in/consumer/login and add the same to cypress.env.json
                    }
                }).then((response) => {
                    expect(response).to.have.property('status').to.equal(200)
                    expect(response.body).to.have.property('name').to.equal(userName)
                    expect(response.body).to.have.property('email').to.equal(emailId)
                    cy.log('log', 'Retrieved user with id: ' + userId)
                })
    
            })
            
           cy.get('@userId').then(userId =>{
            const email_update = Math.random().toString(36).substring(2, 15)
            cy.request({
                method: 'PUT',
                url: Cypress.env('url') + api.User_Create_Get_Api + userId,
                headers: {
                    'authorization': 'Bearer ' + Cypress.env('token'), // Generate access token from https://gorest.co.in/consumer/login and add the same to cypress.env.json
                },
                body: {
                    "name": "DemoTest",
                    "gender": "male",
                    "email": email_update+"@gmail.com",
                    "status": "active"
                }
            }).then((response) => {
                expect(response).to.have.property('status').to.equal(200)
                expect(response.body).to.have.property('name').to.equal("DemoTest")
                expect(response.body).to.have.property('email').to.equal(email_update+"@gmail.com")
                cy.log('log', 'Updated user with id: ' + userId)
            })
           })

            cy.get('@userId').then(userId =>{
                cy.request({
                    method: 'DELETE',
                    url: Cypress.env('url') + api.User_Create_Get_Api + userId,
                    headers: {
                        'authorization': 'Bearer ' + Cypress.env('token'), // Generate access token from https://gorest.co.in/consumer/login and add the same to cypress.env.json
                    }
                }).then((response) => {
                    expect(response).to.have.property('status').to.equal(204)
                    expect(response.body).to.be.empty
                    cy.log('log', 'Deleted user with id: ' + userId)
                })
            })

    })


})

  
})