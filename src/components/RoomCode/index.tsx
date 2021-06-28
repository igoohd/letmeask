import { useState } from 'react'
import copyImg from '~/assets/images/copy.svg'

import './styles.scss'

type RoomCodeProps = {
  code: string
}

export function RoomCode(props: RoomCodeProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
    setShowTooltip(true)
    setTimeout(() => {
      setShowTooltip(false)
    }, 1000)
  }
  return (
    <div className="room-code">
      <button className="copy-button" onClick={copyRoomCodeToClipboard}>
        <div>
          <img src={copyImg} alt="Copy room code" />
        </div>
        <span>Sala #{props.code}</span>
      </button>
      <div
        className={`copy-tooltip ${showTooltip ? '-active' : ''}`}
      >
        Código copiado!
      </div>
    </div>
  )
}