const deleteText = document.querySelectorAll('.del')
const likeText = document.querySelectorAll('.like')

Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteTask)
})

Array.from(likeText).forEach((element) => {
    element.addEventListener('click', addLike)
})

async function deleteTask()  {
    const task = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('deleteTask', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify ({
                'task': task
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err) {
        console.log(err)
    }
}

async function addLike() {
    const task = this.parentNode.childNodes[1].innerText
    const like = Number(this.parentNode.childNodes[3].innerText)
    try {
        const response = await fetch('addLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify ({
                'task': task,
                'like': like
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err) {
        console.log(err)
    }
}