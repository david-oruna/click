function showForm(formType) {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'none';

    if (formType === 'register') {
      document.getElementById('registerForm').style.display = 'block';
    } else if (formType === 'login') {
      document.getElementById('loginForm').style.display = 'block';
    }
  }