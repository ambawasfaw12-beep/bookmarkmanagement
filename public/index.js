const container = document.querySelector(".container")
const title = document.getElementById("title")
const link = document.getElementById("link")
const addBtn = document.getElementById("addBtn")
let currentEditingId = null

async function fetchSite() {
    const response = await fetch('/api/bookmarks')
    const data = await response.json()
    const sites = data.sites

    container.innerHTML = ''
    sites.forEach(element => {
        const siteDiv = document.createElement('div')
        siteDiv.className = 'site-card'

        siteDiv.innerHTML = `
        <div>
          <p>${element.site}</p>
          <a href="${element.url}" target="_blank">${element.url}</a>
        </div>
        <div class="btn-box">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
        </div>
         `
        const editBtn = siteDiv.querySelector('.edit-btn')
        editBtn.addEventListener('click', () => editSiteHandler(element.id, element.site, element.url))

        const deleteBtn = siteDiv.querySelector('.delete-btn')
        deleteBtn.addEventListener('click', () => deleteSiteHandler(element.id))
        container.appendChild(siteDiv)
    });
}

fetchSite()

async function addsite() {
    const site = title.value.trim()
    const url = link.value.trim()

    if (!site || !url) {
        alert('Fill all the data!')
        return
    }

    await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            name: site,
            address: url
        })
    })

    title.value = ''
    link.value = ''
    fetchSite()

}

addBtn.addEventListener('click', async () => {
    if (currentEditingId !== null) {
        const site = title.value.trim()
        const url = link.value.trim()
        if (!site || !url) {
            alert('Fill all the data!')
            return
        }

        await fetch(`/api/bookmarks?id=${currentEditingId}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                name: site,
                address: url
            })
        })

        title.value = ''
        link.value = ''
        currentEditingId = null
        addBtn.textContent = 'Add Bookmark'
        fetchSite()

    }

    else {
        addsite()
    }
})

async function editSiteHandler(id, name, urls) {

    title.value = name
    link.value = urls
    currentEditingId = id
    addBtn.textContent = 'Update Bookmark'
}

async function deleteSiteHandler(id) {

    const response = await fetch(`/api/bookmarks?id=${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        fetchSite()
    } else {
        alert('Failed to delete bookmark')
    }

} 