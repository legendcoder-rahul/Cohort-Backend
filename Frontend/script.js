const mouseFollower = document.querySelector('.mouse-flower')
addEventListener('mousemove',(e)=>{

    let x = 0 , y=0
    const { clientX, clientY} = e

    mouseFollower.style.tranform = `translate(${clientX}px,${clientY})`
    
})

function far(){
    mouseFollower.style.tranform = `translate(${x}px,${y}px)`
    requestAnimationFrame(far)
}