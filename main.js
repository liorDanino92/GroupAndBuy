document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded'); 

    // טיפול בתפריט הניווט
    let menu = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');

    menu.onclick = () => {
        menu.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    }

    window.onscroll = () => {
        menu.classList.remove('bx-x');
        navbar.classList.remove('active');
    }

    // הצגת חלון התחברות
    const loginButton = document.querySelector('#show-login');
    const popup = document.querySelector('.popup');
    const closePopupBtn = document.querySelector('.popup .close-btn');

    if (loginButton) {
        loginButton.addEventListener('click', function() {
            popup.classList.add('active1');
        });
    }

    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', function() {
            popup.classList.remove('active1');
        });
    }

    // טיפול בחלון מוצרים
    const modal = document.getElementById('productModal');
    const buttons = document.querySelectorAll('.open-modal');
    console.log('Number of buttons found:', buttons.length);

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Button clicked!');
            const farmerName = this.getAttribute('data-farmer');
            const products = this.getAttribute('data-products').split(',');

            const farmerNameElement = document.getElementById('farmerName');
            const productListElement = document.getElementById('productList');

            farmerNameElement.textContent = farmerName;
            productListElement.innerHTML = '';
            products.forEach(product => {
                const li = document.createElement('li');
                li.textContent = product;
                productListElement.appendChild(li);
            });

            modal.style.display = 'block';
        });
    });

    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// פתיחת פופאפ ההרשמה
const showRegisterButton = document.querySelector("#show-register");
const registerPopup = document.querySelector("#register-popup");
const closeRegisterButton = document.querySelector("#register-popup .close-btn");

if (showRegisterButton && registerPopup && closeRegisterButton) {
    showRegisterButton.addEventListener("click", function() {
        registerPopup.classList.add("active1");
    });

    // סגירת פופאפ ההרשמה
    closeRegisterButton.addEventListener("click", function() {
        registerPopup.classList.remove("active1");
    });
}

document.querySelectorAll('.toggle-password').forEach(toggleIcon => {
    toggleIcon.addEventListener('click', function() {
        const passwordInput = this.previousElementSibling;
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            this.classList.remove('bx-hide');
            this.classList.add('bx-show'); // שינוי לסמל ללא קו
        } else {
            passwordInput.type = 'password';
            this.classList.remove('bx-show');
            this.classList.add('bx-hide'); // שינוי לסמל עם קו
        }
    });
});


// וולידציה לטופס ההרשמה
document.querySelector("#register-form").addEventListener("submit", function(event) {
    event.preventDefault(); // מונע את שליחת הטופס עד לבדיקה

    const username = document.querySelector("#username").value;
    const email = document.querySelector("#register-email").value;  // בדוק שה-ID נכון
    const password = document.querySelector("#password").value; 
    const confirmPassword = document.querySelector("#confirm-password").value;

    // תבנית לבדוק אימייל תקין
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  

    // תבנית לסיסמה עם לפחות 8 תווים, אותיות ומספרים
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 

    let errorMessage = '';

    // בדיקת שם משתמש (אותיות ומספרים בלבד ולפחות 4 תווים, כולל אותיות וגם מספרים)
    const hasLetters = /[A-Za-z]/.test(username);  
    const hasNumbers = /[0-9]/.test(username);  

    // בדיקה אם שם המשתמש תקין
    if (!(hasLetters && hasNumbers) || username.length < 4) {
        errorMessage += 'שם המשתמש חייב להיות מורכב מאותיות ומספרים יחד ולהיות באורך של לפחות 4 תווים.\n';
    }

    // בדיקה אם כתובת האימייל תקינה
    if (!emailPattern.test(email)) {
        errorMessage += 'כתובת המייל שהזנת לא תקינה.\n';
    }

    // בדיקה אם הסיסמה עומדת בדרישות
    if (!passwordPattern.test(password)) {
        errorMessage += 'הסיסמה חייבת להיות באורך של 8 תווים לפחות ולכלול אותיות ומספרים.\n';
    }

    // בדיקה אם הסיסמה ואימות הסיסמה זהים
    if (password !== confirmPassword) {
        errorMessage += 'אימות הסיסמה לא תואם.\n';
    }

    // אם יש הודעת שגיאה מציגים אותה, אחרת סוגרים את הפופאפ
    if (errorMessage) {
        alert(errorMessage);
    } else {
        alert('הרשמה בוצעה בהצלחה!');
        registerPopup.classList.remove("active1"); // סגירת הפופאפ לאחר הצלחה
    }
});

