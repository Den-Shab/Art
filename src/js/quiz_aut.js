let playedAut = [0,0,0,0,0,0];
let countGoodAut = ["","","","","",""];

function setBorderColor(Quiz,var0){
    if (Number(var0.id[var0.id.length-1])-1 == Quiz.correct){
        Quiz.rightAnswers +=1;
        var0.style.outline = '6px solid green'
    }
    else{
        var0.style.outline = '6px solid red';
    }
}
function clean2(Quiz){
    Quiz.category = 0;
    Quiz.order = 0;
    Quiz.pics = [[],[],[],[],[],[],[],[],[],[]];
    Quiz.rightAnswers = 0;
    Quiz.correct = 0;
}
function getBetwPopUpAut(pic1,pic2,pic3,pic4,category,popup,quest){
    const i = popup.querySelector('img');
    i.style.width = '70%';
    i.style.height = 'auto';
    let p = [pic1,pic2,pic3,pic4];
    popup.style.display = 'block';
    popup.firstChild.innerHTML = `The correct answer is: <br>`;
    i.src = p[AutQuiz.correct].src;
    if (AutQuiz.order == 0){
        popup.lastChild.addEventListener("click", function next(){
            popup.style.display = 'none';
            if (AutQuiz.order != 9){
                AutQuiz.order +=1;
                setAuthorAndPictures(pic1,pic2,pic3,pic4,category,popup,quest);
            }
            else{
                popup.lastChild.removeEventListener('click',next);
                popup.innerHTML = `<h3>YOUR RESULT IS:<br>${AutQuiz.rightAnswers}/10</h3><a href='#/artists' id='finish'><div class='next'><p>finish</p></div></a>`;
                popup.style.height='200px';
                popup.style.display ='block';
                popup.style.top = '150px';
                playedAut[AutQuiz.category] = 1;
                countGoodAut[AutQuiz.category] = ` ${AutQuiz.rightAnswers}/10`
                clean2(AutQuiz);
            }
        });
    }
}

function randomNumber2(Quiz){
    for(let j =1; j<4;++j){
        let x = 1;
        while (x){
            y = Math.floor(Math.random()*244);
            if (Quiz.pics[Quiz.order].indexOf(y)==-1)
            {
                let k = 1;
                for (let i=0; i<Quiz.pics[Quiz.order].length;++i){
                    if(images[Quiz.pics[Quiz.order][i]].author == images[y].author){
                        k=0;
                    }
                }
                if (k==1){
                    Quiz.pics[Quiz.order].push(y);
                    x=0;
                }
            }
        }
    }
}

class AQuiz {
    category = 0;
    order = 0;
    array = [[4,30,37,46,66,74,78,90,91,102],[10,23,49,56,61,65,70,83,98,101],[8,11,13,15,21,38,39,44,60,76],[1,57,60,114,117,118,134,140,148,163],[22,31,43,64,96,112,132,202,225,237],[18,86,97,105,110,153,241,242,243,244]];
    pics = [[],[],[],[],[],[],[],[],[],[]];
    rightAnswers = 0;
    correct = 0;
}
let AutQuiz = new AQuiz();


let setAuthorAndPictures = function(pic1,pic2,pic3,pic4,category,popup,quest){
    AutQuiz.category = category;
    pic1.style.outline='0px';
    pic2.style.outline='0px';
    pic3.style.outline='0px';
    pic4.style.outline='0px';
    quest.innerHTML = `У какой картины автор:<br>${images[AutQuiz.array[category][AutQuiz.order]].author}`;
    AutQuiz.pics[AutQuiz.order][0] = AutQuiz.array[category][AutQuiz.order];
    randomNumber2(AutQuiz);
    let variants = oneInFour();
    pic1.src = `assets/img/${AutQuiz.pics[AutQuiz.order][variants[0]]}.jpg`;
    pic2.src = `assets/img/${AutQuiz.pics[AutQuiz.order][variants[1]]}.jpg`;
    pic3.src = `assets/img/${AutQuiz.pics[AutQuiz.order][variants[2]]}.jpg`;
    pic4.src = `assets/img/${AutQuiz.pics[AutQuiz.order][variants[3]]}.jpg`;
    AutQuiz.correct = variants.indexOf(0);
    if (AutQuiz.order == 0){
        let pics = [pic1,pic2,pic3,pic4];
        for (var i = 0; i <4;++i){
             pics[i].addEventListener('click',function funct(e){
                setBorderColor(AutQuiz,e.target);
                setTimeout(() => {getBetwPopUpAut(pic1,pic2,pic3,pic4,category,popup,quest);}, 1000);
             })
        }
    }
}