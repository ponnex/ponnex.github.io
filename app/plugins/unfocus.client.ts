// Removes focus outlines when navigating by mouse, restores them on keyboard
// use. Ported from the original `unfocus.js` plugin.
export default defineNuxtPlugin(() => {
  const styleText = '::-moz-focus-inner{border:0 !important;}:focus{outline: none !important;}'
  const unfocusStyle = document.createElement('style')
  document.head.appendChild(unfocusStyle)

  document.addEventListener('mousedown', () => {
    unfocusStyle.innerHTML = styleText
  })
  document.addEventListener('keydown', () => {
    unfocusStyle.innerHTML = ''
  })
})
