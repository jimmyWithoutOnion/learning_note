function fibo(num) {
    if (num == 0) {
        return 0
    }
    if (num == 1) {
        return 1
    }

    return fibo(num - 1) + fibo(num - 2)
}


function fibo1(num) {
    let nums = [];
    for (let i = 0; i < num + 1; i++) {
        if (i == 0) {
            nums.push(0)
        } else if (i == 1) {
            nums.push(1)
        } else {
            let sum = nums[i - 1] + nums[i - 2];
            nums.push(sum);
        }
    }
    console.log(nums)
    return nums[num]
}

// 变量提升
var t = new Date()
function f() {
    console.log(t)
    if (false) {
        var t = 'hello world'
    }
}
f()

// 深浅拷贝
var obj = {
    aa: 1,
    b: {
        item: '45'
    }
}
var newObj = Object.assign({}, obj)
obj.aa = 2
obj.b.item = 'kk'
console.log(newObj.aa)
console.log(newObj.b.item)

