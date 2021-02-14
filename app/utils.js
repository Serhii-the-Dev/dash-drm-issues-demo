export const getVideoNode = () => {
  const video = document.querySelector('video')
  video.setAttribute('crossorigin', 'anonymous')

  return video
}

export const keys = {
  ENTER: 13,
  LEFT: 37,
  RIGHT: 39,
  BACK: 461
}
