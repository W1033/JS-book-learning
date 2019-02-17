/**
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
 * https://leetcode-cn.com/problems/two-sum/
 * */

console.time("Test");
var twoSum = function(nums, target) {
    for (var i=0; i< nums.length; i++) {
        for (var j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j]
            }
        }

    }
};

let nums = [2, 7, 11, 15],
    target = 9;

console.log("two nums: ", twoSum(nums, target));

console.timeEnd("Test");


// 测试代码执行时间的封装方法 -- 《高性能 javascript》
const Timer = {
    data: {},
    start(key) {
        this.data[key] = new Date();
    },
    stop(key) {
        let time = this.data[key];
        if (time) {
            this.data[key] = new Date() - time;
        }
        // console.log(this.data[key]);
    },
    getTime(key) {
        return this.data[key] + "ms";
    }
};
// 测试console.log(i)
Timer.start("Test");
for (var i=0; i< 100000; i++) {

}
Timer.stop("Test");
console.log("The time is: ", Timer.getTime("Test"));
