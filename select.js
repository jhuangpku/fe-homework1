var cnt = 13546
function generate_id(){
    return cnt++
}

function str_format(){
    format = arguments[0]
    args = Array.prototype.slice.call(arguments, 1)
    return format.replace(/\\?\$\{([^{}]+)\}/g, function(match, i){
        return args[i++]
    })
}

function Select(options, main) {
    // 实现Select组件的构造函数
    // 在这里初始化一些信息
    this.options = options || [];
    this.main = main;
    if (!this.main){
        return
    }
    this.id = generate_id()
    this.select_value = this.options[0].value
    this.value2text = {}
    for (var i = 0, l = this.options.length; i < l; i++)
    {
        this.value2text[this.options[i].value] = this.options[i].text
    }
    //todo1: html语言的生成应该放到render中，这里只做一些入口参数的判断
    //原因是，有可能外层在调用这个初始化函数以后，会对传入的参数做修改
    //比如
    //mySelector = Select(options, ...)
    //mySelector.options = ...
    //todo2: html的引号使用的是双引号，所以js的字符串使用单引号
    /*var htmlArray = [ "<div class=mainLayerBox>", 
                     "<div id='", main.id, "-mainLayer'>请选择</div>",
                     "<div id='", main.id, "-mainLayerArrow'></div>",
                     "</div>",
                     "<div id='", main.id, "-selectLayer'>"]
    for (var i = 0, l = this.options.length; i < l; i++)
    {
        htmlArray.push("<div>")
        htmlArray.push(this.options[i].text)
        htmlArray.push("</div>")
    }
    htmlArray.push("</div>")
    this.main.innerHTML += htmlArray.join("") 
    */
}
// mainLayer有两种css样式，unselect，select
//selectLayer也有两种css样式，selectLayer的每个item也有两种css样式
//mainLayerArrow如果被点击，selectLayer的class会被修改
//selectLayer在touch的时候，class会被修改，点击的时候，class也会被修改，同时mainLayer的text要被修改

Select.prototype.cssClasses = {
    mainLayerCss: "mainLayer",
    mainLayerSelectCss: "mainLayerSelect",
    mainLayerArrowCss: "mainLayerArrow",
    mainLayerArrowSelectCss: "mainLayerArrowSelect",
    selectLayerCss:"selectLayer",
    selectLayerSelectCss:"selectLayerSelect",
    selectLayerItemCss:"selectLayerItem",
    selectLayerItemSelectCss:"selectLayerItemSelect"
};

Select.prototype.onchange = function () {};


Select.prototype.render = function () {
    // 实现Select组件的渲染
    // todo1：这里用了this.main.id，但是在控件Select的设定中，第二个参数是一个dom对象
    // 它并不一定具有id，所以一般js会在初始化的时候，自己给绑上一个内部id, 该id用于唯一识别
    // 控件
    // todo2: dom对象的操作性能消耗大，因此尽量避免dom的操作，这里需要把所有设定classname
    // 和value的改成字符串的拼接操作，最后一次性的添加的dom对象中，对字符串的操作会比较难懂
    // 因此自己可以写一个模板来实现
    //
    var htmlArray = []
    mainTPL =  '<div id="${0}" class="${1}">${2}'
    selectTPL = '<div id="${0}" class="${1}" value="${2}">${3}</div>'
    htmlArray.push('<div class=mainLayerBox>')
    htmlArray.push(str_format(mainTPL, this.id + '-mainLayer', 'mainLayer', '请选择'))
    htmlArray.push('</div>')
    htmlArray.push(str_format(mainTPL, this.id + '-mainLayerArrow', 'mainLayerArrow', ' '))
    htmlArray.push('</div>')
    htmlArray.push('</div>')
    htmlArray.push(str_format(mainTPL, this.id + '-selectLayer', 'selectLayer', ' '))
    console.log(htmlArray)
    for (var i in this.value2text)
    {
        var value = i
        var text = this.value2text[value]
        htmlArray.push(str_format(selectTPL, this.id + '-selectLayerItem' + value, 'selectLayerItem', value, text))
    }
    htmlArray.push('</div>')
    this.main.innerHTML = htmlArray.join("")
    
    //绑定selectLayer对象
    var selectLayer = document.getElementById(this.id + '-selectLayer')
    selectLayer.className = this.cssClasses.selectLayerCss
    var selectItems = selectLayer.getElementsByTagName('div')
    var me = this
    for (var i = 0, l = selectItems.length; i < l; i++)
    {
        var item = selectItems[i]
        item.onclick = function() {
            me.selectItem(this.getAttribute('value') - 0);
        }
    }
    
    //绑定mainLayerArrow对象的事件
    var mainLayerArrow = document.getElementById(this.id + '-mainLayerArrow')
    mainLayerArrow.onclick = function () {
        me.mainClick = 1;
        me.clickArrow();
    };

    document.addEventListener('click', function (e){
        if (me.mainClick) {
            me.mainClick = 0;
            return;
        }
        var array = me.main.getElementsByClassName(me.cssClasses.selectLayerSelectCss)
        //console.log(array)
        for(var i = 0, l = array.length; i < l; i++)
        {
            array[i].className = me.cssClasses.selectLayerCss
        }
    }, false);
};
//Arrow被点击，arrow的class会有变化，selectlayer的class也有变化

Select.prototype.clickArrow = function(){
    //console.log(this)
    var mainLayerArrow = document.getElementById(this.id + '-mainLayerArrow')
    mainLayerArrow.className = [this.cssClasses.mainLayerArrowCss,
                this.cssClasses.mainLayerArrowSelectCss].join(" ")
    
    var selectLayer = document.getElementById(this.id + '-selectLayer')
    selectLayer.className = [this.cssClasses.selectLayerCss,
                this.cssClasses.selectLayerSelectCss].join(" ")
};
//item被点击，selectLayer的class有变化，mainLayer的class也有变化
Select.prototype.selectItem = function(activeItemValue){
    var mainLayer = document.getElementById(this.id + '-mainLayer')
    var selectLayer = document.getElementById(this.id + '-selectLayer')
    var selectItems = selectLayer.getElementsByTagName('div')
    for(var i = 0, l = selectItems.length; i < l; i++)
    {
        var item = selectItems[i]
        if (item.getAttribute('value') - 0 == activeItemValue)
        {
            mainLayer.innerHTML = item.innerHTML
        }
    }
    selectLayer.className = this.cssClasses.selectLayerCss
    mainLayer.className = this.cssClasses.mainLayerCss
    this.select_value = activeItemValue
    this.fire('change', {
        value: activeItemValue
    });
};

Select.prototype.fire = function (eventName, eventArgs) {
    var listener = this['on' + eventName];
    if (typeof listener === 'function') {
        listener.call(this, eventArgs);
    }
};

//item被鼠标移动，对应的item的class需要发生变化

Select.prototype.setValue = function (value) {
    //todo：控件的设计逻辑为value才是真正的机器可识别id，包括往后端传参数，而text是对外显示给用户的，
    //所以，value应该作为内部对象存储下来，setvalue和getvalue直接改变value的值就可以
    //显示的时候，通过value到text的一个字典（初始化的时候给定）来获得其text
    
    // 实现setValue方法，使JS能够更改Select当前选中的值
    console.log(value)
    this.selectItem(value);
};

Select.prototype.getValue = function () {
    return this.select_value;
};

Select.prototype.getText = function () {
    return this.value2text[this.select_value];
};



