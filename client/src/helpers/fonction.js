import moment from "moment";

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

    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
        password,
    );
    if (!hasSpecialChar) {
        return false;
    }

    return true;
};

export const getAgeOfDog = (birthDate) => {
    const diff = Math.abs(moment() - moment(birthDate, "DD/MM/YYYY"));

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor(
        (diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44),
    );

    let result = "";
    if (years > 0) {
        result += years === 1 ? "1 an" : `${years} ans`;
        if (months > 0) {
            result += ` et ${months} mois`;
        }
    } else {
        result = `${months} mois`;
    }

    return result;
};
