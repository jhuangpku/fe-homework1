
function Select(options, main) {
    // 实现Select组件的构造函数
    // 在这里初始化一些信息
    this.options = options || [];
    this.main = main;
    if (!this.main){
        return
    }
    var htmlArray = [ "<div class=mainLayerBox>", 
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
    var mainLayer = document.getElementById(this.main.id + '-mainLayer')
    mainLayer.className = this.cssClasses.mainLayerCss
    
    var mainLayerArrow = document.getElementById(this.main.id + '-mainLayerArrow')
    mainLayerArrow.className = this.cssClasses.mainLayerArrowCss
    
    var selectLayer = document.getElementById(this.main.id + '-selectLayer')
    selectLayer.className = this.cssClasses.selectLayerCss

    var selectItems = selectLayer.getElementsByTagName('div')
    for (var i = 0, l = selectItems.length; i < l; i++)
    {
        var item = selectItems[i]
        item.className = this.cssClasses.selectLayerItemCss
        item.setAttribute('value', this.options[i].value)
        var me = this;
        item.onclick = function() {
            me.selectItem(this.getAttribute('value') - 0);
        }
        item.onmouseover = function(){
            me.mouseOnItem(this.getAttribute('value') - 0);
        } 
        item.onmouseout = function(){
            me.mouseOutItem(this.getAttribute('value') - 0);
        }
    }

    var me = this;
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
    var mainLayerArrow = document.getElementById(this.main.id + '-mainLayerArrow')
    mainLayerArrow.className = [this.cssClasses.mainLayerArrowCss,
                this.cssClasses.mainLayerArrowSelectCss].join(" ")
    
    var selectLayer = document.getElementById(this.main.id + '-selectLayer')
    selectLayer.className = [this.cssClasses.selectLayerCss,
                this.cssClasses.selectLayerSelectCss].join(" ")
};
//item被点击，selectLayer的class有变化，mainLayer的class也有变化
Select.prototype.selectItem = function(activeItemValue){
    var mainLayer = document.getElementById(this.main.id + '-mainLayer')
    var selectLayer = document.getElementById(this.main.id + '-selectLayer')
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

    this.onchange();
};

//item被鼠标移动，对应的item的class需要发生变化
Select.prototype.mouseOnItem = function(activeItemValue){
    var selectLayer = document.getElementById(this.main.id + '-selectLayer')
    var selectItems = selectLayer.getElementsByTagName('div')
    for(var i = 0, l = selectItems.length; i < l; i++)
    {
        var item = selectItems[i]
        if (item.getAttribute('value') - 0 == activeItemValue)
        {
            item.className = [this.cssClasses.selectLayerItemCss,
                this.cssClasses.selectLayerItemSelectCss].join(" ")
        }
    }
}

Select.prototype.mouseOutItem = function(activeItemValue){
    var selectLayer = document.getElementById(this.main.id + '-selectLayer')
    var selectItems = selectLayer.getElementsByTagName('div')
    for(var i = 0, l = selectItems.length; i < l; i++)
    {
        var item = selectItems[i]
        if (item.getAttribute('value') - 0 == activeItemValue)
        {
            item.className = this.cssClasses.selectLayerItemCss
        }
    }
}


Select.prototype.setValue = function (value) {
    // 实现setValue方法，使JS能够更改Select当前选中的值
    var mainLayer = document.getElementById(this.main.id + '-mainLayer')
    var selectLayer = document.getElementById(this.main.id + '-selectLayer')
    var selectItems = selectLayer.getElementsByTagName('div')
    for(var i = 0, l = selectItems.length; i < l; i++)
    {
        var item = selectItems[i]
        if (item.getAttribute('value') - 0 == value)
        {
            mainLayer.innerHTML = item.innerHTML
        }
    }
    
};

Select.prototype.getValue = function () {
    // 实现setValue方法，使JS能够获取Select当前选中的值
    var mainLayer = document.getElementById(this.main.id + '-mainLayer')
    //console.log(mainLayer.innerHTML)
    return mainLayer.innerHTML
};



