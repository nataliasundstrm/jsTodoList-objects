const todoApp = () => {

    // Get elements from DOM (html)
    const todoFrom = document.querySelector('.todo__form')
    const todoInput = document.querySelector('.todo__input')
    const todoList = document.querySelector('.todo__list')
    const errorMsgContainer = document.querySelector('.todo__error-msg-container')
    const resetButton = document.querySelector('.todo__reset-button')

    const addTodo = (event) => {

        // PREVENT DEFAULT BEHAVIOR
        event.preventDefault()

        // IF VALUE EXIST, ADD TODO ITEM
        if (todoInput.value) {

            // TASK/TODO ITEM
            const todoItem = document.createElement('input')
            todoItem.type = 'text'
            todoItem.setAttribute('readOnly', 'readOnly')
            todoItem.style.cursor = 'default'
            todoItem.classList.add('todo__item')

            // ADD VALUE FROM INPUT TO TASK/TODO ITEM
            todoItem.value = todoInput.value

            // CHECKBOX
            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox'

            // DELETE BUTTON
            const deleteButton = document.createElement('button')
            deleteButton.innerText = 'Delete'
            
            // EDIT BUTTON
            const editButton = document.createElement('button')
            editButton.classList.add('edit')
            editButton.innerText = 'Edit'

            const buttons = function() {

                // ADD COMPLETED FUNCTION TO CREATED TASK/TODO ITEM 
                this.complete = function(event) {
                    event.target.nextElementSibling.classList.toggle('todo__item--completed') 
                }

                // ADD "REMOVE" FUNCTION TO DELETE BUTTON
                this.delete = function(event) {
                    event.target.parentNode.parentNode.remove()
                }
            
                // ADD EDIT FUNCTION TO EDIT BUTTON + ERROR HANDELING WHEN INPUT FIELD IS EMPTY
                this.edit = function() {
                    if (editButton.innerText.toLowerCase() == 'edit') {
                        editButton.innerText = 'Save'
                        todoItem.removeAttribute('readOnly')
                        todoItem.focus()
                        todoItem.style.cursor = 'text'
                        
                    } else {

                        if (todoItem.value === '') {
                            todoItem.focus()
                            todoItem.style.cursor = 'text'
                            const errorMsgText = document.createElement('h5')
                            errorMsgText.innerText = 'Cannot save empty todo, input field must be filled out.'
                            errorMsgContainer.appendChild(errorMsgText)
                            
                            editButton.addEventListener('click', () => {
                                errorMsgText.remove()
                            })
    
                            editButton.addEventListener('click', () => {
                                errorMsgText.remove()
                            })
                            
                        } else {
                            editButton.innerText = 'Edit'
                            todoItem.setAttribute('readOnly', 'readOnly')
                            todoItem.style.cursor = 'default'
                        }
                    }

                }

                // ADD RESET FUNCTION TO RESET BUTTON
                this.resetButton = function() {
                    todoContainer.remove()
                }
                
                // ADD EVENT HANDLER(S)
                checkbox.addEventListener('click', this.complete)
                deleteButton.addEventListener('click', this.delete)
                editButton.addEventListener('click', this.edit)
                resetButton.addEventListener('click', this.resetButton)
                
            }

            // RUN BUTTONS
            const runButtons = new buttons()

            // CREATE CONTAINER FOR BUTTONS
            const buttonsContainer = document.createElement('div')
            buttonsContainer.classList.add('todo__buttons-container')

            // ADD BUTTONS TO THEIR ENCLOSING DIV
            buttonsContainer.appendChild(deleteButton)
            buttonsContainer.appendChild(editButton)

            // CREATE CONTAINER FOR INPUT FILEDS
            const inputContainer = document.createElement('div')
            inputContainer.classList.add('todo__input-container')

            // ADD INPUT FIELDS TO THEIR ENCLOSING DIV
            inputContainer.appendChild(checkbox)
            inputContainer.appendChild(todoItem)

            // CREATE CONTAINER THAT HOLDS THE TASK/TODO ITEM AND CONTAINER FOR BUTTONS
            const todoContainer = document.createElement('div')
            todoContainer.classList.add('todo__container')
            
            // ADD TASK/TODO ITEM TO IT'S ENCLOSING DIV
            todoContainer.appendChild(inputContainer)

            // ADD BUTTONS CONTAINER TO IT'S ENCLOSNING DIV
            todoContainer.appendChild(buttonsContainer)

            // ADD TODO CONTAINER TO THE LIST
            todoList.appendChild(todoContainer)

        } else {
            // ADD ERROR HANDELING WHEN INPUT FIELD IS EMPTY
            const errorMsgText = document.createElement('h5')
            errorMsgText.innerText = 'Input field is empty, please add todo.'
            errorMsgContainer.appendChild(errorMsgText)

            todoFrom.addEventListener('submit', () => {
                errorMsgText.remove()
            })
        }
        
        // CLEAR INPUT VALUE 
        todoInput.value = null

    }

    // ADD EVENT HANDLER 
    todoFrom.addEventListener('submit', addTodo)
}

// RUN TODO APP
todoApp()