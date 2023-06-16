window.addEventListener('load', () => {
    const btnList = document.querySelectorAll('.btn')
    const kitList = document.querySelector('.content').children
    const mapList = []
    let tabIndex = 0;

    //添加点击事件
    Array.from(btnList).forEach((dom,index) => {
        dom.addEventListener('click', () => {
            let conIndex = dom.dataset.index
            tabIndex = index
            toogleBtn(tabIndex)
            toogleContent(conIndex)
        })
    })
    window.addEventListener('transitionend',clearPlayStyle)
    window.addEventListener('keydown', playAudit)
    //播放音乐
    function playAudit(e) {
        const {keyCode} = e
        if (!mapList[tabIndex].has(keyCode)) return
        const audio = document.querySelector(`.choose audio[data-key="${keyCode}"]`);
        if (!audio) return
        audio.currentTime = 0//音乐冲头播放
        audio.play()//播放音乐
        mapList[tabIndex].get(keyCode).classList.add('kit-active')
    }
    //清楚播放样式
    function clearPlayStyle() {
        const map = mapList[tabIndex]
        for (let [_key,dom] of map) {
            dom.classList.remove('kit-active')
        }
    }
    //切换按钮
    function toogleBtn(index) {
        Array.from(btnList).forEach(item =>item.classList.remove('active'))
        btnList[index].classList.add('active')
    }
    //切换文本内容
    function toogleContent(index) {
        Array.from(kitList).forEach(item => item.classList.add('choose'))
        kitList[index].classList.remove('choose')
    }
    //将所有dom存储进map对象
    function setDomToMap() {
        [...kitList].forEach((dom) => {
            if (dom.children && dom.children.length > 0) {
               const map = new Map()
                Array.from(dom.children).forEach(cdom => {
                    if (cdom.tagName === 'DIV') {
                        const key = cdom.dataset.key
                        map.set(+key, cdom)   
                    }
                })
                mapList.push(map)
            }
        })
    }
    //初始化页面
    function initPage() {
        toogleBtn(tabIndex)//主动触发切换默认按钮
        btnList[tabIndex].click()//主动触发点击事件第一次
        setDomToMap()//缓存音乐节点信息
    }
    initPage()
})