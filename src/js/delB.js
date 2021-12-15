const DelAll = document.getElementById('DelAll');
const DelP = document.getElementById('DelPc');
const DelAllTables = document.getElementById('DelAllTables');

var c1 = 0;
var c2 = 0;
var c3 = 0;
DelAll.addEventListener('click', ()=>{
    $.ajax({
        url: 'delDatabase.php',
        type: 'POST',
        data: {m: ""},
        success: function(data)
        {
            console.log(data);
        },
        error: function(xhr, ajaxOptions, thrownError){
            alert(thrownError);
        }            
    });
    if(c1==0){
        alert("База удалена");  
    }
    c1++;
})  


DelP.addEventListener('click', ()=>{
    $.ajax({
        url: 'delPic.php',
        type: 'POST',
        data: {m: ""},
        success: function(data)
        {
            console.log(data);
        },
        error: function(xhr, ajaxOptions, thrownError){
            alert(thrownError);
        }            
    });
    if(c2==0 && c1==0){
        alert("Галерея очищена"); 
    }
    c2++;
})


DelAllTables.addEventListener('click', ()=>{
    $.ajax({
        url: 'delTables.php',
        type: 'POST',
        data: {m: ""},
        success: function(data)
        {
            console.log(data);
        },
        error: function(xhr, ajaxOptions, thrownError){
            alert(thrownError);
        }            
    });
    if(c1==0 && c3==0){
        alert("Таблицы очищены");  
    }
    c3++;
})  