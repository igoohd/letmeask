import { Link, useHistory } from 'react-router-dom'
import { FormEvent } from 'react'
import { useAuth } from '~/hooks/useAuth'

import illustrationImg from '~/assets/images/illustration.svg'
import logoImg from '~/assets/images/logo.svg'

import { Button } from '~/components/Button'
import { database } from '~/services/firebase'

import '~/styles/auth.scss'
import { useState } from 'react'

export function NewRoom() {
  const { user, signOut } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  async function handleSignOut(event: FormEvent) {
    event.preventDefault();

    await signOut();

    history.push("/");
  }

  return (
    <div className="page-auth">
      <aside className="home-intro">
        <img
          className="illustration"
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong className="spotlight">Teste Crie salas de Q&amp;A ao vivo</strong>
        <p className="description">Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main className="main-wrapper">
        <div className="main-content">
          <img className="logo" src={logoImg} alt="Letmeask" />
          <h2 className="title">Criar uma nova sala</h2>
          <form className="room-form -main" onSubmit={handleCreateRoom}>
            <input
              className="input"
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar na sala</Button>
          </form>
          <form className="room-form -main" onSubmit={handleSignOut}>
            <Button type="submit">Logout</Button>
          </form>
          <p className="cta-footer">
            Quer entrar em uma sala existente? <Link className="link" to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
