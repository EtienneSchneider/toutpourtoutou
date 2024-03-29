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

export const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();

    return `${day}/${month}/${year}`;
};

export function getTodayDate() {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1; // Les mois vont de 0 à 11, donc on ajoute 1
    let year = today.getFullYear();

    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }

    return day + "/" + month + "/" + year;
}

export function getUniquePropertyValues(arr, propName) {
    const uniqueValues = new Set();
    arr.forEach((obj) => {
        uniqueValues.add(obj[propName]);
    });
    return Array.from(uniqueValues);
}

const parsePrice = (priceString) => {
    return parseFloat(priceString.replace("€", "").trim());
};

export function sortData(data, sortValue) {
    switch (sortValue) {
        case "a-z":
            return [...data].sort((a, b) => a.brand.localeCompare(b.brand));
        case "z-a":
            return [...data].sort((a, b) => b.brand.localeCompare(a.brand));
        case "asc":
            return [...data].sort(
                (a, b) => parsePrice(a.price) - parsePrice(b.price),
            );
        case "desc":
            return [...data].sort(
                (a, b) => parsePrice(b.price) - parsePrice(a.price),
            );
        default:
            return data;
    }
}

export const stringToAge = (birthDate) => {
    var parts = birthDate.split("/");
    var day = parseInt(parts[0]);
    var month = parseInt(parts[1]) - 1; // Mois commence à 0 dans JavaScript
    var year = parseInt(parts[2]);

    var dateNaissanceObj = new Date(year, month, day);
    var todayDate = new Date();
    var diff = todayDate - dateNaissanceObj;

    // Conversion de la différence en millisecondes en mois
    var ageInMonths = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));

    return ageInMonths;
};