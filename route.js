import { deleteNote } from "../nodebasics/notesModel.js"
import { getHomePage, getStyle, getJSFile } from "./Fserving.js"
import { readlinks, saveLink, deletesite } from "./getdata.js"

export async function apiHandlerFun(req, res) {

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`)
  const pathname = parsedUrl.pathname
  const stringId = parsedUrl.searchParams.get('id')
  const method = req.method

  if (pathname === '/' && method === 'GET') {
    try {
      const content = await getHomePage()
      res.writeHead(200, { 'content-type': 'text/html' })
      res.end(content)
    } catch (err) {
      res.writeHead(500, { 'content-type': 'text/plain' })
      res.end('Oops! Something went wrong on our side.')
    }
  }

  else if (pathname === '/style.css' && method === 'GET') {
    try {
      const content = await getStyle()
      res.writeHead(200, { 'content-type': 'text/css' })
      res.end(content)
    } catch (err) {
      res.writeHead(500, { 'content-type': 'text/plain' })
      res.end('Oops! Something went wrong on our side.')
    }
  }

  else if (pathname === '/index.js' && method === 'GET') {
    try {
      const content = await getJSFile()
      res.writeHead(200, { 'content-type': 'text/javascript' })
      res.end(content)

    } catch (err) {
      res.writeHead(500, { 'content-type': 'text/plain' })
      res.end('Oops! Something went wrong on our side.')
    }
  }

  else if (pathname === '/api/bookmarks' && method === 'GET') {
    try {
      const sites = await readlinks()
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify({ success: true, sites }))
    } catch (err) {
      res.writeHead(500, { 'content-type': 'application/json' })
      res.end(JSON.stringify({ success: false, sites: [] }))
    }
  }

  else if (pathname === '/api/bookmarks' && method === 'POST') {
    let body = ''

    req.on('data', chunk => {
      body += chunk.toString()
    })

    req.on('end', async () => {
      try {
        const parsedData = JSON.parse(body)

        // Pass the extracted title/site and link directly from parsedData
        const savedData = await saveLink(parsedData.name, parsedData.address)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: true, site: savedData }))
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Invalid JSON or failed to save' }))
      }
    })
  }

  else if (pathname === '/api/bookmarks' && method === 'PUT') {

  }

  else if (pathname === '/api/bookmarks' && method === 'DELETE') {
    const numericId = Number(stringId)
    const deletedSite = await deletesite(numericId)
    if (deletedSite) {
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify({ success: true, message: "Site deleted" }))
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Note not found' }))
    }
  }
  else {
    res.writeHead(404, { 'content-type': 'text/html' })
    res.end(`<h2>Page not found</h2>`)
  }
}