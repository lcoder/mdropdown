## 自定义select下拉插件

select控件用浏览器自带的样式，通常很丑，而且设置height，line-height，border之类的兼容性很差，要是ui需求很大，往往需要自定义。这个插件就是模拟select的下拉效果

demo:

![模拟select下拉效果](http://oco9w3mgp.bkt.clouddn.com/blog_images/ymdropdown.png)

使用方法：

```javascript
$("#mdropdown").mdropdown( {
        select: function( val ){		// 选中之后的事件，类似原生的onchange事件
            console.log( val ) ;
        }
    } )
```

书写html代码无需改变select的书写方式，默认选中的option，也会在生成的ui里面默认选中。