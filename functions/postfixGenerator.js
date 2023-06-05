function postfixGenerator() {
  const lowercaseString = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseString = "ABCDEFGHIJKLMNOPQUSTUVWXYZ";
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const lowercaseAlph = lowercaseString.split("");
  const uppercaseAlpha = uppercaseString.split("");
  //字典陣列，用以產生後綴亂碼
  const charList = lowercaseAlph.concat(uppercaseAlpha).concat(numbers);

  let result = [];
  //固定產生5碼亂數
  for (let i = 0; i !== 5; i++) {
    const total = charList.length;
    const index = Math.floor(Math.random() * total + 1); //隨機抽取亂碼的index加入結果陣列
    result.push(charList[index]);
  }

  const postfix = result.join("");
  return postfix; //組成後綴亂碼後回傳
}

module.exports = postfixGenerator;
