function third(targetList) {
    let longestList = []
    thirdHelper(targetList, longestList)

    let result = Math.max.call(Math, longestList)
    return result;
}

function thirdHelper(targetList, lengthList) {
    let firstNum
    let secondNum
    let continueLength = 0

    for (let i = 0; i < targetList.length; i++) {


        firstNum = targetList[i]
        if (firstNum != targetList[i]) {
            secondNum = targetList[i]
            break
        }

    }
    for (let i = 0; i < targetList.length; i++) {

        if (targetList[i] == firstNum || targetList[i] == secondNum) {
            continueLength += 1
        } else {
            break
        }

    }
    lengthList.push(continueLength)

    targetList.pop(0)

    third(targetList)
}