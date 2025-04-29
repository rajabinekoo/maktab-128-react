function getInputs() {
  const msg = prompt("enter msg");
  const shiftNumber = Number(prompt("enter shift number"));
  return { shiftNumber, msg };
}

// normal range (0-25)
// ascii range (97-122)
function shift(char, shiftNumber, incremental) {
  const charAsciiCode = char.charCodeAt();
  // az ascii mibarim be normal + shiftNumber or - shiftNumber
  const result = charAsciiCode - 97 + (incremental ? 1 : -1) * shiftNumber;
  // momkene result az baze normal kharej bashe!
  // pas mode 26 migirim ke bargarde roo normal
  // az normal mibarim be ascii
  // adade manfi baghimandash be 26 kamtar az -25 nemishe va mishe ba 26 jam zad
  // adade mosbat vali kharab mishe va overflow mishe pas yek dor dige mod 25 migirim
  return (((result % 26) + 26) % 26) + 97;
}

function operation(isEncode) {
  const inputs = getInputs();
  let shiftedString = "";
  for (let char of inputs.msg) {
    shiftedString += String.fromCharCode(
      shift(char, inputs.shiftNumber, isEncode)
    );
  }
  return shiftedString;
}

function commander() {
  const command = prompt("encode or decode?");
  const result = operation(command === "encode");
  console.log(result);
}

commander();
