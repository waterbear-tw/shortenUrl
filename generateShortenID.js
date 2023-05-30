function postfixGenerater() {
  const lowercaseAlph = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const uppercaseAlpha = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const charList = lowercaseAlph.concat(uppercaseAlpha).concat(numbers);
  let result = [];
  for (let i = 0; i !== 5; i++) {
    const total = charList.length;
    const index = Math.ceil(Math.random() * total) - 1;
    result.push(charList[index]);
  }

  const postfix = result.join("");

  return postfix;
}
