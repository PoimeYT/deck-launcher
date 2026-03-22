// Tab switching
const navItems = document.querySelectorAll('.nav-item')
const tabs = document.querySelectorAll('.tab')

function switchTab(tabName) {
  navItems.forEach(n => n.classList.remove('active'))
  tabs.forEach(t => t.classList.remove('active'))

  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active')
  document.getElementById(`tab-${tabName}`).classList.add('active')
}

navItems.forEach(item => {
  item.addEventListener('click', () => switchTab(item.dataset.tab))
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') switchTab(item.dataset.tab)
  })
})

// Play button
const playBtn = document.getElementById('play-btn')
const statusText = document.getElementById('status-text')
const versionSelect = document.getElementById('version-select')

playBtn.addEventListener('click', () => {
  const version = versionSelect.value
  statusText.textContent = `Launching ${version}...`
  window.launcher.launch(version)
})

window.launcher.onGameLaunched((version) => {
  statusText.textContent = `✓ Minecraft ${version} launched!`
  setTimeout(() => statusText.textContent = '', 4000)
})

// Keyboard nav between sidebar items (arrow keys)
document.addEventListener('keydown', (e) => {
  const items = [...navItems]
  const focused = document.activeElement
  const idx = items.indexOf(focused)

  if (idx !== -1) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      items[(idx + 1) % items.length].focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      items[(idx - 1 + items.length) % items.length].focus()
    }
  }
})
