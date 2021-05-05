describe('Attendance List Integration Test', function () {
    it('Check Basic Attendance Add Feature', function () {

        cy.visit("http://localhost:3000/attendance/list")
            .then(
                ()=>{
                    cy.wait(1000)
                    cy.get('span').contains('Submit').click()
                    cy.get('.p-toast-summary').should('include.text', 'Successful')
                }
            )
    })
})