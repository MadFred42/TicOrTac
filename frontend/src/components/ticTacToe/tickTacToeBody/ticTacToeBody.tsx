import React, { useEffect, useState } from "react";
import TicTacToeBodyItems from "./ticTacToeBodyItems";
import { variationsToWin } from "../../../utils/variations";
import PlayersBadge from "../playersBadge";

import './ticTacToeBody.scss';
import socket from "../../../socket";

export const TicTacToeBody = () => {
    const [squares, changeSquares]: any = useState(Array(9).fill(null));
    const [count, setCount] = useState(0);
    const [isTurn, setIsTurn] = useState(true);

    const ticOrTac = count % 2 === 0 ? 'X' : 'O';

    useEffect(() => {
        
    }, [count, squares, isTurn]);

    const whoIsWinner = (variationsToWin: Array<Array<number>>) => {
        for (let i = 0; i < variationsToWin.length; i++) {
            const [a, b, c] = variationsToWin[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                alert(`${squares[a]} win`);
                setTimeout(() => {
                    changeSquares(Array(9).fill(null));
                    setCount(0);
                    setIsTurn(true);
                }, 2000);
            }
        }
    };

    whoIsWinner(variationsToWin);

    socket.on('getAMove', (data: any) => {
        console.log('your turn');
        console.log(squares);
        const newSquares = squares.map((square: any, index: any) => {

            if (index === data.square) {
                if (!square) {
                    square = ticOrTac;
                    setCount(count + 1);
                    setIsTurn(true);
                } else {
                    return square;
                }
            }
            return square;
        });
        changeSquares(newSquares);
    });

    const clickHandler = (event: React.MouseEvent) => {
        const targetSquareId = +(event.target as HTMLElement).id;
        const newSquares = squares.map((square: any, index: any) => {

            if (index === targetSquareId) {
                if (!square) {
                    if (isTurn) {
                        socket.emit('makeAMove', { ticOrTac, square: targetSquareId });
                        setIsTurn(false);
                        square = ticOrTac;
                        setCount(count + 1);
                    }
                } else {
                    return square;
                }
            }

            return square;
        });

        changeSquares(newSquares);
    };

    return (
        <>
            <PlayersBadge />
            <div className="tic-tac__body">
                <TicTacToeBodyItems squares={squares} clickHandler={clickHandler} />
            </div>
        </>
    );
};