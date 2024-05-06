describe('Login Page', () => {
  it('should display login form correctly', () => {
      cy.visit('/login'); // Assuming your login page URL is /login
      cy.eyesOpen({
          appName: 'YourAppName',
          testName: 'Login Page Test',
      });
      cy.eyesCheckWindow('Login Form');
      cy.get('form').submit(); // Submit the form to test form submission state
      cy.eyesCheckWindow('Form Submission');
      cy.eyesClose();
  });
});
