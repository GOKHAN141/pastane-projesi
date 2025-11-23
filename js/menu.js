import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function loadMenu() {
  const { data, error } = await supabase.from('products').select('*')
  if (error) {
    console.error(error)
    return
  }

  const container = document.getElementById('menu-container')
  container.innerHTML = ''

  data.forEach(item => {
    const div = document.createElement('div')
    div.className = 'menu-item'
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <span>${item.price} TL</span>
    `
    container.appendChild(div)
  })
}

window.addEventListener('DOMContentLoaded', loadMenu)
