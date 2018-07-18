第三章出现的方法:

1.  append(), appendTo(), after(), insetAfter(), insetBefore(), before(), insertBefore()。

2.  remove():从DOM中删除所有匹配的元素，当某个节点用remove()方法删除后，该节点所包含的所有后代节点将同时被删除。

3.  detach():从DOM中去掉所有匹配的元素，但是和remove()不同的一点就是detach()删除后元素上的事件并不删除

4.  empty(): 清空元素中的所有后代节点

5.  attr()方法用来获取和设置元素属性，removeAttr()用来删除元素属性

6.  包裹节点：wrap(), wrapAll(); wrapInner();

7.  addClass()追加样式，removeClass()移除样式

8.  toggle():切换样式,如果元素原来是显示的则隐藏它，如果元素原来是隐藏的则显示他，主要控制行为上的重复切换。

9.  toggleClass():用于控制样式上的重复切换，如果类名存在则删除它，如果类名不存在则添加它。

10. hasClass():可以用来判断元素中是否含有某个class，如果有则返回true,否则返回false。

11. html()方法: 此方法类似于js中的innerHTML()方法，用来读取或者设置某个元素中的HTML内容。

12. val()方法: 此方法类似于js中的value属性，可以用来设置和获取元素的值，无论元素是文本框，下拉列表还是单选框，他都可以返回元素的值。如果元素为多选，则返回一个包含所有选项的值的数组。 

13. children():该方法用于取得匹配元素的子元素集合。(children方法只考虑子元素而不考虑其他后代元素)

14. next():方法用于取得匹配元素后面紧邻的同辈元素。

15. prev():方法用去取得匹配元素前面紧邻的同辈元素。
    text() 方法方法设置或返回被选元素的文本内容。
    
16. siblings():方法用去取得匹配元素前后所有的同辈元素。
    contents() 方法获得匹配元素集合中每个元素的子节点，包括文本和注释节点。
    
17. closest():方法:用于取得最近的匹配元素。
        $(document).bind("click", function(e){$(e.target).closest("li").css("color", "red");})
        
18. css():方法获取和设置元素的样式属性。//$("p").css("color") 获取p元素的样式颜色

19. offset(): 方法  它的作用是获取元素在当前视窗的相对偏移量，其中返回的对象包含两个属性，即top和left,他只对可见元素有效。
    (实际上就是js中的offsetLeft,offsetTop获取元素的偏移量的属性的封装)
        var offset = $("p").offset(); //获取p元素的offset()偏移量
        var left = offset.left;   //获取左偏移量
        var top = offset.top;    //获取右偏移量
        
20. position()方法:它的作用是获取元素相对于最近的一个position样式属性设置为relative或absolute的祖父节点的相对偏移量，
    与offset()一样，它返回的对象也包括两个属性，即top和left。
        var position = $("p").position();  //获取<p>元素的position();
        var left = position.left;//获取左偏移量
        var top = position.top;  //获取右偏移量
        
21. scrollTop()方法和scrollLeft()方法 :用于获取元素的滚动条距顶端和距左侧的距离。

第四章出现的方法：

1. bind():方法为被选元素添加一个或多个事件处理程序，并规定事件发生时运行的函数。对匹配元素进行特定事件的绑定。

2. hover(enter, leave): 当鼠标移动到元素上时，会触发第一个函数，当鼠标移出元素时，会触发第二个函数.

3. toggle()用于模拟鼠标连续单击事件。第一次单击元素，触发制定的第一个函数(fn1),当再次单击同一个元素时, 触发指定的第二个函数(fn2),如果有更多函数，则依次触发，直到最后一个。随后的每次单击都重复对这几个函数的轮番调用。

4. unbind(): 解除绑定

5. one(): 可以为元素绑定处理函数，当处理函数触发一次后，立即被删除。即在每个对象上，事件处理函数只会被执行一次。

6. trigger(): 触发浏览器支持的具有相同名称的事件，也可以触发自定义名称的事件。

7. fadeIn()显示和fadeout()隐藏: 只改变元素的不透明度。

8. slideUp()和slideDown(): 改变元素的高度。(slideUp隐藏，slideDown展开)

9. animate(): 自定义动画方法

10. stop([clearQueue],[gotoEnd]): 停止元素的动画.clearQueue表示是否要清空未执行完的动画队列，gotoEnd代表是否直接将未执行完的动画跳转到末状态。

11. $(element).is(":animated")：判断元素是不否处于动画状态

12. delay(): 在动画执行过程中，对动画进行延迟操作。

13. toggle()动画里的方法:切换元素的可见状态，类似于show()和hide()的合体 
    // $("h5.head").click(function(){$(this).next().toggle();}) 
    
13. slideToggle(): 通过高度变化来切换匹配元素的可见性。
    //$("h5.head").click(function(){$(this).next().slideToggle();}) 
    
14. fadeTo(): 把元素的不透明度以渐进方式调整到指定的值。
    //$("h5.head").click(function(){$(this).next().fadeTo(600, 0.2);})
    
15. fadeToggle(): 通过不透明度变化来切换匹配元素的可见性。
    //$("h5.head").click(function(){$(this).next().fadeToggle();})
 
 
第五章出现的方法： 

1. each()方法：遍历一维数组，多维数组，DOM，JSON等等。 

2. clone() 方法生成被选元素的副本，包含子节点、文本和属性。 
    //$("button").click(function(){$("body").append($("p").clone());}); //克隆并追加一个p元素
    
3. find():获得当前元素集合中每个元素的后代，通过选择器，jquery对象或元素来筛选。

4. width():方法返回或者设置匹配元素的宽度。

<html>
    <head>
        <script type="text/javascript">
           $(function() {
                var $parent = $("ul");
                var $li_1 = $("<li title='香蕉'>香蕉</li>");
                var $li_2 = $("<li title='雪梨'>雪梨</li>");
                var $li_3 = $("<li title='其它'>其它</li>"); ($li_1).appendTo($parent); ($li_2).appendTo($parent); ($li_3).appendTo($parent); //
                var $li = $("ul li:eq(1)");
                $li_text = $li.text();
                alert($li_text); //输出:橘子
                var $para = $("p");
                var $p_attr = $para.attr("title"); 
                alert($p_attr); //输出：选择你最喜欢的水果
                var $removeEle = $("ul li:eq(2)").remove() //获取第三个元素节点(菠萝)，并从网页删除它。
                //alert($removeEle.text()); //text()方法设置或返回被选元素的内容, val():设置或返回被选元素的值
                alert($removeEle.html());
                $($removeEle).appendTo("ul"); //把菠萝从新插入到最后一项
                //var $detachEle = $("ul li:eq(1)").detach();
                //alert($detachEle.text());
                //$("ul li:eq(1)").empty();//清除第二个元素里的内容，但是默认的li标签前面的点并不会去掉。
                $("ul li").click(function() {
                    $(this).clone(true).appendTo("ul"); //复制当前单击的元素节点，并将它追加到ul元素中
                })
                //$("p").replaceWith("<strong>你最不喜欢的水果是？</strong>");
                $("<strong>你最不喜欢的水果是？</strong>").replaceAll("p");
                var $para = $("p");
                $para.attr("title")// 设置title属性
                $para.attr("class", "high")                
            })*/
        </script>
    </head>        
    <body>
        <div id="content">
            <p title="选择你最喜欢的水果">
                选择你最喜欢的水果？
            </p>
            <ul>
                <li title="苹果">苹果</li>
                <li title="橘子">橘子</li>
                <li title="菠萝">菠萝</li>
            </ul>
        </div> 
    </body>
</html>
