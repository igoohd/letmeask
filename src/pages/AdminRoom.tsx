import { useParams } from "react-router-dom";

import deleteImg from '~/assets/images/delete.svg'
import checkImg from '~/assets/images/check.svg'
import answerImg from '~/assets/images/answer.svg'

import { Question } from '~/components/Question'
import { Header } from '~/components/Header'
import { useRoom } from '~/hooks/useRoom'

import '~/styles/room.scss'
import { database } from '~/services/firebase'

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  // const { user } = useAuth()
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { questions, title } = useRoom(roomId);

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database
      .ref(`rooms/${roomId}/questions/${questionId}`)
      .update({ isAnswered: true });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database
      .ref(`rooms/${roomId}/questions/${questionId}`)
      .update({ isHighlighted: true });
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <div className="page-room">
      <Header roomId={roomId} isOutlined></Header>

      <main className="main-heading">
        <div className="room-title -heading">
          <h1 className="title">Sala {title}</h1>
          {questions.length > 0 && <span className="indicator">{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      className="icon-button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img
                        src={checkImg}
                        alt="Marcar pergunta como respondida"
                      />
                    </button>
                    <button
                      type="button"
                      className="icon-button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque a pergunta" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
