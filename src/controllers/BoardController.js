import { buildTimeValue } from "@testing-library/user-event/dist/utils";

function shuffle(array) {
    let randomIndex;

    for (let i = 0; i < array.length; i++) {
      randomIndex = Math.floor(Math.random() * array.length);

      [array[i], array[randomIndex]] = [
        array[randomIndex], array[i]]
    }

    return array;
}

function createTemplate (dificulty) {
    console.log(dificulty)
    let difRange;
    if (dificulty === 1) {
        difRange = [3, 5]
    } else if (dificulty === 2) {
        difRange = [2, 4]
    } else if (dificulty === 3) {
        difRange = [1, 3]
    }

    let template = {
        l0: '', l1: '', l2: '',
        l3: '', l4: '', l5: '',
        l6: '', l7: '', l8: ''
    }
    for (let i = 0; i < 9; i++) {
        let line = ''
        
        let visibleSlots = Math.floor(Math.random() * (((difRange[1]) + 1) - difRange[0])) + difRange[0]
        for (let n = 1; n <= 9; n++) {
            if (n <= visibleSlots) {
                line += '1'
            } else {
                line += '0'
            }
        }

        line = shuffle(line.split('')).join('')
        console.log(line)

        if (i < 3) {
            template.l0 += line.slice(0, 3)
            template.l1 += line.slice(3, 6)
            template.l2 += line.slice(6, 9)
        } else if (i >= 3 && i < 6) {
            template.l3 += line.slice(0, 3)
            template.l4 += line.slice(3, 6)
            template.l5 += line.slice(6, 9)
        } else {
            template.l6 += line.slice(0, 3)
            template.l7 += line.slice(3, 6)
            template.l8 += line.slice(6, 9)
        }
    }

    console.log(template)

    return shuffle(template)
}

export const BoardBuilder = (board, dificulty, func) => {
    let builtBoardHiddenSlots = []
    let unswers = {}

    console.log(dificulty)
    let template = createTemplate(dificulty)

    for (let i = 0; i < board.length; i++) {
      let item = board[i]
      let boardHiddenLine = ''

      for (let n = 0; n < item.length; n++) {
        if (template[`l${i}`][n] === '1') {
            boardHiddenLine += item[n]
        } else {
            unswers[`s${i}${n}`] = item[n]
            boardHiddenLine += '0'
        }

      }
      builtBoardHiddenSlots.push(boardHiddenLine)
    }

    console.log(builtBoardHiddenSlots)

    if (typeof func === 'function') {
        func(builtBoardHiddenSlots, unswers)
    }
}