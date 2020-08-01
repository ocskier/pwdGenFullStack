const allChars = [
  'abcdefghijklmnopqrstuvwxyz'.split(''),
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.split(''),
  '0123456789'.split(''),
];
const passwordObj = {
  length: 0,
  questions: [
    'Lowercase characters?',
    'Uppercase characters?',
    'Special characters?',
    'Numeric characters?',
  ],
  answers: [],
};
const codeBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copy');
const pwdOutput = document.getElementById('password');
const trigger = document.getElementById('modal-trigger');
const modal = document.querySelector('.modal-body');

let filteredCharTypes = [];

async function generateCode() {
  let validCode = false;
  try {
    let response = await generatePossibleCode();
    let { possibleCode } = await response.json();
    while (!validCode) {
      const filteredAllChars = allChars.filter(
        (value, i) => filteredCharTypes.indexOf(i) !== -1
      );
      validCode = filteredAllChars.every((value) =>
        value.find((char) => String(possibleCode).includes(char))
      );
      if (!validCode) possibleCode = await generatePossibleCode();
    }
    pwdOutput.textContent = possibleCode;
  } catch (err) {
    console.log(err);
    startOver('There was a problem generating the passcode!');
  }
}
function generatePossibleCode() {
  return fetch('/password', {
    method: 'POST',
    body: JSON.stringify({
      ...passwordObj,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
}
function startOver(msg) {
  alert(msg);
}
function getAnswers() {
  const passwordLength = modal.children[0].children[0].value;
  if (passwordLength < 8 || (passwordLength > 128) | !passwordLength) {
    startOver('Password Length Invalid!');
  } else {
    passwordObj.length = passwordLength;
    let oneCharTypeSelected = false;
    passwordObj['answers'] = [];
    for (let i = 1; i <= passwordObj.questions.length; i++) {
      const charTypeAns =
        modal.children[i].children[0].children[0].children[0].checked;
      if (oneCharTypeSelected === false) {
        oneCharTypeSelected = charTypeAns;
      }
      passwordObj['answers'].push(charTypeAns);
    }
    filteredCharTypes = passwordObj.answers
      .map((answer, i) => {
        if (answer) {
          return i;
        }
      })
      .filter((index) => typeof index === 'number');
    oneCharTypeSelected === true
      ? generateCode()
      : startOver('No valid char types entered!');
  }
}
trigger.addEventListener('click', function () {
  pwdOutput.textContent = '';
});
codeBtn.addEventListener('click', getAnswers);
copyBtn.addEventListener('click', function () {
  pwdOutput.select();
  document.execCommand('copy', false, pwdOutput.textContent);
});
