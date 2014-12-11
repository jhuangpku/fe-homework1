function Tab(options) {
    // 实现构造函数
    array = []
    tabs = options['main'].getElementsByTagName('li')
    activeIndex = options['activeIndex']
    for (var i = 0, l = tabs.length; i < l; i++)
    {
        array.push(tabs[i].dataset.tabItem)
    } 
    this.setActiveIndex(activeIndex)
}

Tab.prototype.setActiveIndex = function (activeIndex) {
    // 实现setActiveIndex方法
    tabs = document.getElementById('myTab').getElementsByTagName('li')
    for(var i = 0, l = array.length; i < l; i++)
    {
        if (i == activeIndex)
        {
            document.getElementById(array[i]).style.display = 'block' 
            tabs[i].style.background = '#c2c2c2'
            tabs[i].style.color = 'white'
        }
        else
        {
            document.getElementById(array[i]).style.display = 'none'
            tabs[i].style.background = 'white'
            tabs[i].style.color = 'black'   
        }
    }
};