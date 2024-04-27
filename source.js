function playerfactory(name,symbol,default_score=0){
    player = name;
    mark = symbol;
    score = default_score;
    return {player,mark,score}
}
(function Gameboard(){
    let board = ['','','',
                 '','','',
                 '','',''];
    const player1 = playerfactory("user1",'X');
    const player2 = playerfactory("user2",'O');
    let currentplayer = player1;
    let gamestatus = true;
    function clearui(){
        const container = document.querySelectorAll('.cell')
        container.forEach((cell)=>{
            cell.classList.remove('winnermark')
        })
    }
    function winnerui(a,b,c){
        const contents = document.querySelectorAll('.cell')
        const win = [a,b,c]
        win.forEach((cell)=>{
            contents[cell].classList.add('winnermark')
        })
    }
    let render = () =>{
        clearui()
        const contents = document.querySelectorAll('.cell')
        contents.forEach((cell,i)=>{
            cell.textContent = board[i];
        })
    }
    function handleclick(e){
        let indexposition = e.target.dataset.index
            if(gamestatus && !board[indexposition]){
            board[indexposition] = currentplayer.mark;
            currentplayer = currentplayer === player1 ? player2 : player1;
            render()
            let result = winnercheck()
            if (result){
                gamestatus = false;
            }
        }
    } 

    function Initialize(){
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell)=>{
            cell.addEventListener("click",handleclick);
        })
        render();
    }
    function winnercheck(){
        let winner = null;
        const winconditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
            [0, 4, 8], [2, 4, 6], //diagonal
        ];
        for (let i =0; i<winconditions.length;i++){
            const [a,b,c] = winconditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]){
                winner = board[a];
                if (winner === 'X'){
                    player1.score +=1;
                }
                else{
                    player2.score +=1;
                }
                winnerui(a,b,c)
                winnerupdate(winner);
                return winner;
            }
        }
        let draw = true
        for(let i = 0; i<board.length;i++){
            if(board[i] === ''){
                draw = false;
                break;
            }
        }
        if(draw){
            gamestatus = false;
            winner = "draw";
            winnerupdate(winner)
            return winner;
        }
    }
    function winnerupdate(winner){
        
        if (winner === 'X'){
            const winui = document.querySelector('.scoreX')
            winui.innerHTML = player1.score;
            const banner = document.querySelector('.announcement');
            banner.textContent = 'Player X won this round'
        }
        else if(winner === 'O'){
            const winui = document.querySelector('.scoreO')
            winui.innerHTML = player2.score;
            const banner = document.querySelector('.announcement');
            banner.textContent = 'Player O won this round'
        }
        else if(winner === 'draw'){
            const banner = document.querySelector('.announcement')
            banner.textContent = "It's a draw 🙂";
        }
    }
    Initialize()
    const reset = document.getElementById('reset_board');
    const restart = document.getElementById('restart');
    reset.addEventListener('click',()=>{
        for(let i=0;i<board.length;i++){
            board[i] = '';
        }
        gamestatus = true;
        const banner = document.querySelector('.announcement');
        banner.innerHTML = " ";
        render()
    })
    restart.addEventListener('click',()=>{
        for(let i=0;i<board.length;i++){
            board[i] = '';
        }
        player1.score = 0;
        player2.score = 0;
        gamestatus = true;
        currentplayer = player1;
        winnerupdate('X');
        winnerupdate('O');
        const banner = document.querySelector('.announcement');
        banner.innerHTML = " ";
        render()
       
    })
}())