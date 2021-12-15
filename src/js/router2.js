
const footer = document.querySelector('footer');

(function (){
    const appDiv = "app";

    
    let routes = {};
    let templates = {};

    let createDiv = (id, xmlString) => {
        let d = document.createElement('div');
        d.id = id;
        d.innerHTML = xmlString;
        return d;
    };


    let template = (name, templateFunction) => {
      return templates[name] = templateFunction;
    };

    
    let route = (path, template) => {
        if (typeof template == "function") {
          return routes[path] = template;
        }
        else if (typeof template == "string") {
          return routes[path] = templates[template];
        }
        else {
          return;
        }
    };

    
    let resolveRoute = (route) => {
        try {
         return routes[route];
        } catch (error) {
            throw new Error("The route is not defined");
        }
    };

  
    let router = (evt) => {
        const url =window.location.hash.slice(1) || "/";
        const routeResolved = resolveRoute(url);
        templates[routeResolved()];
    };

    let createLink = (title, text, href) => {
        let a = document.createElement('a');
        let linkText = document.createTextNode(text);
        a.appendChild(linkText);
        a.title = title;
        a.href = href;
        return a;
    };

    template('home-view', () => {
        footer.style.display="flex";
        let myDiv = document.getElementById(appDiv);
        myDiv.innerHTML = "";
        const sett = createDiv('sett', "<a href='#/settings'><img src='assets/home/carbon_settings.svg'></a>");
        const mainDiv = createDiv('main-home', "");
        const logo = createDiv('logo', "<img src='assets/home/logo.svg'>");
        const buttons =  createDiv('home-buttons', "<a class='home_button'  href='#/artists'>Artists quiz</a><a class='home_button' href='#/pics'>Pictures quiz</a><form action='user.php' method='POST'><input type='text' name='Pic' style='display:none'/><input type='submit' value='Gallery' class='mainSubmit'> </form>");
        myDiv.appendChild(sett);
        myDiv.appendChild(mainDiv);
        mainDiv.appendChild(logo);
        return  mainDiv.appendChild(buttons);
    });

    template('settings-view', () => {
        footer.style.display="none";
        document.body.style.backgroundImage = '';
        let myDiv = document.getElementById(appDiv);
        myDiv.innerHTML = "";
        let x;
        if(localStorage.getItem('value')) {
            x = localStorage.getItem('value');
        }
        else{
            x = '0';
        }
        const header = createDiv('settHeader', "<a href='#/' id='backToHome'><img src='assets/set/Vector.svg'></a><p>Settings</p>");
        const mainSett  = createDiv('settMain', "");
        const settVol = createDiv('settVol', "<h3>Volume</h3><div><input type='range' value=`${x}`  max='100' id='volLoud'></div><div id ='volIcons'><img src='assets/set/bi_volume-mute.svg'><img src='assets/set/bi_volume-down.svg'></div>");
        const settTime = createDiv('settTime',"<h3>Time game</h3><div id='radio_btns'><div class='form_radio_btn'><input id='radio-1' type='radio' name='radio' value='1' checked><label for='radio-1'>With time</label></div><div class='form_radio_btn'><input id='radio-2' type='radio' name='radio' value='2'><label for='radio-2'>Without time</label></div></div>");
        const settTimeAnsw = createDiv('settTimeAnsw',"<h3>Time to answer</h3><div id='calc-box'><button type='button' onclick='this.nextElementSibling.stepDown()'>−</button><input type='number' min='5' max='30' value='30' step='5' readonly class='number'><button type='button' onclick='this.previousElementSibling.stepUp()'>+</button></div>");
        mainSett.appendChild(settVol);
        mainSett.appendChild(settTime);
        mainSett.appendChild(settTimeAnsw);
        myDiv.appendChild(header);
        myDiv.appendChild(mainSett);
        const volLine = document.getElementById("volLoud");
        const setTimeAnsw = document.getElementById("settTimeAnsw");
        const timeBtn1 = document.getElementById("radio-1");
        const timeBtn2 = document.getElementById("radio-2");
        timeBtn1.addEventListener("click", () => {
            setTimeAnsw.style.display = "block";
        });
        timeBtn2.addEventListener("click", () => {
            setTimeAnsw.style.display = "none";
        });
        volLine.value = audio.volume*100;
        volLine.addEventListener("change",() => {
            audio.volume = volLine.value/100;
            localStorage.setItem('value', volLine.value);
            audio.play();
        });
    });

    template('artists-category', () => {
        footer.style.display="none";
        document.body.style.backgroundImage = '';
        let myDiv = document.getElementById(appDiv);
        myDiv.innerHTML = "";
        const logo = createDiv('logo2', "<img src='assets/home/logo.svg'><a href='#/'>Home</a>");
        const div1 = createDiv('cat', "<h3>Categories</h3>");
        const mainCategories = createDiv('mainCatArtists', "");
        const cat1 = createDiv('cat1',"<p>Portraits</p><a href='#/art-quest0'><img src='assets/categories/Portraits'></a>");
        const cat2 = createDiv('cat2',"<p>Landscapes</p><a href='#/art-quest1'><img src='assets/categories/Landscapes'></a>");
        const cat3 = createDiv('cat3',"<p>Still life</p><a href='#/art-quest2'><img src='assets/categories/Still_life'></a>");
        const cat4 = createDiv('cat4',"<p>Impressionism</p><a href='#/art-quest3'><img src='assets/categories/Impressionism'></a>");
        const cat5 = createDiv('cat5',"<p>Expressionism</p><a href='#/art-quest4'><img src='assets/categories/Expressionism'></a>");
        const cat6 = createDiv('cat6',"<p>Avant-garde</p><a href='#/art-quest5'><img src='assets/categories/Avant-garde'></a>");
        const i1 = cat1.querySelector('img');
        const i2 = cat2.querySelector('img');
        const i3 = cat3.querySelector('img');
        const i4 = cat4.querySelector('img');
        const i5 = cat5.querySelector('img');
        const i6 = cat6.querySelector('img');
        i1.src = i1.src + String(playedAut[0]) + '.png';
        i2.src = i2.src + String(playedAut[1]) + '.png';
        i3.src = i3.src + String(playedAut[2]) + '.png';
        i4.src = i4.src + String(playedAut[3]) + '.png';
        i5.src = i5.src + String(playedAut[4]) + '.png';
        i6.src = i6.src + String(playedAut[5]) + '.png';
        cat1.firstChild.innerHTML = "Portraits" + countGoodAut[0];
        cat2.firstChild.innerHTML = "Landscapes" + countGoodAut[1];
        cat3.firstChild.innerHTML = "Still life" + countGoodAut[2];
        cat4.firstChild.innerHTML = "Impressionism" + countGoodAut[3];
        cat5.firstChild.innerHTML = "Expressionism" + countGoodAut[4];
        cat6.firstChild.innerHTML = "Avant-garde" + countGoodAut[5];
        mainCategories.appendChild(cat1);
        mainCategories.appendChild(cat2);
        mainCategories.appendChild(cat3);
        mainCategories.appendChild(cat4);
        mainCategories.appendChild(cat5);
        mainCategories.appendChild(cat6);
        myDiv.appendChild(logo);
        myDiv.appendChild(mainCategories); 
    });

    template('pics-category', () => {
        footer.style.display="none";
        document.body.style.backgroundImage = '';
        let myDiv = document.getElementById(appDiv);
        myDiv.innerHTML = "";
        const logo = createDiv('logo2', "<img src='assets/home/logo.svg'><a href='#/'>Home</a>");
        const div1 = createDiv('cat', "<h3>Categories</h3>");
        const mainCategories = createDiv('mainCatArtists', "");
        const cat1 = createDiv('cat1',"<p>Portraits</p><a href='#/pics-quest0'><img src='assets/categories/Portraits'></a>");
        const cat2 = createDiv('cat2',"<p>Landscapes</p><a href='#/pics-quest1'><img src='assets/categories/Landscapes'></a>");
        const cat3 = createDiv('cat3',"<p>Still life</p><a href='#/pics-quest2'><img src='assets/categories/Still_life'></a>");
        const cat4 = createDiv('cat4',"<p>Impressionism</p><a href='#/pics-quest3'><img src='assets/categories/Impressionism'></a>");
        const cat5 = createDiv('cat5',"<p>Expressionism</p><a href='#/pics-quest4'><img src='assets/categories/Expressionism'></a>");
        const cat6 = createDiv('cat6',"<p>Avant-garde</p><a href='#/pics-quest5'><img src='assets/categories/Avant-garde'></a>");
        const i1 = cat1.querySelector('img');
        const i2 = cat2.querySelector('img');
        const i3 = cat3.querySelector('img');
        const i4 = cat4.querySelector('img');
        const i5 = cat5.querySelector('img');
        const i6 = cat6.querySelector('img');
        i1.src = i1.src + String(playedPics[0]) + '.png';
        i2.src = i2.src + String(playedPics[1]) + '.png';
        i3.src = i3.src + String(playedPics[2]) + '.png';
        i4.src = i4.src + String(playedPics[3]) + '.png';
        i5.src = i5.src + String(playedPics[4]) + '.png';
        i6.src = i6.src + String(playedPics[5]) + '.png';
        cat1.firstChild.innerHTML = "Portraits" + countGoodPics[0];
        cat2.firstChild.innerHTML = "Landscapes" + countGoodPics[1];
        cat3.firstChild.innerHTML = "Still life" + countGoodPics[2];
        cat4.firstChild.innerHTML = "Impressionism" + countGoodPics[3];
        cat5.firstChild.innerHTML = "Expressionism" + countGoodPics[4];
        cat6.firstChild.innerHTML = "Avant-garde" + countGoodPics[5];
        mainCategories.appendChild(cat1);
        mainCategories.appendChild(cat2);
        mainCategories.appendChild(cat3);
        mainCategories.appendChild(cat4);
        mainCategories.appendChild(cat5);
        mainCategories.appendChild(cat6);
        myDiv.appendChild(logo);
        myDiv.appendChild(mainCategories); 
    });
    template('pics-questions', () => {
        footer.style.display="none";
        document.body.style.backgroundImage = '';
        let myDiv = document.getElementById(appDiv);
        myDiv.innerHTML = "";
        const header = createDiv('question-pic', "<a href='#/pics' id='backToHome'><img src='assets/set/Vector.svg'></a><h3>Who is the author of this picture?</h3>");
        const main = createDiv('main_pic_quiz', "<img scr='' id='ImgQuizPic'><div id='popup_pics' class='popup'><h3></h3><div class='next'><p>next</p></div></div>");
        const fourVariants = createDiv('fourVariantsPic', "");
        const firstVar = createDiv('var1',"");
        const secondVar = createDiv('var2',"");
        const thirdVar = createDiv('var3',"");
        const fourthVar = createDiv('var4',"");
        fourVariants.appendChild(firstVar);
        fourVariants.appendChild(secondVar);
        fourVariants.appendChild(thirdVar);
        fourVariants.appendChild(fourthVar);
        myDiv.appendChild(header);
        main.appendChild(fourVariants);
        myDiv.appendChild(main);
        const img = document.getElementById('ImgQuizPic');
        const var1 = document.getElementById('var1');
        const var2 = document.getElementById('var2');
        const var3 = document.getElementById('var3');
        const var4 = document.getElementById('var4');
        const popup = document.getElementById('popup_pics');
        let category = window.location.hash[window.location.hash.length-1];
        category = Number(category);
        const back = document.getElementById('backToHome');
        back.addEventListener('click', () =>{
            clean(Quiz);
        })
        setPicsAndVariants(var1,var2,var3,var4,img,category,popup);
    });
    template('artists-questions', () => {
        footer.style.display="none";
        document.body.style.backgroundImage = '';
        let myDiv = document.getElementById(appDiv);
        myDiv.innerHTML = "";
        const header = createDiv('question-pic', "<a href='#/artists' id='backToHome'><img src='assets/set/Vector.svg'></a><p id='question'></p><div id='popup_pics' class='popup popup2'><h3></h3><img src=''><div class='next'><p>next</p></div></div>");
        const main = createDiv('main_aut_quiz', "");
        const fourVariants = createDiv('fourVariantsArt', "");
        const firstVar = createDiv('p1',"<img src='' id='pic1'>");
        const secondVar = createDiv('p2',"<img src='' id='pic2'>");
        const thirdVar = createDiv('p3',"<img src='' id='pic3'>");
        const fourthVar = createDiv('p4',"<img src='' id='pic4'>");
        fourVariants.appendChild(firstVar);
        fourVariants.appendChild(secondVar);
        fourVariants.appendChild(thirdVar);
        fourVariants.appendChild(fourthVar);
        myDiv.appendChild(header);
        main.appendChild(fourVariants);
        myDiv.appendChild(main);
        const pic1 = document.getElementById('pic1');
        const pic2 = document.getElementById('pic2');
        const pic3 = document.getElementById('pic3');
        const pic4 = document.getElementById('pic4');
        const popup = document.getElementById('popup_pics');
        const quest = document.getElementById('question');
        let category = window.location.hash[window.location.hash.length-1];
        category = Number(category);
        const back = document.getElementById('backToHome');
        back.addEventListener('click', () =>{
            clean(AutQuiz);
        })
        setAuthorAndPictures(pic1,pic2,pic3,pic4,category,popup,quest);
    });
    template('ap', () => {
        footer.style.display="none";
        let myDiv = document.getElementById(appDiv);
        myDiv.innerHTML = "";
        const header = createDiv('header-ap', "<h1>Pictures</h1>");
        const main = createDiv('main-ap', "");
        myDiv.appendChild(header);
        myDiv.appendChild(main);
    })
    route("/",'home-view');
    route('/settings', 'settings-view');
    route('/artists', 'artists-category');
    route('/pics', 'pics-category');
    route('/pics-quest0', 'pics-questions');
    route('/pics-quest1', 'pics-questions');
    route('/pics-quest2', 'pics-questions');
    route('/pics-quest3', 'pics-questions');
    route('/pics-quest4', 'pics-questions');
    route('/pics-quest5', 'pics-questions');
    route('/art-quest0', 'artists-questions');
    route('/art-quest1', 'artists-questions');
    route('/art-quest2', 'artists-questions');
    route('/art-quest3', 'artists-questions');
    route('/art-quest4', 'artists-questions');
    route('/art-quest5', 'artists-questions');
    route('/all_pics', 'ap');
    window.addEventListener('load', router);
    window.addEventListener('hashchange', router);
})()