let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
let ovuong = 20;
let randimp3 = new Audio('amthanh/ranbo.mp3')
let ketthucmp3 = new Audio('amthanh/gameover.mp3')
let dopmoimp3 = new Audio('amthanh/rananmoi.mp3')
ctx.fillStyle = 'black'
ctx.fillRect(0, 0, canvas.width, canvas.width);

class Toado {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let checkhuong = new Toado(-1, 0)

class Snake {
    constructor() {
        this.thanran = [
            new Toado(ovuong * 6, ovuong * 3),
            new Toado(ovuong * 7, ovuong * 3),
            new Toado(ovuong * 8, ovuong * 3),
        ]
        this.tocdo = new Toado(-1, 0)
    }


    veRan() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.thanran[0].x, this.thanran[0].y, ovuong - 2, ovuong - 2)
        for (let i = 1; i < this.thanran.length; i++) {
            ctx.fillStyle = 'blue';
            ctx.fillRect(this.thanran[i].x, this.thanran[i].y, ovuong - 2, ovuong - 2)
        }
    }

    xoaRan() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.thanran[0].x, this.thanran[0].y, ovuong - 2, ovuong - 2)
        for (let i = 1; i < this.thanran.length; i++) {
            ctx.fillStyle = 'black';
            ctx.fillRect(this.thanran[i].x, this.thanran[i].y, ovuong - 2, ovuong - 2)
        }
    }

    diXuyenTuong() {
        if (this.thanran[0].x < 0) {
            this.thanran[0].x = canvas.width - ovuong;
        }
        if (this.thanran[0].x > canvas.width - ovuong) {
            this.thanran[0].x = 0;
        }
        if (this.thanran[0].y < 0) {
            this.thanran[0].y = canvas.width - ovuong;
        }
        if (this.thanran[0].y > canvas.width - ovuong) {
            this.thanran[0].y = 0;
        }
    }

    diChuyen() {
        this.xoaRan()
        for (let i = this.thanran.length - 1; i >= 1; i--) {
            this.thanran[i].x = this.thanran[i - 1].x;
            this.thanran[i].y = this.thanran[i - 1].y;
        }
        this.thanran[0].x += this.tocdo.x * ovuong;
        this.thanran[0].y += this.tocdo.y * ovuong;
        randimp3.play()
        this.diXuyenTuong()
        this.veRan()
        for (let i = 2; i < this.thanran.length; i++) {
            if (this.thanran[0].x === this.thanran[i].x && this.thanran[0].y === this.thanran[i].y) {
                clearInterval(check)
                alert('Game Over điểm số của bạn là : ' + score)
            }
            if (checkhuong.x === 1 && this.thanran[0].x === this.thanran[i].x - ovuong && this.thanran[0].y === this.thanran[i].y) {
                ketthucmp3.play()
            }
            if (checkhuong.x === -1 && this.thanran[0].x === this.thanran[i].x + ovuong && this.thanran[0].y === this.thanran[i].y) {
                ketthucmp3.play()
            }
            if (checkhuong.y === 1 && this.thanran[0].x === this.thanran[i].x && this.thanran[0].y === this.thanran[i].y - ovuong) {
                ketthucmp3.play()
            }
            if (checkhuong.y === -1 && this.thanran[0].x === this.thanran[i].x && this.thanran[0].y === this.thanran[i].y + 20) {
                ketthucmp3.play()
            }
        }
    }

    checkVaCham(thucan) {
        return thucan.x === this.thanran[0].x && thucan.y === this.thanran[0].y;
    }

    tangThanRan() {
        this.xoaRan()
        let a = this.thanran[this.thanran.length - 1].x - this.thanran[this.thanran.length - 2].x;
        let b = this.thanran[this.thanran.length - 1].y - this.thanran[this.thanran.length - 2].y;
        let duoiran = new Toado(
            this.thanran[this.thanran.length - 1].x + a,
            this.thanran[this.thanran.length - 1].y + b,
        )
        this.thanran.push(duoiran)
        this.veRan()
    }
}
class Thucan {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    veThucAn() {
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.x, this.y, ovuong - 2, ovuong - 2);
    }

    xoaThucAn() {
        ctx.fillStyle = 'black'
        ctx.fillRect(this.x, this.y, ovuong - 2, ovuong - 2);
    }

    randomNumber() {
        let number = Math.floor(Math.random() * canvas.width)
         number -= number % ovuong
        return number
    }

    xuatHienThucAn(ranchu,ranmoi) {
        console.log('goi dk ham ko')
        this.xoaThucAn()
        this.x = this.randomNumber();
        this.y = this.randomNumber();
        console.log('ranchu.length=================>', ranchu.thanran.length)
        console.log('this.x', this.x)
        console.log('this.y', this.y)
        for (let i = 0; i < ranchu.thanran.length; i++) {
            console.log('i ================ ', i)
            if(this.x!==ranchu.thanran[i].x||this.y!==ranchu.thanran[i].y){

                this.veThucAn()
            } else {
                this.x = this.randomNumber();
                this.y = this.randomNumber();
            }
        }
    }
}
let ranchu = new Snake()
ranchu.veRan()
let thucan = new Thucan();
thucan.xuatHienThucAn(ranchu)
let score = 0;
let check = setInterval(() => {
    ranchu.diChuyen()
    console.log('ranchu', ranchu)
    if (ranchu.checkVaCham(thucan)) {
        dopmoimp3.play()
        ranchu.tangThanRan()
        thucan.xuatHienThucAn(ranchu)
        score++;
        document.getElementById('myScore').value =  score;
    }
}, 100);
function resetGame() {
    window.location.reload();
}
// document.onkeydown = function (e) {
//     switch (e.keyCode) {
//         case 37:
//             if (checkhuong.x === 1) break;
//             ranchu.tocdo = new Toado(-1, 0)
//             checkhuong = new Toado(-1, 0)
//             // setTimeout(function (e),100)
//             break;
//         case 38:
//             if (checkhuong.y === 1) break;
//             ranchu.tocdo = new Toado(0, -1)
//             checkhuong = new Toado(0, -1)
//             break;
//         case 39:
//             if (checkhuong.x === -1) break;
//             ranchu.tocdo = new Toado(1, 0)
//             checkhuong = new Toado(1, 0)
//             break;
//         case 40:
//             if (checkhuong.y === -1) break;
//             ranchu.tocdo = new Toado(0, 1)
//             checkhuong = new Toado(0, 1)
//             break;
//     }
//
// }
// function moveSlack(evt) {
//     switch (evt.keyCode) {
//         case 37:
//             if (checkhuong.x === 1) break;
//             ranchu.tocdo = new Toado(-1, 0)
//             checkhuong = new Toado(-1, 0)
//             // setTimeout(function (e),100)
//             break;
//         case 38:
//             if (checkhuong.y === 1) break;
//             ranchu.tocdo = new Toado(0, -1)
//             checkhuong = new Toado(0, -1)
//             break;
//         case 39:
//             if (checkhuong.x === -1) break;
//             ranchu.tocdo = new Toado(1, 0)
//             checkhuong = new Toado(1, 0)
//             break;
//         case 40:
//             if (checkhuong.y === -1) break;
//             ranchu.tocdo = new Toado(0, 1)
//             checkhuong = new Toado(0, 1)
//             break;
//     }
// }
//     addEventListener('keydown', moveSlack)
// setTimeout(moveSlack,100)


//tao fun di chuyen sẽ kết hợp với biến vận tốc //

window.addEventListener("keydown", (function (canMove) {
    return function (event) {
        if (!canMove) return false;
        canMove = false;
        setTimeout(function () {
            canMove = true;
        }, 100);
        switch (event.keyCode) {
            case 39:
                if (checkhuong.x === -1) break;
                ranchu.tocdo = new Toado(1, 0)
                checkhuong = new Toado(1, 0)
                break;
            case 40:
                if (checkhuong.y === -1) break;
                ranchu.tocdo = new Toado(0, 1)
                checkhuong = new Toado(0, 1)
                break;
            case 37:
                if (checkhuong.x === 1) break;
                ranchu.tocdo = new Toado(-1, 0)
                checkhuong = new Toado(-1, 0)
                break
            case 38:
                if (checkhuong.y === 1) break;
                ranchu.tocdo = new Toado(0, -1)
                checkhuong = new Toado(0, -1)
                break;
        }
    };
})(true), false);


