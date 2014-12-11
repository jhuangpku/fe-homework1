function Tab(options) {
    // 实现构造函数
    //this.array = []
    this.tabs = options['main'].getElementsByTagName('li')
    activeIndex = options['activeIndex'] 
    this.setActiveIndex(activeIndex)
}

Tab.prototype.setActiveIndex = function (activeIndex) {
    // 实现setActiveIndex方法
    for(var i = 0, l = this.tabs.length; i < l; i++)
    {
        if (i == activeIndex)
        {

            document.getElementById(this.tabs[i].dataset.tabItem).style.display = 'block' 
            this.tabs[i].style.background = '#c2c2c2'
            this.tabs[i].style.color = 'white'
        }
        else
        {
            document.getElementById(this.tabs[i].dataset.tabItem).style.display = 'none' 
            this.tabs[i].style.background = 'white'
            this.tabs[i].style.color = 'black'   
        }
    }
};
