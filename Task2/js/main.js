const notify = document.getElementById("notify");
const button = document.querySelector("#button");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const postalcode = document.getElementById("postalcode");
const password = document.getElementById("password");

function validateForm() {
    if (firstName.value == "") {
        notify.style.top = `${firstName.offsetTop + 52}px`;
        notify.style.left = `${firstName.offsetLeft}px`;
        notify.innerHTML = "Fill out your First Name";
        firstName.focus();
        //firstName.style.border = '1px solid red';
        return false;
    }

    if (lastName.value == "") {
        notify.style.top = `${lastName.offsetTop + 52}px`;
        notify.style.left = `${lastName.offsetLeft}px`;
        notify.innerHTML = "Fill out your Last Name";
        lastName.focus();
        return false;
    }

    if (email.value == "") {
        notify.style.top = `${email.offsetTop + 52}px`;
        notify.style.left = `${email.offsetLeft}px`;
        notify.innerHTML = "Fill out your Email";
        email.focus();
        return false;
    } else {
        const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.value.match(emailFormat)) {} else {
            notify.style.top = `${email.offsetTop + 52}px`;
            notify.style.left = `${email.offsetLeft}px`;
            notify.innerHTML = "Your Email is not correct!";
            email.focus();
            return false;
        }
    }


    if (phone.value != "") {
        const phoneFormat = /^[\+]([0-9]{12})$/;
        if (phone.value.match(phoneFormat)) {} else {
            notify.style.top = `${phone.offsetTop + 52}px`;
            notify.style.left = `${phone.offsetLeft}px`;
            notify.innerHTML = "Your Phone is not correct! (ex: +358451053344)";
            phone.focus();
            return false;
        }
    }


    if (postalcode.value != "") {
        const codeFormat = /^([0-9]{5})$/;
        if (postalcode.value.match(codeFormat)) {} else {
            notify.style.top = `${postalcode.offsetTop + 52}px`;
            notify.style.left = `${postalcode.offsetLeft}px`;
            notify.innerHTML = "Your Postal Code is not correct! (5 numbers)";
            postalcode.focus();
            return false;
        }
    }
    if (password.value == "") {
        notify.style.top = `${password.offsetTop + 52}px`;
        notify.style.left = `${password.offsetLeft}px`;
        notify.innerHTML = "Fill out your Password";
        password.focus();
        return false;
    }

}


//button.addEventListener("click", validate);