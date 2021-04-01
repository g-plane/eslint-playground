const fontsURLMap = new Map([
  [
    'Fira Code',
    'https://cdn.jsdelivr.net/npm/@fontsource/fira-code@4.2.2/index.css',
  ],
  [
    'Inconsolata',
    'https://cdn.jsdelivr.net/npm/@fontsource/inconsolata@4.2.2/index.css',
  ],
  [
    'JetBrains Mono',
    'https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@4.2.2/index.css',
  ],
  [
    'Mononoki',
    'https://cdn.jsdelivr.net/npm/@fontsource/mononoki@4.2.1/index.css',
  ],
  [
    'PT Mono',
    'https://cdn.jsdelivr.net/npm/@fontsource/pt-mono@4.2.2/index.css',
  ],
  [
    'Roboto Mono',
    'https://cdn.jsdelivr.net/npm/@fontsource/roboto-mono@4.2.2/index.css',
  ],
  [
    'Source Code Pro',
    'https://cdn.jsdelivr.net/npm/@fontsource/source-code-pro@4.2.3/index.css',
  ],
  [
    'Victor Mono',
    'https://cdn.jsdelivr.net/npm/@fontsource/victor-mono@4.2.4/index.css',
  ],
])

export function loadFont(name: string): Promise<Event | void> {
  return new Promise((resolve, reject) => {
    const url = fontsURLMap.get(name)
    if (url) {
      const element = document.createElement('link')
      element.rel = 'stylesheet'
      element.href = url
      element.dataset.font = name
      element.addEventListener('load', resolve, { once: true })
      element.addEventListener('error', reject, { once: true })
      document.head.appendChild(element)
    } else {
      resolve()
    }
  })
}
