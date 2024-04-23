document.addEventListener("DOMContentLoaded", function(){
    const form = document.getElementById("form");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const buttonShowHide = document.getElementById("buttonShowHide");
    
    form.addEventListener("submit", function(event){
        event.preventDefault();
        validateForm();
    })

    email.addEventListener("blur", function(){
        validateEmail();
    })

    email.addEventListener("change", function(){
        clearError(emailError);
    })
    
    password.addEventListener("change", function(){
        clearError(passwordError);
    })
    
    confirmPassword.addEventListener("change", function(){
        clearError(confirmPasswordError);
    })

    buttonShowHide.addEventListener("click", function(){
        if(password.type == "password"){
            password.type = "text";
            confirmPassword.type = "text";
        }else{
            password.type = "password";
            confirmPassword.type = "password";
        }
    })

    function validateForm(){
        const isValidEmail = validateEmail();
        const isValidPassword = validatePassword();
        const isValidPasswordMatch = validatePasswordMatch();
        if(isValidEmail && isValidPassword && isValidPasswordMatch){
            saveToLocalStorage();
            alert("Has ingresado con éxito");
        }
    }

    function validateEmail(){
        const emailEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        const emailValue = email.value.trim(); // para eliminar el espacio
        if(!emailEx.test(emailValue)){
            showError(emailError, "¡Los datos son inválidos!");
            return false;
        }
        return true;
    }

    function validatePassword(){
        const passwordValue = password.value.trim();
        if(passwordValue.length < 6){
            showError(passwordError, "¡Ingresa una contraseña de al menos 6 caracteres!");
            return false;
        }
        return true;
    }

    function validatePasswordMatch(){
        const passwordValue = password.value.trim();
        const confirmPasswordValue = confirmPassword.value.trim();
        if(passwordValue != confirmPasswordValue){
            showError(confirmPasswordError, "¡Las contraseñas no coinciden!");
            return false;
        }
        return true;
    }

    function showError(errorElement, message){
        errorElement.innerHTML = message;
        errorElement.style.display = "block";
    }

    function clearError(errorElement){
        errorElement.innerHTML = "";
        errorElement.style.display = "none";
    }

    function saveToLocalStorage(){
        const emailValue = email.value.trim();
        localStorage.setItem("email", emailValue);
        const body = bodyBuilderJSON();
        console.log(body);
    }

    function bodyBuilderJSON(){
        return{
            "email": email.value,
            "password": password.value,
        }
    }
});