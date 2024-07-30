const checkButton = document.querySelectorAll('.check-box')
const checkContainer = document.querySelectorAll('.goal-container')
const goalInput = document.querySelectorAll('.goal-input')
const goalText = document.querySelector('.goal-text')
const progressBar = document.querySelector('.progress-bar')
const progress = document.querySelector('.progress')
const label = document.querySelector('.progress-label')


const allLabel = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D',
]

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
    first :{
        name : '',
        completed : false,
    },
    second :{
        name : '',
        completed : false,
    },
    third :{
        name : '',
        completed : false,
    },
}

let completedGoals = Object.values(allGoals).filter((goal)=> goal.completed).length
progress.style.width = `${completedGoals / 3 * 100}%`

progress.innerHTML = `&nbsp Goals Completed   ${completedGoals} / 3`
label.innerText = allLabel[completedGoals]


checkButton.forEach((checkBox) => {
    
    checkBox.addEventListener('click', (e) => {
        const allInputs = [...goalInput].every(function (input) {
            return input.value
        })
        if (allInputs == true) {
            checkBox.parentElement.classList.toggle('completed')
            goalText.style.display = 'none'
            
            const inputId = checkBox.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed
            completedGoals = Object.values(allGoals).filter((goal)=> goal.completed).length
            progress.style.width = `${completedGoals / 3 * 100}%`
            progress.innerHTML = `&nbsp &nbsp Goals Completed &nbsp  ${completedGoals} / 3`
            label.innerText = allLabel[completedGoals]
                 
            localStorage.setItem('allGoals', JSON.stringify(allGoals))
        }
        else {
            goalText.classList.add('goalText')
        }
    })
})

goalInput.forEach((inputs) => {

    inputs.value = allGoals[inputs.id].name

    if (allGoals[inputs.id].completed) {
        inputs.parentElement.classList.add('completed')
    }

    inputs.addEventListener('focus', () => {
        goalText.classList.remove('goalText')
    })

    inputs.addEventListener('input', (e) => {

        if (allGoals[inputs.id].completed) {
            e.target.value = allGoals[inputs.id].name
            return
        }

        allGoals[inputs.id].name = inputs.value
        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })
})