class Generator {
    constructor () {
        this.board = []

        for (let line = 0; line < 9; line++) {
            let lineArray = []
            for (let col = 0; col < 9; col++) {
              lineArray.push(Math.floor(((line*3 + line/3 + col) % 9 + 1)))
            }
            this.board.push(lineArray)
        }

        this.updateBoard()
    }

    shuffle(array) {
        let randomIndex;

        for (let i = 0; i < array.length; i++) {
          randomIndex = Math.floor(Math.random() * i);

          [array[i], array[randomIndex]] = [
            array[randomIndex], array[i]]
        }
    
        return array;
    }

    rotateBoard() {
        let boardRotated = []

        for (let line = 0; line < 9; line++) {
            let lineArray = []
            for (let col = 0; col < 9; col++) {
                lineArray.push(this.board[col][line])
            }
            boardRotated.push(lineArray)
        }

        this.board = boardRotated
    }

    rotateBoardReverse() {
        let boardRotated = []

        for (let line = 8; line >= 0; line--) {
            let lineArray = []
            for (let col = 8; col >= 0; col--) {
                lineArray.push(this.board[col][line])
            }
            boardRotated.push(lineArray)
        }

        this.board = boardRotated
    }

    randomRotate() {
        let rotationNums = Math.floor(Math.random() * 4) + 1

        for (let i = 0; i < rotationNums; i++) {
            let direction = Math.floor(Math.random() * 1)
            
            direction === 0 ? this.rotateBoardReverse() : this.rotateBoard()
        }
    }
    
    shuffleRows() {
        let lines1 = []
        let lines2 = []
        let lines3 = []
        let i = 0

        for (let item of this.board) {
            if (i < 3) {
                lines1.push(item)
            } else if (i >= 3 && i < 6) {
                lines2.push(item)
            } else {
                lines3.push(item)
            }
            i++
        }

        lines1 = this.shuffle(lines1)
        lines2 = this.shuffle(lines2)
        lines3 = this.shuffle(lines3)

        let lines = this.shuffle([lines1, lines2, lines3])

        this.board = [...lines[0], ...lines[1], ...lines[2]]
    }

    updateBoard () {
        this.shuffleRows()
        this.rotateBoard()
        this.shuffleRows()
        this.rotateBoardReverse()
        this.randomRotate()
    }

    getBoard () {
        return this.board
    }
}

export default Generator;