describe('SignUp Component', () => {
  beforeEach(() => {
    cy.visit('https://personal-budget-web-gamma.vercel.app/signup'); // Replace this with the actual path to your SignUp component
  });

  it('should display validation errors if login details are incorrect', () => {
    // Click the login button without filling out the form
    cy.get('button[type="submit"]').click();
    // Expect error notification to appear
    cy.contains('Please fill all the details').should('be.visible');
  });

  it('should display sign up form with name, email, and password fields', () => {
    cy.get('form[name="basic"]').should('exist');
    cy.get('input[name="name"]').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
  });

  it('should display error notification when submitting empty form', () => {
    cy.get('form[name="basic"]').submit();
    cy.contains('Please fill all the details').should('be.visible');
  });

  it('should display success notification and navigate to home page on successful sign up', () => {
    // Assuming you have test data for name, email, and password
    const name = 'Test User';
    const email = 'test@example.com';
    const password = 'testpassword';
    
    cy.intercept('POST', '/api/signup', {
      statusCode: 200,
      body: { success: true }, // Assuming your backend returns a success response
    }).as('signupRequest');

    cy.get('input[name="name"]').type(name);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('form[name="basic"]').submit();

    cy.wait('@signupRequest').then(() => {
      cy.location('pathname').should('eq', '/'); // Assuming successful sign up redirects to home page
      cy.contains('Welcome to Home Page').should('be.visible'); // Assuming 'Welcome to Home Page' text exists on home page
    });
  });

  // Add more tests for other scenarios as needed
});
