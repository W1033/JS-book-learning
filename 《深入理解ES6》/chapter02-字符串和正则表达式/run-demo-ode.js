// "𠮷"为日文字，不是中文"吉"
let text = "𠮷";
console.log(text.length);   // 2 
console.log(/^.$/.test(text));  // false 
console.log(text.charAt(0));        // ""
console.log(text.charAt(1));        // "" 
console.log(text.charCodeAt(0));    // 55362

// ------