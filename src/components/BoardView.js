import styles from './css/BoardView.module.css'
import { useEffect, useState } from 'react';
import Generator from '../Generator';
import { BoardBuilder } from '../controllers/BoardController'
import BoardModalWindow from './BoardModalWindow';

function BoardView() {
    const [board, setBoard] = useState([])
    const [boardHiddenSlots, setBoardHiddenSlots] = useState([])
    const [wrongSlotValue, setWrongSlotValue] = useState('')
    const [hoveredSlot, setHoveredSlot] = useState('')
    const [unswers, setUnswers] = useState(false)
    const [userUnswers, setUserUnswers] = useState({})
    const [dificulty, setDificulty] = useState(1)
    const [modalOpened, setModalOpened] = useState(false)

    function restartGame (dificulty) {
        sessionStorage.clear()
        setBoard([])
        setBoardHiddenSlots([])
        setWrongSlotValue('')
        setHoveredSlot('')
        setUnswers(false)
        setUserUnswers({})
        setDificulty(dificulty)
        setModalOpened(false)

        setBoardToSessionStorage(dificulty)
    }

    const setBoardToSessionStorage = (dificulty) => {
        let generator = new Generator()
        let board = generator.getBoard()
        let boardStringified = JSON.stringify(board)
        console.log(board)
        setBoard(board)
        BoardBuilder(board, dificulty, (newBoard, unswers) => {
            sessionStorage.setItem('board_with_hidden_slots', JSON.stringify(newBoard))
            sessionStorage.setItem('board_unswers', JSON.stringify(unswers))
            setBoardHiddenSlots(newBoard)
            setUnswers(unswers)
        })
        window.sessionStorage.setItem('board', boardStringified)
    }

    useEffect(() => {
        if (!window.sessionStorage.getItem('board')) {
            setModalOpened(true)
        } else {
            let parseBoard = JSON.parse(sessionStorage.getItem('board'))
            let parseBoardHS = JSON.parse(sessionStorage.getItem('board_with_hidden_slots'))
            let parseBoardUnswers = JSON.parse(sessionStorage.getItem('board_unswers'))
            let parseBoardDificulty = JSON.parse(sessionStorage.getItem('board_dificulty'))

            setBoard(parseBoard)
            setBoardHiddenSlots(parseBoardHS)
            setUnswers(parseBoardUnswers)
            setDificulty(parseBoardDificulty)
        }
    }, [])

    useEffect(() => {
        if (JSON.stringify(userUnswers) === JSON.stringify(unswers)) {
            console.log('You did it! Congratulations!')
        }
    }, [userUnswers])

    const CheckSlot = (board, id, value) => {
        if (value) {
            if (board[id[0]][id[2]] === value * 1) {
                userUnswers[`s${id[0]}${id[2]}`] = value * 1
                console.log(userUnswers, unswers)
                setUserUnswers(Object.keys(userUnswers).sort().reduce(
                    (obj, key) => {
                        obj[key] = userUnswers[key];
                        return obj;
                    }, {}
                ))
                setWrongSlotValue('')
                console.log(JSON.stringify(userUnswers), JSON.stringify(unswers))
                if (JSON.stringify(userUnswers) === JSON.stringify(unswers)) {
                    console.log('You did it! Congratulations!')
                }
            } else {
                setWrongSlotValue(id)
            }
        } else {
            setWrongSlotValue('')
        }
    }

    const hoverEffect = (id) => {
        if (hoveredSlot) {
            if (hoveredSlot[0] === id[0] || hoveredSlot[2] === id[2]) {
                return true
            }
        }
        return false
    }

    const showBoard = () => {
        let shownBoard = []

        for (let i = 0; i < boardHiddenSlots.length; i++) {
            let item = boardHiddenSlots[i]

            for (let n = 0; n < item.length; n++) {

                if (item[n]*1) {
                    shownBoard.push( 
                        <span 
                            key = {`${i}${n}`}
                            id = {`${i}-${n}`}
                            className = {`${styles.static_slot} ${hoverEffect(`${i}-${n}`) ? styles.hovered : ''}`}
                            onMouseOver = {(e) => setHoveredSlot(e.target.id)}
                            onMouseOut = {(e) => setHoveredSlot('')} >
                                {item[n]}
                        </span>
                    )
                } else {
                    shownBoard.push(
                        <input
                        type = 'number'
                        key = {`${i}${n}`}
                        id = {`${i}-${n}`}
                        className = {
                            `${styles.changable_slot
                            } ${wrongSlotValue === `${i}-${n}` ? styles.wrong : ''
                            } ${hoverEffect(`${i}-${n}`) ? styles.hovered : ''}`
                        }
                        onChange = {(e) => CheckSlot(board, e.target.id, e.target.value)}
                        onMouseOver = {(e) => setHoveredSlot(e.target.id)}
                        onMouseOut = {(e) => setHoveredSlot('')}/>
                    )
                }
            }
        }
        return shownBoard
    }

    return (
        <section className = {styles.sudoku_board} >
            {modalOpened ?
                <BoardModalWindow
                    easy={() => restartGame(1)}
                    medium={() => restartGame(2)}
                    hard={() => restartGame(3)}
                    canClose={board.length}
                    closeFunc={() => setModalOpened(false)}
                /> :
                <>
                    <div className = {styles.sudoku_board_container}>
                        {showBoard().map((item) => item)}
                    </div>
                    <button
                        className={styles.board_new_game_btn}
                        onClick={() => setModalOpened(true)}>
                            Create new puzzle
                    </button>
                </>
            }
        </section>
    )
}

export default BoardView