//查找最长公共子串
function LCS(str1, str2) {
    var maxLen = 0;
    var index = 0;

    var arr = new Array();
    for (var i = 0; i <= str1.length + 1; i++) {
        arr[i] = new Array();
        for (var j = 0; j <= str2.length + 1; j++) {
            arr[i][j] = 0;
        }
    }

    for (var i = 0; i <= str1.length; i++) {
        for (var j = 0; j <= str2.length; j++) {
            if (i == 0 || j == 0) {
                arr[i][j] = 0
            } else {
                if (str1[i] == str2[j]) {
                    arr[i][j] = arr[i - 1][j - 1] + 1;
                } else {
                    arr[i][j] = 0;
                }
            }
            if (arr[i][j] > maxLen) {
                maxLen = arr[i][j];
                index = i;
            }
        }
    }

    var str = "";
    if (maxLen == 0) {
        return "";
    } else {
        for (var k = index - maxLen; k < maxLen; k++) {
            str += str1[k];
        }
        return str;
    }
}

var str1 = "abcdefg";
var str2 = "xyzabcd";
LCS(str1, str2)     // abcd