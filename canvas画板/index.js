window.addEventListener('load', () => {
    //获取画布
    const canvas = document.querySelector('#canvas')
    //获取画布上下文
    const ctx = canvas.getContext('2d')
    ctx.moveTo(300, 200)
    //开始画笔
    ctx.beginPath()
    //绘制取消
    ctx.bezierCurveTo(350, 150, 500, 200, 300, 350)
    ctx.bezierCurveTo(100, 200, 250, 150, 300, 200)
    //填充颜色
    ctx.stroke()
    //结束画笔
    ctx.closePath()
    console.log(ctx)
})