function allFieldsDefined(object) {
  return Object.values(object).every((value) => value);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isPasswordValid(password) {
  return password && password.length >= 8 && password.length <= 12;
}

function isValidName(name) {
  return name && name.length > 1 && name.length <= 16;
}

function isValidGender(gender) {
  return gender === "Male" || gender === "Female";
}

function isValidWeight(weight) {
  return weight && weight >= 50 && weight <= 250;
}

function isValidHeight(height) {
  return height && height >= 50 && height <= 250;
}

module.exports = { allFieldsDefined, isValidEmail, isPasswordValid, isValidName, isValidGender, isValidWeight, isValidHeight };
