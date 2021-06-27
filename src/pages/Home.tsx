import { useHistory } from "react-router-dom";
import { useState, FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";

import illustrationImg from "assets/images/illustration.svg";
import logoImg from "assets/images/logo.svg";
import googleIconImg from "assets/images/google-icon.svg";

import { database } from "services/firebase";

import { Button } from "components/Button";
import { useAuth } from "hooks/useAuth";

import "../styles/auth.scss";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      toast.error("O código da sala não pode ser vazio", {
        duration: 2000,
        icon: "⚠️",
        position: "top-center",
      });
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      toast.error("Essa sala não existe", {
        duration: 2000,
        icon: "❌",
        position: "top-center",
      });
      return;
    }

    if (roomRef.val().endedAt) {
      toast.error("Essa sala está fechada", {
        duration: 2000,
        icon: "⚠️",
        position: "top-center",
      });
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Teste Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
            <Toaster />
          </form>
        </div>
      </main>
    </div>
  );
}
