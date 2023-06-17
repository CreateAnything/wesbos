window.addEventListener('load', () => {
    const circle = document.querySelector('.circle')
    const numList = document.querySelectorAll('.time-num>span')
    const hours = document.querySelector('.hours')
    const seconds = document.querySelector('.seconds')
    const minutes = document.querySelector('.minutes')
    const SECONDS_RNGLE = 360 / 60 
    const MINUTES_RNGLE = 360 / 60
    const HOURS_RNGLE = 360 / 12
    let timer = null
    //创建中表的时间
    function layoutTimer() {
        const count = numList.length
        const piceAngle = 360 / count
        const r = circle.clientWidth / 2 - numList[0].clientWidth / 2
        for (let i = 0; i < count; i++){
            const angle = (Math.PI / 180) * (i * piceAngle) //转化为弧度制
            const x = Math.sin(angle) * r;
            const y = -Math.cos(angle) * r;
            numList[i].style.transform = `translate(${x}px,${y}px)`
        }
    }
    //开始几时
    function start() {
        timer = setInterval(() => {
            const date = new Date()
            seconds.style.transform = `rotate(${date.getSeconds() * SECONDS_RNGLE}deg)`
            minutes.style.transform = `rotate(${date.getMinutes() * MINUTES_RNGLE}deg)`
            hours.style.transform = `rotate(${date.getHours() * MINUTES_RNGLE}deg)`
        },1000)
    }
    function init() {
        layoutTimer()  
        start()
    }
    init()
})