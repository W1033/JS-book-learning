# 第 4 章 -- 布局 - 响应式篇

## 目录 (Catalog)
- 4.1 媒体查询
    + 4.1.1 为什么需要媒体查询 
    + 4.1.2 什么是媒体查询 
    + 4.1.3 媒体查询中的逻辑
    + 4.1.4 媒体查询的策略
    + 4.1.5 导航栏与媒体查询
    + 4.1.6 polyfill
- 4.2 伸缩布局
    + 4.2.1 为什么需要伸缩布局 
    + 4.2.2 快速入门
    + 4.2.3 基本应用
    + 4.2.4 回归导航栏 flexbox.css
- 4.3 相对单位
    + 4.3.1 相对单位 em  
    + 4.3.2 相对单位 rem
    + 4.3.3 如何使用这几种单位
- 4.4 标题布局
    + 4.4.1 背景
    + 4.4.2 文字居中
- 4.5 响应式文字
    + 4.5.1 标题
    + 4.5.2 正文内容
- 小结        
    


## 生词 (New Words)
- **landscape ['læn(d)skeɪp] --n.景观, 风景, 山水, 景色**
    + a German landscape painter. 德国风景画家.
    + a landscape with mystery and charm. 神秘而迷人的风景.
    + The landscape unfolded before me. 风景展现在我的眼前.
    + The landscape of the Great Wall is like a dragon.  
      长城的全景像一条龙.



## 本章内容 (Contents)
### 4.1 媒体查询 (media query)
#### 4.1.1 为什么需要媒体查询 
#### 4.1.2 什么是媒体查询 
#### 4.1.3 媒体查询中的逻辑
- (1): 与(and) -- 使用and关键字可以将媒体类型和多个媒体特征联系起来，只要当
  这些条件全部为真时，该媒体查询才算成立，该媒体查询的样式才会生效。例如:
  ```css
    /* - min-width 不小于(大于) */
    @media (min-width: 320px) and (orientation: landscape) {
        .sidebar {
            display: none;
        }
    }
  ```
  仅当页面宽度大于320px并且手机是水平放置时，查询表达式成立。两者中任一条件不满足，
  该样式都不会生效。
- (2) 或(or) -- 使用逗号(,) 分隔符可以将多个媒体查询隔离开，如果这多个查询条件中的
  任意一个查询返回 true，则该样式生效，例如:
  ```css
    @media (min-width: 320px), all and (orientation: landscape) {
        . sidebar {
            display :none;
        }
    }
  ```
  只要页面宽度大于320px (符合第-一个条件，无论是否符合第二个条件)，该样式即生效;即使
  页面宽度不大于320 px，但该手机水平放置(不符合第一个条件，只符合第二个条件)，该样式
  仍然生效。与编程中的 `||` 操作一致。
- (3) 非(not) -- 使用 not 关键字就是对当前的媒体查询条件取反操作。例如，在
  `not(max-width: 600px) `中，只有 max-width: 600px 不成立、页面宽度大于 
  600px 时，该媒体查询才成立。但是请注意当 not 与 and 同时出现时，not 仍然是
  对整个媒体查询生效, 而不是只对距离最近的条件生效. 例如, 媒体查询(注意括号位置)
  ```base
    not all and (max-width: 600px)
    // - 意思是
    not (all and (max-width: 600px))
    // - 而不是
    (not all) and (max-width: 600px)
  ```
  同时也要注意not与逗号分隔的多个媒体查询同时存在的情况，此时 not 只对它所在的那个
  媒体查询生效，对之前或者之后的媒体查询并不生效。例如(注意括号位置):
  ```base
    not all and (max-width: 600px), (orientation: landscape )
    // - 意为
    (not all and (max-width: 600px)), (orientation: landscape)
    // - 而不是
    (not all and (max-width: 600px). (orientation: landscape))
  ```


#### 4.1.4 媒体查询的策略
- 移动优先(mobile-first)
  ```css
    /* - 当设备宽度还不足 320px 的移动设备情况 */
    html {}
    /* - 宽度为 320px 至 1024px (不小于 320px) */
    @media (min-width: 320px) {

    }
    /* - 宽度大于 1024px 至无穷时 (不小于 1024px) */
    @media (min-width: 1024px) {

    }
  ```
- 桌面优先 (desktop-first)
  ```css
    /* - 不设定宽度的情况 */
    html {}
    /* - 当页面宽度不大于 1024px 时 */
    @media (max-width: 1024px) {

    }
    /* - 当页面宽度不大于 320px 时 */
    @media (max-width: 320px) {

    }
  ```

#### 4.1.5 导航栏与媒体查询
#### 4.1.6 polyfill

### 4.2 伸缩布局
#### 4.2.1 为什么需要伸缩布局 
#### 4.2.2 快速入门
#### 4.2.3 基本应用
#### 4.2.4 回归导航栏 flexbox.css

### 4.3 相对单位
#### 4.3.1 相对单位 em  
#### 4.3.2 相对单位 rem
#### 4.3.3 如何使用这几种单位

### 4.4 标题布局
#### 4.4.1 背景
#### 4.4.2 文字居中

### 4.5 响应式文字
#### 4.5.1 标题
#### 4.5.2 正文内容

### 小结        

