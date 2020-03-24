// 1109 航班预定统计
var corpFlightBookings = function (bookings, n) {
    let bookingArray = []
    for (let i = 0, len = n; i < n + 2; i++) {
        bookingArray[i] = 0
    }
    for (let i = 0, len = bookings.length; i < len; i++) {
        let start = bookings[i][0]
        let end = bookings[i][1] + 1
        bookingArray[start] += bookings[i][2]
        bookingArray[end] -= bookings[i][2]
    }
    let resultArray = bookingArray.slice(1)
    // console.log(resultArray)
    for (let i = 0, len = resultArray.length; i < len; i++) {
        if (resultArray[i - 1]) {
            resultArray[i] += resultArray[i - 1]
        }
    }
    return resultArray.slice(0, resultArray.length - 1)
};

// 字符串分割
while (num = parseInt(readline())) {
    for (var i = 0; i < num; i++) {
        var str = readline();
        sliceStr(str);

    }
}
function sliceStr(str) {
    while (str.length % 8 != 0) {
        str = str + '0';
    }
    for (var j = 0; j < str.length; j += 8) {
        console.log(str.slice(j, j + 8));
    }
}

// 大数相加
function bigSum(a, b) {
    // 已 12345 和 678 为例
    // 我们需要先把他们转换为位数相同，不够补零，记住要统一加一位，为了两个最大的位数相加后可能需要进位
    // 12345 =>  012345    678 => 000678
    // 然后让各自的个位个位相加，十位与十位相加   5 + 8 = 3  （1为进位） 4 + 7 + 1 = 2 （1） .....
    a = '0' + a
    b = '0' + b
    let aArr = a.split('')
    let bArr = b.split('')
    let carry = 0
    let res = []
    let length = Math.max(aArr.length, bArr.length)
    let distance = aArr.length - bArr.length
    if (distance > 0) {
        for (let i = 0; i < distance; i++) {
            bArr.unshift('0');
        }
    } else {
        for (let i = 0; i < Math.abs(distance); i++) {
            aArr.unshift('0');
        }
    }
    for (let i = length - 1; i >= 0; i--) {
        let sum = Number(aArr[i]) + Number(bArr[i]) + Number(carry)
        carry = sum > 10 ? 1 : 0
        sum = sum > 10 ? parseInt(sum / 10) : sum
        res.unshift(sum)
    }
    return res.join('').replace(/^0/, '')
}

// 报数游戏
// https://blog.csdn.net/qq_43043859/article/details/100987897
function MyCircularQueue() {
    var items = [];
    //向队列插入元素
    this.enQueue = function (value) {
        return items.push(value);
    }
    //删除元素
    this.deQueue = function () {
        return items.shift();
    }
    //查看队列长度
    this.size = function () {
        return items.length;
    }
}

function countOff(m, n) {
    var queue = new MyCircularQueue();
    //将名单存入队列
    for (var i = 1; i <= m; i++) {
        queue.enQueue(i);
    }
    var loser = '';
    while (queue.size() > 1) {
        for (var i = 0; i < n - 1; i++) {
            queue.enQueue(queue.deQueue());
        }
        loser = queue.deQueue();
        console.log('被淘汰的人为：' + loser);
    }
    // return queue.deQueue();
    console.log('获胜者：' + queue.deQueue());
}
// console.log('获胜者：' + countOff(100, 5));
countOff(100, 5)

