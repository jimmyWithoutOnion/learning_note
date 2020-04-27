// dfs 
var findSum = function (root, sum) {
    let stack = []
    stack.push(root)
    let compareList = []

    while (stack.length != 0) {
        let node = stack.pop()




    }
}


// 1
var minSum = function (nums) {
    if (!nums) {
        return null
    }

    let depth = nums.length
    let width = nums[nums.length - 1].length

    let dp = new Array(depth)
    for (let i = 0; i < depth; i++) {
        dp[i] = new Array(width).fill(Number.MAX_VALUE)
    }

    dp[0][0] = nums[0][0]

    for (let i = 1; i < depth; i++) {

        for (let j = 0; j < width; j++) {
            if (j >= 1) {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1]) + muns[i][j]
            } else {
                dp[i][j] = dp[i - 1][j] + muns[i][j]
            }

        }

    }
    let result = Number.MAX_VALUE
    for (let i = 0, len = dp[dp.length - 1].length; i < len; i++) {
        let num = dp[dp.length - 1][i]
        if (num < result) {
            result = num
        }
    }
    return result
}


// 2
var finMin = function (nums) {
    if (!nums) {
        return null
    }
    let result = []
    for (let i = 0, len = nums.length; i < len; i++) {
        result.push(findMinHelper(nums[i], i, nums))
    }
    return result
}

var findMinHelper = function (target, index, nums) {
    let count = 0
    for (let i = 0, len = nums.length; i < len; i++) {
        if (nums[i] < target && i != index) {
            count += 1
        }
    }
    return count
}