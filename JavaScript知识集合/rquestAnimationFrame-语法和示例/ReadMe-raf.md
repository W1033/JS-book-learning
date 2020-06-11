# requestAnimationFrame


- 待做笔记: [深入理解requestAnimationFrame](http://blog.csdn.net/u010476739/article/details/76383700)


## Catalog






## New Words
- **stamp [stæmp] --n.邮票; 印章; 戳记; 图章, 印花. --vt.盖章; 标记; 跺<脚>**
  **--vi.捣碎; 跺脚**
    + Do you need regular stamps or commemorative stamps?
      您要普通邮票还是纪念邮票?
    + There is no stamp on the stamp. 那张邮票上没有盖图章.
    + I'll stamp the company name on your cheque.
      我该给你的支票盖上公司的章.
- **site [saɪt] --n.现场; 地点; 位置; 场地. --vt.设置; 使坐落在**
    + a building site(n). 建筑用地.
    + the site(n) for a new school. 建造新学校的地点.
    + They have decided to site(vt) the new school in this town.
      他们已经决定把新校设于本镇.
    + I'll be at the construction site tomorrow. 明天我要去工地.
- **partial ['pɑːʃ(ə)l] --adj.局部的, 部分的, [口]偏爱的**
    + partial success. 部分的成功. 
    + partial to detective novels. 偏爱侦探小说





## Content
- API 接口: Window 对象定义了以下两个接口:
  ```
    partial interface Window {
        long requestAnimationFrame(FrameRequestCallback callback);
        void cancelAnimationFrame(long handle);
    };
  ```
    + (1) `requestAnimationFrame`: `requestAnimationFrame`
      方法用于通知浏览器重采样动画. 当 `requestAnimationFrame`(callback)
      被调用时不会执行 callback, 而是会将元组 `<handle, callback>`
      插入到动画帧请求回调函数列表末尾(其中元组的 callback 就是传入
      `requestAnimationFrame` 的回调函数), 并且返回 handle 值,
      该值为浏览器定义的、大于 0 的整数, 唯一标识了该回调函数在列表中位置. 
      
      每个回调函数都有一个布尔标识 `cancelled`, 该标识初始值为 false,
      并且对外不可见. 在后面的 "处理模型" 中我们会看到, 浏览器在执行
      "采样所有动画" 的任务时会遍历动画帧请求回调函数列表, 判断每个元组的
      callback 的 cancelled, 如果为 false, 则执行 callback. 
    + (2) `cancelAnimationFrame`: `cancelAnimationFrame`
      方法用于取消先前安排的一个动画帧更新的请求. 
      
      当调用 `cancelAnimationFrame(handle)`时, 浏览器会设置该 handle 
      指向的回调函数的 cancelled 为 true.
    
      无论该回调函数是否在动画帧请求回调函数列表中, 它的 cancelled
      都会被设置为true. 如果该 handle 没有指向任何回调函数, 则调用`cancelAnimationFrame` 不会发生任何事情. 


