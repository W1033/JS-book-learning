/* Created in 20180713 */


const fs = require("fs");

// ./ 当前目录   / 根目录
fs.readFile("./aa.txt", (err, contents) => {
    if (err) throw err;
    // console.log(contents);
});
console.log("Hi!");

//--------------------------------------------------

/**
 * ## 文件系统 flag
 * 一下 flag 用于接受字符串的 flag 选项:
 *  - "a"   :  打开文件用于追加。        如果文件不存在择创建文件。
 *  - "ax"  :  类似 "a",               但如果文件存在则失败。
 *  - "a+"  :  打开文件用于读取和追加。   如果文件不存在则创建文件。
 *  - "ax+" :  类似于 "a+",            但如果文件存在则失败。
 *  - "as"  :  在同步模式中打开文件用于追加。如果文件不存在则创建文件。
 *  - "as+" :  在同步模式中打开文件用于读取和追加。如果文件不存在则创建文件。
 *
 *  - "r"   :   打开文件用于读取。       如果文件不存在则抛出异常。
 *  - "r+"  :   打开文件用于读取和写入。  如果文件不存在则抛出异常。
 *  - "rs+" :   在同步模式中打开文件用于读取和写入。 指示操作系统绕开本地文件系统缓存。
 *
 *  - "w"   :   打开文件用于写入。 文件会被创建 (如果不存在) 或截断 (如果存在)。
 *  - "wx"  :   类似 "w", 但如果文件存在则失败。
 *  - "w+"  :   打开文件用于读取和写入。 文件会被创建 (如果不存在) 或截断 (如果存在)。
 *  - "wx+" :   类似 "w+", 但如果文件存在则失败。
 *
 * */


// integer /'ɪntɪdʒə/ n.整数
/**
 * ## fs.writeFile(file, data[, options], callback);
 *  - file: <string> | <Buffer> | <URL> |<integer> 文件名或文件描述符。
 *  - data: <string> | <Buffer> | <Uint8Array>
 *  - options: <Object> | <string>
 *      + encoding: <string> | <null>  默认为 "utf8"
 *      + mode: <integer> 默认为 0o666
 *      + flag: <string> 详见上面"支持的文件系统flag"。 默认为 "w"
 *  - callback <Function>
 *      + err <Error>
 *
 * */
/*fs.writeFile("文件名.txt", "Node.js 中文网", "utf8", (err) => {
    if (err) throw err;
    console.log("文件已保存！");
});*/

// 详细示例: http://nodejs.cn/code/fs.writeFile?_id=2
let path = "./bb.txt";
let data = Buffer.from([60, 230, 150, 135, 228, 187, 182, 229, 134, 133, 229, 174, 185, 62]);
// w: 打开文件用于写入，覆盖之前的内容。 a: 打开文件追加内容
let options = {encoding: "utf8", flag: "a",};
let callback = (err) => {
    if (err) throw err;
    // 这里需用同步的读取文件 (readFileSync) , 因为不确定异步写入 (writeFile)什么时候执行完毕
    console.log(fs.readFileSync(path, "utf8"));
};
fs.writeFile(path, data, options, callback);


