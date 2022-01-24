import PlayersBadgeList from "./playersBadgeList";

import './playersBadge.scss';

export const PlayersBadge = () => {

    return (
        <div className="tic-tac__badge">
            <span className="tic-tac__players">Players: </span>
            <PlayersBadgeList />
        </div>
    )
};