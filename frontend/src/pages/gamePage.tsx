import { isObservable } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import TicTacToe from "../components/ticTacToe";
import { useStore } from "../stores/useStore";

export const GamePage = observer(() => {
    const store = useStore();

    useEffect(() => {
        store.getUsers();
    }, []);

    return <TicTacToe />
});