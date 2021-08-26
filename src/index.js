let CURRENTDOG;

document.addEventListener('DOMContentLoaded', () => {
    getDogs();
})

function dogTable(obj) {
    const tableBody = document.getElementById('table-body');
    const row = document.createElement('tr');
    const objLength = Object.keys(obj).length;

    for(i = 0; i <= objLength; i++){ 
        for(const key in obj){
            if(obj[key] === obj.id){
                i++;
            } else {
                // let newCell = newRow.insertCell(0);
                let cell = document.createElement('td');
                let cellText = document.createTextNode(obj[key]);
                cell.appendChild(cellText);
                row.appendChild(cell); 
                i++;
            }}
            let cell = document.createElement('td');
            const newBtn = document.createElement('button');
            newBtn.textContent = `EDIT DOG`;
            newBtn.addEventListener('click', (e) => editDog(e, obj))
            cell.appendChild(newBtn);
            row.appendChild(cell); 
    }
    tableBody.appendChild(row);
}

function editDog(e, dog){
    e.preventDefault();
    const nameInput = document.querySelectorAll('input')[0];
    const breedInput = document.querySelectorAll('input')[1];
    const sexInput = document.querySelectorAll('input')[2]
    const currentRow = (e.target.parentNode).parentNode;
    nameInput.value = currentRow.cells[0].textContent;
    breedInput.value = currentRow.cells[1].textContent;
    sexInput.value = currentRow.cells[2].textContent;
    CURRENTDOG = dog;
}

function editSubmit (formSubmissionEvent) {
    const dogName = formSubmissionEvent.target[0].value;
    const dogBreed = formSubmissionEvent.target[1].value;
    const dogSex = formSubmissionEvent.target[2].value;
    const dogObj = {name: dogName, breed: dogBreed, sex: dogSex}
    fetch(`http://localhost:3000/dogs/${CURRENTDOG.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(dogObj)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('error: ', error));
    let tablearr = document.getElementsByTagName('tr');
    tableUpdater(dogObj, tablearr);
    getDogs();
}

function tableUpdater(obj, table) {
    for(let i = 0; i < table.length-1; i++) {
        if(parseInt(CURRENTDOG.id) === i) {
            let x = 0;
            for(const key in obj){
                let row = table[i].cells;
                row[x].textContent = obj[key];
                x++;
            }
        }     
    }
}


function getDogs() {
    fetch("http://localhost:3000/dogs")
    .then(response => response.json())
    .then(dogData => dogData.forEach(dog => {dogTable(dog)}));
    const form = document.getElementById('dog-form');
    
    form.addEventListener('submit', (formSubmissionEvent) => {
        formSubmissionEvent.preventDefault();
        editSubmit(formSubmissionEvent);
    })
}