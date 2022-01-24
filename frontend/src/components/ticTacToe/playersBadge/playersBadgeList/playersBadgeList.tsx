import { observer } from "mobx-react-lite";
import { useStore } from "../../../../stores/useStore";
import { Users } from "../../../../types/types";

export const PlayersBadgeList = observer(() => {
    const store = useStore();
    
    return (
        <ul className="tic-tac__players-list">
            { store.users.map((user: Users) => 
                    <li className="tic-tac__players-item" key={user._id}>{user.username}: {user.wins}</li>) }
        </ul>
    );
});