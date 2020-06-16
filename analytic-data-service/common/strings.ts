function stringToUint(string: any) {
  var string: any = btoa(unescape(encodeURIComponent(string))),
    charList = string.split(""),
    uintArray = [];
  for (var i = 0; i < charList.length; i++) {
    uintArray.push(charList[i].charCodeAt(0));
  }
  return new Uint8Array(uintArray);
}

function uintToString(uintArray: any) {
  var encodedString = String.fromCharCode.apply(null, uintArray),
    decodedString = decodeURIComponent(escape(encodedString));
  return decodedString;
}

function getStringOrDefault(dictData: any, key: any, _default: any): any {
  try {
    return uintToString(stringToUint(String(dictData[key])));
  } catch (error) {
    return _default;
  }
}

function FormatString(str: string, ...val: string[]) {
  for (let index = 0; index < val.length; index++) {
    str = str.replace(`{${index}}`, val[index]);
  }
  return str;
}

export { getStringOrDefault, FormatString };