// 士兵分子弹
// [10, 2, 8, 22, 16, 4, 10, 6, 14, 20]
function fenZiDan(bulletArray) {
    console.log(bulletArray)
    // 子弹总数
    let total = 0;
    // 分子弹次数
    let times = 0;
    // 临时记录士兵第一次交出子弹后的数量
    let temp = new Array(bulletArray.length);
    // 初始化子弹总数
    for (let i = 0, len = bulletArray.length; i < len; i++) {
        total += bulletArray[i];
    }
    // 循环执行任务
    while (true) {
        // 每次执行添加次数
        times++;
        for (let i = 0, len = bulletArray.length; i < len; i++) {
            if (bulletArray[i] % 2 != 0) {
                // 向班长要一颗子弹
                total++;
                temp[i] = (bulletArray[i] + 1) / 2;
            } else {
                temp[i] = bulletArray[i] / 2;
            }
        }
        for (let i = 0, len = bulletArray.length; i < len; i++) {
            if (i > 0) {
                bulletArray[i] = temp[i - 1] + temp[i];
            } else {
                bulletArray[i] = temp[i] + temp[temp.length - 1];
            }

            // if (i != shibing.length - 1){
            //     console.log(shibing[i]+" ");
            // } else {
            //     console.log(shibing[i]+" ");
            // }
        }

        // 表示可以平均分,是子弹都相等的必要不充分条件,只有此时才会进行检查
        if (total % bulletArray.length == 0) {
            let isEnd = true;
            for (let i = 1, len = bulletArray.length; i < len; i++) {
                if (bulletArray[0] != bulletArray[i]) {
                    isEnd = false;
                    break;
                }
            }
            if (isEnd) {
                break;
            }
        }
    }
    console.log("总共进行了" + times + "次");
}

// 九宫格


// 单词压缩编码
// ['time','me','bell']
var minimumLengthEncoding = function (words) {
    let wordsLength = words.length;
    let reverseWords = new Array(wordsLength);

    for (let i = 0; i < wordsLength; i++) {

        let newstr = words[i].split("").reverse().join("");
        reverseWords[i] = newstr;
    }

    let result = 0;
    reverseWords.sort()
    // console.log(reverseWords)

    for (let i = 0; i < wordsLength - 1; i++) {
        //后面的字符不以当前打头
        if (!reverseWords[i + 1].includes(reverseWords[i])) {
            result += (reverseWords[i].length + 1);
        }

    }
    result += (reverseWords[wordsLength - 1].length + 1);
    return result;
};


// 打印任务排序
// https://blog.csdn.net/qq_15096707/article/details/43883013?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522158504191319725247660095%2522%252C%2522scm%2522%253A%252220140713.130056874..%2522%257D&request_id=158504191319725247660095&biz_id=0&utm_source=distribute.pc_search_result.none-task

var printerQueue = function (index, nums) {
    // 打印次数
    let count = 0;
    // 目标优先级
    let priority = nums[index];
    // 
    let splitArray;
    let stringLine = '';

    for (let i in nums) {
        if (i == index) {
            stringLine += 'p';
        }
        stringLine += nums[i];
    }

    for (let i = 9; i > priority; i--) {
        // zhaodao
        if (stringLine.indexOf(i) != -1) {
            splitArray = stringLine.split(i);
            count += splitArray.length - 1;
            stringLine = splitArray[splitArray.length - 1]
            for (let i = 0; i < splitArray.length - 1; i++) {
                stringLine += splitArray[i];
            }
        }
    }

    let checkArray = stringLine.split('');
    for (let i = 0; i < checkArray.length; i++) {
        if (checkArray[i] == 'p') {
            count += 1;
            break
        }
        if (checkArray[i] == priority) {
            count += 1;
        }
    }

    console.log(count);
}


// 字符串压缩
// https://www.nowcoder.com/questionTerminal/44da6966beb449d383f62b12e8df6317

var compressString = function (S) {
    // 空串处理
    if (S.length == 0) {
        return S;
    }
    let result = '';
    let currentChar = S[0];
    let count = 1;
    for (let i = 1, len = S.length; i < len; i++) {
        if (currentChar == S[i]) {
            count += 1;
        } else {
            result += currentChar + count
            currentChar = S[i]
            count = 1
        }
    }
    result += currentChar + count;
    return result.length >= S.length ? S : result;
};


// 双列表元素分配
var select = function (nums) {




}



