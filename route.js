import { getHomePage, getStyle, getJSFile } from "./Fserving.js"
import { readlinks,saveLink } from "./getdata.js"

export async function apiHandlerFun(req, res) {

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`)
  const pathname = parsedUrl.pathname
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

  }

  else {
    res.writeHead(404, { 'content-type': 'text/html' })
    res.end(`<h2>Page not found</h2>`)
  }
}