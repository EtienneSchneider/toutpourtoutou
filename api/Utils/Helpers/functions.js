import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
    });
};

export const sanitizeObject = (obj, rule) => {
    if (typeof obj !== "object" && typeof rule !== "object") {
        throw new Error("obj or rule is not an object");
    }

    for (const key of Object.keys(rule)) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === rule[key]) {
                return true;
            }
            throw new Error(`Wrong type for property ${key}`);
        }
        throw new Error(`Missing property ${key}`);
    }
};

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

export const generateRandomString = (length) => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomString += charset[randomIndex];
    }
    return randomString;
}
