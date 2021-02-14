import shaka from 'shaka-player/dist/shaka-player.compiled.debug'
import { getVideoNode, keys } from '../utils'

const startPlayer = (manifest) => {
  shaka.log.setLevel(shaka.log.Level.V2)
  shaka.polyfill.installAll()

  const video = getVideoNode()

  const player = new shaka.Player(video)
  player.load(manifest).catch(error => console.error(error))

  window.addEventListener('keydown', ({ keyCode }) => {
    console.log(`Key down: ${keyCode}`)

    switch (keyCode) {
      case keys.ENTER:
        if (video.paused) {
          video.play()
        } else {
          video.pause()
        }
        break
      case keys.LEFT:
        video.currentTime = video.currentTime - 10
        break
      case keys.RIGHT:
        video.currentTime = video.currentTime + 10
        break
      case keys.BACK:
        player.destroy()
        window.close()
        break
    }
  })
}

export default startPlayer
