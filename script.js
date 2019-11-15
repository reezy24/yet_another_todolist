window.addEventListener('DOMContentLoaded', (event) => {

    let ul = document.querySelector('ul')

    function addNewItemForm() {

        let li = document.createElement('li')
        ul.appendChild(li)

        let form = document.createElement('form')
        li.appendChild(form)

        let textField = document.createElement('input')
        textField.setAttribute('type', 'text')
        form.appendChild(textField)

        let addButton = document.createElement('input')
        addButton.setAttribute('type', 'submit')
        addButton.setAttribute('value', 'Add')
        form.appendChild(addButton)
        
        addButton.addEventListener('click', function (event) {
            
            event.preventDefault()
            
            // create list element
            let newListItem = document.createElement('li')

            // create list text
            let itemValue = document.createElement('p')
            itemValue.innerHTML = textField.value
            newListItem.appendChild(itemValue)

            // create span for checkbox
            let span = document.createElement('span')
            itemValue.appendChild(span)

            // create checkbox
            let checkBox = document.createElement('input')
            checkBox.setAttribute('type', 'checkbox')
            span.appendChild(checkBox)

            // insert list item just before form
            ul.insertBefore(newListItem, ul.lastChild)

            // new listener for when box is checked
            checkBox.addEventListener('click', function(event) {
                itemValue.classList.toggle("complete")
            })

            // clear form
            textField.value = ""
        })
    }

    addNewItemForm()
})

