class Item {
    constructor(instruction) {
        this.instruction = instruction
        this.complete = false
    }
}

window.addEventListener('DOMContentLoaded', (event) => {

    let ul = document.querySelector('ul')

    // render html of an item given it's object
    function configureItem(itemObj, key) {

        // create list element
        let newListItem = document.createElement('li')

        // create list text
        let itemValue = document.createElement('p')
        itemValue.innerHTML = itemObj.instruction
        newListItem.appendChild(itemValue)

        // create span for checkbox
        let span = document.createElement('span')
        itemValue.appendChild(span)

        // create checkbox
        // ! this should be ticked based on complete value
        let checkBox = document.createElement('input')
        checkBox.setAttribute('type', 'checkbox')
        span.appendChild(checkBox)

        // insert list item just before form
        ul.insertBefore(newListItem, ul.lastChild)

        // mark as complete if needed
        if (itemObj.complete) {
            itemValue.classList.add("complete")
            checkBox.setAttribute('checked', true)
        }

        // new listener for when box is checked
        checkBox.addEventListener('click', function(event) {
            itemValue.classList.toggle("complete")
            itemObj.complete = !itemObj.complete
            localStorage.setItem(key, JSON.stringify(itemObj))
        })

    }

    // function to handle form submission
    function addNewItemForm() {

        // create form
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
        
        // handle form submission
        addButton.addEventListener('click', function (event) {
            
            event.preventDefault()
            
            // create and save object
            let newItem = new Item(textField.value)
            let key = localStorage.length
            localStorage.setItem(key, JSON.stringify(newItem))
            
            // render 
            configureItem(newItem, key)

            // clear form
            textField.value = ""
        })
    }

    // go through localStorage, render existing items
    // for ( var i = 0, len = localStorage.length; i < len; ++i ) {
    //     let json = JSON.parse(localStorage.key(i))
    //     if (json) {
    //         console.log(json)
    //     }
    // }
    Object.entries(localStorage).forEach((v)=> {
        let key = v[0]
        let val = v[1]
        if (key != "randid") {
            let json = JSON.parse(val)
            configureItem(json, key)
        }
    })
    addNewItemForm()

})

