import * as React from "react";

enum Player {
  none = 0,
  one = 1,
  two = 2
}
interface IState {
  board: number[];
  whoNext: number;
  whoWin: number;
  noEmptySquaresInBoard: boolean;
}
class AppTicTacToe extends React.Component {
  public state: IState = {
    board: [
      Player.none,
      Player.none,
      Player.none,
      Player.none,
      Player.none,
      Player.none,
      Player.none,
      Player.none,
      Player.none
    ],
    noEmptySquaresInBoard: false,
    whoNext: Player.one,
    whoWin: Player.none
  };

  public makeHandleSquareClick = (key: number) => (): void => {
    const { board, whoNext, whoWin } = this.state;
    if (board[key] > Player.none || whoWin > Player.none) {
      return;
    }
    const newBoard: number[] = board.map((square, id) => {
      return id === key ? whoNext : square;
    });
    const next = 3 - whoNext;

    const haveNewWinner: boolean = this.haveNewWinner(newBoard, whoNext);

    const noEmptySquaresInBoard: boolean =
      newBoard.filter(square => square === 0).length === 0;

    this.setState({
      board: newBoard,
      noEmptySquaresInBoard,
      whoNext: next,
      whoWin: haveNewWinner ? whoNext : 0
    });
  };

  public handleNewGame = () => {
    this.setState({
      board: [
        Player.none,
        Player.none,
        Player.none,
        Player.none,
        Player.none,
        Player.none,
        Player.none,
        Player.none,
        Player.none
      ],
      noEmptySquaresInBoard: false,
      whoNext: Player.one,
      whoWin: Player.none
    });
  };

  public renderSquare():JSX.Element {
    const { board, whoWin, noEmptySquaresInBoard } = this.state;
    const squareClass:string = whoWin > Player.none || noEmptySquaresInBoard ? "jv-square" : "jv-square jv-square-hover";
    return (
      <>
        {board.map((value: number, key: number) => {
          return (
            <div
              className={
                value > Player.none
                  ? value === Player.one
                    ? `${squareClass} jv-square-one`
                    : `${squareClass} jv-square-two`
                  : squareClass
              }
              key={key}
              onClick={this.makeHandleSquareClick(key)}
            />
          );
        })}
      </>
    );
  }
  public renderBoard():JSX.Element {
    return <div className="jv-board">{this.renderSquare()}</div>;
  }

  public render():JSX.Element {
    const { whoNext, whoWin, noEmptySquaresInBoard } = this.state;
    return (
      <div>
        {this.renderBoard()}
        <div className="jv-info">
          {noEmptySquaresInBoard && whoWin === Player.none ? (
            <div>
              <div style={{fontWeight:"bold"}}>Ходы отсутствуют!</div>
              <button onClick={this.handleNewGame}>Начать заново</button>
            </div>
          ) : whoWin > Player.none ? (
            <section>
              <div style={{fontWeight:"bold"}}>{`Победил ${whoWin} игрок!`}</div>
              <button onClick={this.handleNewGame}>Начать заново</button>
            </section>
          ) : (
            <section>
              <div>Следующий ходит <span style={{fontWeight:"bold"}}>{whoNext} игрок</span>.</div>
            </section>
          )}
        </div>
      </div>
    );
  }

  private haveNewWinner(board: number[], player: number): boolean {
    return (
      (board[0] === player && board[1] === player && board[2] === player) ||
      (board[3] === player && board[4] === player && board[5] === player) ||
      (board[6] === player && board[7] === player && board[8] === player) ||
      (board[0] === player && board[3] === player && board[6] === player) ||
      (board[1] === player && board[4] === player && board[7] === player) ||
      (board[2] === player && board[5] === player && board[8] === player) ||
      (board[2] === player && board[4] === player && board[6] === player) ||
      (board[0] === player && board[4] === player && board[8] === player)
    );
  }
}

export default AppTicTacToe;
