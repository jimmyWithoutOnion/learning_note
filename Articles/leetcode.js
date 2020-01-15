// 1. 两数只和
var twoSum = function(nums, target) {
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
  var myAtoi = function(str) {
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
  var isValid = function(s) {
    if (s.length % 2 != 0) {
      return false;
    }
    let match = {'(': ')', '{': '}', '[': ']'};
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
  var mergeTwoLists = function(l1, l2) {
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
  
  
  
  