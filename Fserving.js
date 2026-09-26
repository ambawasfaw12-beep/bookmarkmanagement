import fs from 'node:fs/promises'

export async function getHomePage() {
  return  await fs.readFile('./public/index.html', 'utf-8')
}

export async function getStyle() {
  return  await fs.readFile('./public/style.css', 'utf-8')
}

export async function getJSFile() {
  return await fs.readFile('./public/index.js', 'utf-8')
}