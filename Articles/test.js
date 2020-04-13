let replacefunction = function (wholeString, replacedString, targetString) {
    // a和b不能为空
    if (!wholeString || !replacedString) {
        return
    }
    // 转str
    wholeString += "";
    replacedString += "";
    targetString += "";
    // 查找和替换
    while (wholeString.indexOf(replacedString) != -1) {
        let startIndex = wholeString.indexOf(replacedString);

        let temp = wholeString.substr(0, startIndex) + targetString
            + wholeString.substr(startIndex + replacedString.length);
        wholeString = temp;
    }
    return wholeString;
}

// 如果输入的值是对象或者array应该对报错