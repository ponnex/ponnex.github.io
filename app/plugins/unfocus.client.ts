// Hide focus rings for pointer users; keep :focus-visible for keyboard navigation.
export default defineNuxtPlugin(() => {
  const styleText =
    '::-moz-focus-inner{border:0!important}:focus:not(:focus-visible){outline:none!important}'
  const unfocusStyle = document.createElement('style')
  document.head.appendChild(unfocusStyle)
  unfocusStyle.innerHTML = styleText
})
