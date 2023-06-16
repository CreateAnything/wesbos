window.addEventListener('load', () => {
    const btnList = document.querySelectorAll('.btn')
    const kitList = document.querySelector('.content').children
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

    


    //切换按钮
    function toogleBtn(index) {
        Array.from(btnList).forEach(item =>item.classList.remove('active'))
        btnList[index].classList.add('active')
    }
    //切换文本内容
    function toogleContent(index) {
        Array.from(kitList).forEach(item => item.classList.add('hide'))
        kitList[index].classList.remove('hide')
    }
    //初始化页面
    function initPage() {
        toogleBtn(tabIndex)
        btnList[tabIndex].click()        
    }
    initPage()
})