// 1. 两数只和
var twoSum = function (nums, target) {
    let myMap = new Map();
    for (let i = 0; i < nums.length; i++) {
        myMap.set(nums[i], i);
    }

    for (let i = 0; i < nums.length; i++) {
        let diff = target - nums[i];
        let result = myMap.get(diff);
        if (result && result !== i) {
            return [i, result];
        }
    }
}

// 8. 字符串转换整数
var myAtoi = function (str) {
    str.trim();
    if (typeof str[0] != "number" || str[0] !== "-") {
        return 0
    }
    for (let i = 0; i < str.length; i++) {
        if (typeof str[i] == "number") {

        }
    }
};

// 20. 
var isValid = function (s) {
    if (s.length % 2 != 0) {
        return false;
    }
    let match = { '(': ')', '{': '}', '[': ']' };
    let stack = [];
    for (let i = 0; i < s.length; i++) {
        if (stack.length === 0) {
            stack.push(s[i]);
        } else {
            if (match[stack[stack.length - 1]] === s[i]) {
                stack.pop();
            } else {
                stack.push(s[i]);
            }
        }
    }
    return stack.length === 0 ? true : false;
};

// 21. 合并两个有序链表
var mergeTwoLists = function (l1, l2) {
    if (l1 == null) {
        return l2;
    } else if (l2 == null) {
        return l1;
    } else if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }
};
// 58 最后一个单词的长度
var lengthOfLastWord = function (s) {
    let trimedString = s.trim()
    let count = 0
    let index = trimedString.length - 1
    while (index >= 0 && trimedString[index] !== ' ') {
        count += 1
        index -= 1
    }
    return count
};

// 105 从前序和中序遍历序列构造二叉树



// 217 存在重复元素
var containsDuplicate = function (nums) {
    let bracket = {}
    for (let i = 0; i < nums.length; i++) {
        if (bracket[nums[i]]) {

            return true
        } else {
            bracket[nums[i]] = 1
        }
    }
    return false
};

// 206 反转链表
var reverseList = function (head) {

    let pre = null, current = head, post = null
    while (current) {
        post = current.next
        current.next = pre

        pre = current
        current = post
    }
    return pre
};

// 240 搜索二维矩阵2
var searchMatrix = function (matrix, target) {

    if (matrix.length > 0 && matrix[0].length > 0) {
        let row = 0
        let col = matrix[0].length - 1
        while (row < matrix.length && col >= 0) {
            if (target > matrix[row][col]) {
                row += 1
            } else if (target < matrix[row][col]) {
                col -= 1
            } else {
                return true
            }
        }
    }
    return false
};


