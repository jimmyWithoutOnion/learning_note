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
// var myAtoi = function (str) {
//     str.trim();
//     if (typeof str[0] != "number" || str[0] !== "-") {
//         return 0
//     }
//     for (let i = 0; i < str.length; i++) {
//         if (typeof str[i] == "number") {

//         }
//     }
// };

// 20. 有效括号
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
var buildTree = function (preorder, inorder) {

    // 结束条件
    if (inorder.length == 0) {
        return null
    }
    // if (inorder.length == 1) {
    //     let parent = new TreeNode(inorder[0])
    //     return parent
    // }

    // 递归部分
    let rootNodeVal = preorder[0]
    let midIndex = inorder.indexOf(rootNodeVal)

    let leftChildNode = buildTree(preorder.slice(1, midIndex + 1), inorder.slice(0, midIndex))
    let rightChildNode = buildTree(preorder.slice(midIndex + 1), inorder.slice(midIndex + 1))

    // 拼装tree node 返回
    let rootNode = new TreeNode(rootNodeVal)
    rootNode.left = leftChildNode
    rootNode.right = rightChildNode
    return rootNode
};




// 105 寻找旋转排序数组中的最小值

var findMin = function (nums) {
    let head = 0
    let end = nums.length - 1

    while (head <= end) {
        let mid = parseInt(head + (end - head) / 2)

        if (nums[mid] < nums[head]) {
            end = mid - 1
        } else if (nums[mid] > nums[head]) {
            head = mid + 1
        } else {
            return mid
        }
    }
    return -1
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

// 232 用栈实现队列
// class MyQueue:

// def __init__(self):
// self.inStack = []
// self.outStack = []


// def push(self, x: int) -> None:
// self.inStack.append(x)


// def pop(self) -> int:
// if len(self.outStack) == 0:
//     while len(self.inStack) > 0:
//         self.outStack.append(self.inStack.pop())
// return self.outStack.pop()


// def peek(self) -> int:
// if len(self.outStack) == 0:
//     while len(self.inStack) > 0:
//         self.outStack.append(self.inStack.pop())
// return self.outStack[-1]


// def empty(self) -> bool:
// return len(self.inStack) == 0 and len(self.outStack) == 0

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

// 509 斐波那切数
var fib = function (N) {
    // 1. 递归
    // if (N === 0) {
    //     return 0
    // }
    // if (N === 1) {
    //     return 1
    // }
    // return fib(N - 1) + fib(N - 2)

    // 2. 
    let fibList = [0, 1]

    for (let i = 0; i < N - 1; i++) {
        fibList[2 + i] = fibList[0 + i] + fibList[1 + i]
    }
    return fibList[N]
};

// 704 二分查找
var search = function (nums, target) {
    let head = 0
    let end = nums.length - 1

    while (head <= end) {
        let mid = parseInt(head + (end - head) / 2)

        if (nums[mid] > target) {
            end = mid - 1
        } else if (nums[mid] < target) {
            head = mid + 1
        } else {
            return mid
        }
    }
    return -1
};

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



// 树相关 刷题
// 树相关 刷题
// 树相关 刷题
// 树相关 刷题
// 树相关 刷题
// 226 翻转二叉树 
// 简单 


// 递归实现 
// var invertTree = function(root) {
//     invertTreeHelper(root)
//     return root
// };


// var invertTreeHelper = function(root) {
//     if (root) {
//         temp = root.left
//         root.left = root.right
//         root.right = temp

//         //console.log(root.left)
//         invertTreeHelper(root.left)
//         invertTreeHelper(root.right)
//     }
// }

// bfs 实现
var invertTree = function (root) {
    let queue = []
    let res = root

    queue.push(res)
    while (queue.length != 0) {
        let node = queue.shift()
        if (!node) {
            break
        }
        temp = node.left
        node.left = node.right
        node.right = temp

        if (node.right) {
            queue.push(node.right)
        }
        if (node.left) {
            queue.push(node.left)
        }

    }
    return res
}

// 144 二叉树的前序遍历
// 中等

// 递归实现
var preorderTraversal = function (root) {
    let res = []
    preorderTraversalHelper(root, res)
    return res
};

var preorderTraversalHelper = function (node, list) {

    if (!node) {
        return
    }
    list.push(node.val)
    preorderTraversalHelper(node.left, list)
    preorderTraversalHelper(node.right, list)

}

// 迭代实现
var preorderTraversal = function (root) {
    let stack = []
    stack.push(root)
    let res = []

    while (stack.length != 0) {
        let node = stack.pop()
        if (!node) {
            continue
        }
        res.push(node.val)

        stack.push(node.right)
        stack.push(node.left)


    }
    return res

}


// 莫里斯实现


// 94 二叉树的中序遍历 
// 中等

// 递归实现
var inorderTraversal = function (root) {
    let res = []
    traversalHelper(root, res)
    return res
};

var traversalHelper = function (node, list) {
    if (node != null) {
        if (node.left) {
            traversalHelper(node.left, list)
        }
        list.push(node.val)
        if (node.right) {
            traversalHelper(node.right, list)
        }
    }
}

// 迭代实现
var inorderTraversal = function (root) {
    let stack = []
    let res = []

    while (root != null || stack.length != 0) {
        while (root) {
            stack.push(root)
            root = root.left
        }

        let child = stack.pop()
        res.push(child.val)
        root = child.right

    }
    return res
}

// 莫里斯实现
var inorderTraversal = function (root) {

}




// 145 二叉树的后序遍历
// 困难

// 递归实现
var postorderTraversal = function (root) {
    let res = []
    postoederTraversalHelper(root, res)
    return res
};

var postoederTraversalHelper = function (node, list) {
    if (!node) {
        return
    }
    postoederTraversalHelper(node.left, list)
    postoederTraversalHelper(node.right, list)
    list.push(node.val)
}

// 迭代实现
var postorderTraversal = function (root) {
    let stack = []
    let res = []
    // 标记去过的右儿子
    let last = null

    while (root != null || stack.length != 0) {
        // 左儿子装到底
        while (root) {
            stack.push(root)
            root = root.left
        }

        let child = stack[stack.length - 1]
        // 看有没有右儿子
        // 没有右儿子或者右儿子已经被标记过了
        if (child.right == null || child.right == last) {

            stack.pop()
            res.push(child.val)
            last = child

            // 有右儿子
        } else {
            root = child.right
        }

    }

    return res
}

// 莫里斯实现




// 530 二叉搜索树的最小绝对值差
// 简单

var getMinimumDifference = function (root) {

    let res = Number.MAX_VALUE
    let stack = []
    let pre = Number.MAX_VALUE, cur = 0

    while (root != null || stack.length != 0) {

        while (root) {
            stack.push(root)
            root = root.left
        }
        let node = stack.pop()



        cur = node.val
        if (Math.abs(cur - pre) < res) {
            res = Math.abs(cur - pre)
        }
        pre = cur
        root = node.right
    }
    return res
};



// 108 将有序数组转换为二叉搜索树
// 简单

var sortedArrayToBST = function (nums) {
    let start = 0
    let end = nums.length - 1
    return sortedArrayToBSTHelper(start, end, nums)

};


var sortedArrayToBSTHelper = function (start, end, nums) {
    if (start > end) {
        return null
    }
    let rootIndex = Math.floor(start - (start - end) / 2)
    let root = new TreeNode(nums[rootIndex])

    root.left = sortedArrayToBSTHelper(start, rootIndex - 1, nums)
    root.right = sortedArrayToBSTHelper(rootIndex + 1, end, nums)

    return root
}