let myLeads = []
// Get the id of the required html elements
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

// Get the leads from the local storage
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

// If there are leads in the local storage, add them too myLeads array
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

// Save Input  event listener
inputBtn.addEventListener("click", function() {
    if(inputEl.value !==''){
        myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) ) // stringify and push to local storage
    render(myLeads) //show the leads in the myLeads array
    }
})

// Save tab event listener
tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)// get the user's current tab and push to myLeads array
        localStorage.setItem("myLeads", JSON.stringify(myLeads) ) // stringify and push to local storage
        render(myLeads) //show the leads in the myLeads array
    })
})

//delete all leads button event listener
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear() //clear local storage
    myLeads = []
    render(myLeads)
})

// render leads function
function render(leads) {
    ulEl.innerHTML = ""; // Clear existing content
    leads.forEach((lead, index) => {
        const listItem = document.createElement('li')
        
        const link = document.createElement('a')
        link.target = '_blank';
        link.href = lead
        link.textContent = lead

        const deleteBtn = document.createElement('img')
        deleteBtn.src = "/close.png"
        deleteBtn.className = "delete-btn"
        deleteBtn.addEventListener('click', () => deleteLead(index))

        listItem.appendChild(link)
        listItem.appendChild(deleteBtn)

        ulEl.appendChild(listItem)
    });
}

//Function to delete a particular lead
function deleteLead(index) {
    console.log("Deleting lead at index:", index)
    console.log("Before deletion:", myLeads)
    
    myLeads.splice(index, 1)
    
    console.log("After deletion:", myLeads)
    
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads);
}


