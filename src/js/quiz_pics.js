let playedPics = [0,0,0,0,0,0];
let countGoodPics = ["","","","","",""];
function setBGC(Quiz,var0){
    let x = Quiz.order; 
    if (var0.innerHTML == Quiz.authors[x][0]){
        Quiz.rightAnswers +=1;
        var0.style.backgroundColor = 'green';
    }
    else{
        var0.style.backgroundColor = 'red';
    }
}
function clean(Quiz){
    Quiz.category = 0;
    Quiz.order = 0;
    Quiz.authors = [[],[],[],[],[],[],[],[],[],[]];
    Quiz.rightAnswers = 0;
}
function getBetwPopUp(popup, Quiz,var1,var2,var3,var4,img,category){
    popup.style.display = 'block';
    popup.firstChild.innerHTML = `The correct answer is <br> ${Quiz.authors[Quiz.order][0]}`;
    if (Quiz.order == 0){
        popup.lastChild.addEventListener("click", function next(){
            popup.style.display = 'none';
            if (Quiz.order != 9){
                Quiz.order +=1;
                setPicsAndVariants(var1,var2,var3,var4,img,category,popup)
            }
            else{
                popup.lastChild.removeEventListener('click',next);
                popup.innerHTML = `<h3>YOUR RESULT IS:<br>${Quiz.rightAnswers}/10</h3><a href='#/pics' id='finish'><div class='next'><p>finish</p></div></a>`;
                popup.style.display ='block';
                playedPics[Quiz.category] = 1;
                countGoodPics[Quiz.category] = ` ${Quiz.rightAnswers}/10`
                clean(Quiz);
            }
        });
    }
}


function randomNumber(Quiz){
    for(let j =1; j<4;++j){
        let x = 1;
        while (x){
            y = images[Math.floor(Math.random()*244)].author;
            if (Quiz.authors[Quiz.order].indexOf(y)==-1)
            {
                Quiz.authors[Quiz.order].push(y);
                x=0;
            }
        }
    }
}

function oneInFour(){
    let x = [0,1,2,3];
    let fin = [];
    for (let i=0; i<4; i++){
        let y = Math.floor(Math.random()*x.length);
        fin.push(x[y]);
        x.splice(y,1);
    }
    return fin;
}
class PicQuiz {
    category = 0;
    order = 0;
    array = [[1,2,3,4,5,6,7,8,9,10],[10,23,49,56,61,65,70,83,98,101],[8,11,13,15,21,38,39,44,60,76],[1,57,60,114,117,118,134,140,148,163],[22,31,43,64,96,112,132,202,225,237],[18,86,97,105,110,153,241,242,243,244]];
    authors = [[],[],[],[],[],[],[],[],[],[]];
    rightAnswers = 0;
}
let Quiz = new PicQuiz();
let setPicsAndVariants = function(var1,var2,var3,var4,img,category,popup){
    Quiz.category = category;
    var1.style.backgroundColor = 'black';
    var2.style.backgroundColor = 'black';
    var3.style.backgroundColor = 'black';
    var4.style.backgroundColor = 'black';
    Quiz.authors[Quiz.order][0] = images[Quiz.array[category][Quiz.order]].author;
    img.src = `assets/pics_quiz/${category+1}/${Quiz.array[category][Quiz.order]}.jpg`;
    randomNumber(Quiz);
    let variants = oneInFour();
    var1.innerHTML = `${Quiz.authors[Quiz.order][variants[0]]}`;
    var2.innerHTML = `${Quiz.authors[Quiz.order][variants[1]]}`;
    var3.innerHTML = `${Quiz.authors[Quiz.order][variants[2]]}`;
    var4.innerHTML = `${Quiz.authors[Quiz.order][variants[3]]}`;
    if (Quiz.order == 0){
        let vars = [var1,var2,var3,var4];
        for (var i = 0; i <4;++i){
             vars[i].addEventListener('click',function funct(e){
                setBGC(Quiz,e.target);
                setTimeout(() => {getBetwPopUp(popup, Quiz,var1,var2,var3,var4,img,category);}, 1000);
             })
        }
    }
}
