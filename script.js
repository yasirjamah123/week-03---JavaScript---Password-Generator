// Assignment Code
var generateBtn = document.querySelector("#generate");


// Function to generate a password
function generatePassword() {
  // Get the desired password length
  var passwordLength = getPasswordLength();
  if (passwordLength === null) {
    return; // User canceled the process
  }
  
  // Get selected character types
  var selectedCharacterTypes = getSelectedCharacterTypes();
  if (selectedCharacterTypes.length === 0) {
    alert('one minimum character type must be selected.');
    return generatePassword();
  }
  
  // Generate a random password based on the criteria
  var generatedPassword = generateRandomPassword(passwordLength, selectedCharacterTypes);
  
  // Display the generated password
  displayPassword(generatedPassword);
}

// Function to get the desired password length
function getPasswordLength() {
  var length;
  do {
    length = parseInt(prompt('Enter a password length between 8 & 128 characters):'));
    if (length === null) return null;
  } while (isNaN(length) || length < 8 || length > 128);
  return length;
}

// Function to get selected character types
function getSelectedCharacterTypes() {
  var types = [
    { name: 'uppercase letters', chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', include: confirm('do you want to include uppercase letters?') },
    { name: 'lowercase letters', chars: 'abcdefghijklmnopqrstuvwxyz', include: confirm('do you want to Include lowercase letters?') },
    { name: 'numbers', chars: '0123456789', include: confirm('do you want to Include numbers?') },
    { name: 'special characters', chars: '!@#$%^&*()_+-=[]{}|;:,.<>?', include: confirm('do you want to Include special characters?') },
  ];

  // Filter for selected types
  return types.filter(function (type) {
    return type.include;
  });
}

// Function to generate a random character from a character set
function generateRandomCharacter(charSet) {
  var randomIndex = Math.floor(Math.random() * charSet.length);
  return charSet.charAt(randomIndex);
}

// Function to generate a random password based on length and selected character types
function generateRandomPassword(length, characterTypes) {
  var password = '';
  characterTypes.forEach(function (charType) {
    if (charType.include) {
      password += generateRandomCharacter(charType.chars);
    }
  });

  while (password.length < length) {
    var randomCharType = characterTypes.filter(function (type) {
      return type.include;
    })[Math.floor(Math.random() * characterTypes.length)];
    password += generateRandomCharacter(randomCharType.chars);
  }
  
  return password;
}

// Function to display the generated password
function displayPassword(password) {
  alert('Generated Password: ' + password);
}
// Event listener for generating a password
document.getElementById('generate').addEventListener('click', generatePassword);
