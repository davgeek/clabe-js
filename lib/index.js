const BANKS = require('./banks.js').BANKS;
const BANK_NAMES = require('./banks.js').BANK_NAMES;

const CLABE_LENGTH = 18;
const CLABE_WEIGHTS = [3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7];

function computeControlDigit(clabe){
  /*
  Compute CLABE control digit according to
    https://es.wikipedia.org/wiki/CLABE#D.C3.ADgito_control
  */
  const clabeList = clabe.split("");
  const clabeInt = clabeList.map((i) => Number(i));
  const weighted = [];

  for(var i = 0; i < CLABE_LENGTH - 1; i++) {
    weighted.push(clabeInt[i] * CLABE_WEIGHTS[i] % 10);
  }
  const summed = weighted.reduce((curr, next) => curr + next) % 10;
  const controlDigit = (10 - summed) % 10;
  return controlDigit.toString();
}

function validateClabe(clabe){
  /*
  Validate CLABE according to
    https://es.wikipedia.org/wiki/CLABE#D.C3.ADgito_control
  */
  return isANumber(clabe) &&
  clabe.length === CLABE_LENGTH &&
  {}.hasOwnProperty.call(BANKS, clabe.substring(0, 3)) &&
  clabe.substring(CLABE_LENGTH - 1) === computeControlDigit(clabe);
}

function getBankName(clabe){
  /*
  Regresa el nombre del banco basado en los primeros 3 digitos
    https://es.wikipedia.org/wiki/CLABE#D.C3.ADgito_control
  */
  const code = clabe.substring(0, 3);
  const bankName = BANK_NAMES[BANKS[code]];

  if(bankName === undefined) throw Error('Ningún banco tiene este código ' + code);
  return bankName;
}

function getBankCode(clabe){
  return clabe.substring(0, 3);
}

function getAccountNumber(clabe){
  return clabe.substring(6, clabe.length-1);
}

// will return true only if characters in a string are digits
function isANumber(str){
  return !/\D/.test(str);
}

module.exports.BANKS = BANKS;
module.exports.BANK_NAMES = BANK_NAMES;
module.exports.validateClabe = validateClabe;
module.exports.getBankName = getBankName;
module.exports.getBankCode = getBankCode;
module.exports.getAccountNumber = getAccountNumber;
module.exports.computeControlDigit = computeControlDigit;
