import { useState } from 'react';
import styles from './css/BoardModalWindow.module.css'

function BoardModalWindow(props) {
    const [radioChoosen, setRadioChoosen] = useState('radio1')


    function create () {
        radioChoosen === 'radio1' && props.easy(1);
        radioChoosen === 'radio2' && props.medium(2);
        radioChoosen === 'radio3' && props.hard(3);
    }

    function chooseRadio (e) {
        e.target.id === 'radio1' && setRadioChoosen(e.target.id)
        e.target.id === 'radio2' && setRadioChoosen(e.target.id)
        e.target.id === 'radio3' && setRadioChoosen(e.target.id)
    }

    // eslint-disable-next-line
    return (
        <div className={styles.modal_window_container}>
            <h1 className={styles.modal_window_title}>Sudoku</h1>
            <div className={styles.modal_window}>
                {props.canClose ?
                    <div
                        onClick={props.closeFunc}
                        className={styles.close_btn}>
                            <div></div>
                            <div></div>
                    </div> :
                    <div className={styles.close_btn}></div>}
                <h1 className={styles.header_text}>Choose difficulty</h1>
                <input
                    className={styles.input}
                    type='radio' id='radio1'
                    onClick={(e) => chooseRadio(e)}
                    checked={radioChoosen === 'radio1'} />
                <label
                    htmlFor='radio1'
                    className={radioChoosen === 'radio1' ? styles.checked : styles.label}>
                        Easy, 3-5 prefilled numbers
                </label>
                <input
                    className={styles.input}
                    type='radio' id='radio2'
                    onClick={(e) => chooseRadio(e)}
                    checked={radioChoosen === 'radio2'} />
                <label
                    htmlFor='radio2'
                    className={radioChoosen === 'radio2' ? styles.checked : styles.label}>
                        Medium, 2-4 prefilled numbers
                </label>
                <input
                    className={styles.input}
                    type='radio' id='radio3'
                    onClick={(e) => chooseRadio(e)}
                    checked={radioChoosen === 'radio3'} />
                <label
                    htmlFor='radio3'
                    className={radioChoosen === 'radio3' ? styles.checked : styles.label}>
                        Hard, 1-3 prefilled numbers
                </label>

                <button className={styles.create_btn} onClick={create}>Create</button>
            </div>
        </div>
    )
}

export default BoardModalWindow;