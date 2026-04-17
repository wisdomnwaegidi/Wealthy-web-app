// Function to generate a random alphanumeric string of given length
function generateRandomString(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  console.log(result)
  return result;
}

// Function to generate a unique roll number based on institution-specific criteria
function generateRollNumber() {
  // In this example, we'll use a combination of institution code and random alphanumeric string
  const institutionCode: string = "WHA"; // Replace 'INST' with your institution code
  const randomString: string = generateRandomString(3); // Generate a 6-character random string
  return `${institutionCode}${randomString}`;
}

// Example usage
const rollNumber: string = generateRollNumber();
console.log(rollNumber); // Output: INST1A2B3
