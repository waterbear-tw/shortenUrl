function postfixGenerator() {
  const lowercaseString = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseString = "ABCDEFGHIJKLMNOPQUSTUVWXYZ";
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const lowercaseAlph = lowercaseString.split("");
  const uppercaseAlpha = uppercaseString.split("");
  const charList = lowercaseAlph.concat(uppercaseAlpha).concat(numbers); //拼接字典陣列，保留修改的彈性

  let result = [];
  for (let i = 0; i !== 5; i++) {
    const total = charList.length;
    const index = Math.floor(Math.random() * total + 1);
    result.push(charList[index]);
  }

  const postfix = result.join("");
  return postfix;
}

module.exports = postfixGenerator;
