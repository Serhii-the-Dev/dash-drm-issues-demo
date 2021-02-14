import { MediaPlayer } from 'dashjs'
import { getVideoNode, keys } from '../utils'

const startPlayer = (manifest) => {
  const MediaPlayerEvents = MediaPlayer.events
  const player = MediaPlayer().create()

  let currentTime = 0
  const handlers = {
    [MediaPlayerEvents.PLAYBACK_TIME_UPDATED]: event => {
      currentTime = event.time
    }
  }
  Object.keys(handlers).forEach(key => {
    player.on(key, handlers[key])
  })

  const video = getVideoNode()

  if (player.updateSettings) {
    player.updateSettings({
      debug: {
        logLevel: 5
      }
    })
  }
  player.initialize(video, manifest, true)
  // NOTE: we don't need it, as the LA_URL is provided within the PRO box
  /*
  player.setProtectionData({
    'com.microsoft.playready': {
      serverURL: 'http://test.playready.microsoft.com/service/rightsmanager.asmx?cfg=(kid:cc2b5c91-37e6-4bd2-9982-864216078635)'
    }
  })
  */

  window.addEventListener('keydown', ({ keyCode }) => {
    console.log(`Key down: ${keyCode}`)

    switch (keyCode) {
      case keys.ENTER:
        if (player.isPaused()) {
          player.play()
        } else {
          player.pause()
        }
        break
      case keys.LEFT:
        player.seek(currentTime - 10)
        break
      case keys.RIGHT:
        player.seek(currentTime + 10)
        break
      case keys.BACK:
        Object.keys(handlers).forEach(key => {
          player.off(key, handlers[key])
        })
        player.reset()
        window.close()
        break
    }
  })
}

export default startPlayer
