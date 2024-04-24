
const modal = document.getElementById('modal'); 
const descriptionInput = document.getElementById('task-description');
const statusInput = document.getElementById('task-status');
const deadlineInput = document.getElementById('task-deadline');


// MODAL
function openModal(){
    modal.style.display = "flex";
}
function closeModal(){
    modal.style.display = "none";
}

// CREATE TASK
function createTask(){
    const formData = {
        description: descriptionInput.value,
        priority: statusInput.value,
        deadline: deadlineInput.value
    }

    fetch('/task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            alert('Tarefa criada com sucesso!');
        } else {
            return response.json().then(error => {
                throw new Error(error.message);
            });
        }
    })
    .catch(error => {
        console.error('Erro ao criar tarefa:', error);
        alert('Erro ao criar tarefa: ' + error.message);
    });
    
    closeModal()
}
