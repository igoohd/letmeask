import { useHistory } from 'react-router-dom'
import logoImg from '~/assets/images/logo.svg'
import { database } from '~/services/firebase'
import { Button } from '~/components/Button'
import { RoomCode } from '~/components/RoomCode'

import "./styles.scss";

type HeaderProps = {
  roomId: string;
  isOutlined?: boolean;
};

export function Header(props: HeaderProps) {
  const history = useHistory();

  async function handleEndRoom() {
    database.ref(`rooms/${props.roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  return (
    <header className="page-header">
      <div className="header-content">
        <img className="logo" src={logoImg} alt="Letmeask" />
        <div className="button-wrapper -header">
          <RoomCode code={props.roomId} />
          {props.isOutlined && (
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
