import fs from 'node:fs/promises'
const filePath = './data.json'

export async function readlinks() {
    try {
        const data = await fs.readFile(filePath, 'utf-8')
        return JSON.parse(data)
    } catch (err) {
        return []
    }
}

export async function saveLink(name, link) {
    const sites = await readlinks()
    const newLink = {
        id: Date.now(),
        site: name,
        url: link,
        addedAt: new Date().toDateString()
    }
    sites.push(newLink)
    await fs.writeFile(filePath, JSON.stringify(sites, null, 2), 'utf-8')
    return newLink
}

export async function deletesite(id) {
    const sites = await readlinks()
    const updatedSite = sites.filter(site =>{
      return  site.id !== id
    })
    
    await fs.writeFile(filePath, JSON.stringify(updatedSite, null, 2), 'utf-8')
    return sites.length !== updatedSite.length
}