document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('item-input');
    const addButton = document.getElementById('add-button');
    const shoppingList = document.getElementById('shopping-list');
    const clearButton = document.getElementById('clear-button');

    let items = JSON.parse(localStorage.getItem('shoppingList')) || [];

    const renderList = () => {
        shoppingList.innerHTML = '';
        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = item.purchased ? 'purchased' : '';
            li.textContent = item.name;
            li.addEventListener('click', () => togglePurchased(index));

            const editButton = document.createElement('button');
            editButton.className = 'edit-button';
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', (e) => {
                e.stopPropagation();
                editItem(index);
            });

            const removeButton = document.createElement('button');
            removeButton.className = 'remove-button';
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                removeItem(index);
            });

            li.appendChild(editButton);
            li.appendChild(removeButton);
            shoppingList.appendChild(li);
        });
    };

    const addItem = () => {
        const itemName = itemInput.value.trim();
        if (itemName) {
            const itemExists = items.some(item => item.name.toLowerCase() === itemName.toLowerCase());
            if (itemExists) {
                const confirmAdd = confirm('This item already exists. Do you want to add it again?');
                if (!confirmAdd) {
                    return;
                }
            }
            items.push({ name: itemName, purchased: false });
            itemInput.value = '';
            saveAndRender();
        }
    };

    const togglePurchased = (index) => {
        items[index].purchased = !items[index].purchased;
        saveAndRender();
    };

    const editItem = (index) => {
        const newItemName = prompt('Edit item:', items[index].name);
        if (newItemName !== null && newItemName.trim()) {
            items[index].name = newItemName.trim();
            saveAndRender();
        }
    };

    const removeItem = (index) => {
        items.splice(index, 1);
        saveAndRender();
    };

    const clearList = () => {
        items = [];
        saveAndRender();
    };

    const saveAndRender = () => {
        localStorage.setItem('shoppingList', JSON.stringify(items));
        renderList();
    };

    addButton.addEventListener('click', addItem);
    clearButton.addEventListener('click', clearList);

    renderList();
});
