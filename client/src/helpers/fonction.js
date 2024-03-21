export const checkPasswordStrength = (password) => {

    if (password.length < 8) {
        return false;
    }

    const hasNumber = /\d/.test(password);
    if (!hasNumber) {
        return false;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    if (!hasUpperCase) {
        return false;
    }

    const hasLowerCase = /[a-z]/.test(password);
    if (!hasLowerCase) {
        return false;
    }

    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
    if (!hasSpecialChar) {
        return false;
    }
    
    return true;
}