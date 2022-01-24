import { observer } from "mobx-react-lite";
import React from "react";

interface TicTacToeBodyItemsProps {
    squares: Array<string | null>;
    clickHandler: (event: React.MouseEvent<HTMLElement>) => void;
}

export const TicTacToeBodyItems = observer(({ squares, clickHandler }: TicTacToeBodyItemsProps) => {

    const sendHandler = (event: any) => {
        return clickHandler(event);
    }

    return (
        <>
            { squares.map((square: string | null, index: any) => (
                    <div 
                        className="tic-tac__item" 
                        id={index} 
                        key={index} 
                        onClick={sendHandler}
                    >
                        <p id={index}>{square}</p>
                    </div>
                )) }
        </>
    )
});