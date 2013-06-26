function Welcome(){
    $("body").css("background-color", "#CFCFB4");
    this.div = document.createElement("div");
    this.div.className = "welDiv";


    this.title = document.createElement("p");
    this.title.innerHTML = "JGo";
    this.title.className = "welTitle";

    this.form = document.createElement("form"); 
    this.form.className = "welFrom form-inline";
    
    this.nameInput1 = document.createElement("input");
    this.nameInput1.type = "text";
    this.nameInput1.id = "player1";
    this.nameInput1.placeholder="Player1 Name";
    this.nameInput1.className = "welInput";

    this.nameInput2 = document.createElement("input");
    this.nameInput2.type = "text";
    this.nameInput2.id = "player2";
    this.nameInput2.placeholder="Player2 Name";
    this.nameInput2.className = "welInput";
    
    this.form.appendChild(this.nameInput1);
    this.form.appendChild(this.nameInput2);
    $(this.form).css("padding-left", "800px");
    $(this.form).css("opacity", "0");

    this.enterBtn = document.createElement("a");
    this.enterBtn.innerHTML = "Enter";
    this.enterBtn.href = "#";
    this.enterBtn.className = "welBtn button button-circle button-flat-highlight";
    $(this.enterBtn).hide();

    //$("body").append(this.title);
    this.div.appendChild(this.title);
    this.div.appendChild(this.form);
    this.div.appendChild(this.enterBtn);
    $("body").append(this.div);

    this.showTitle = function(){
        $(".welTitle").css("font-size", "1px");
        $(".welTitle").animate({
            fontSize: '120px' 
        }, 1000);
    };
    setTimeout(this.showTitle, 0);

    this.showBtn = function(){
        $(".welBtn").fadeIn(1000);
    };
    setTimeout(this.showBtn, 1000);

    this.showForm = function(){
        $(".welFrom").animate({
            opacity: '1',
            paddingLeft: '0px'
        }, 1000);    
    };
    setTimeout(this.showForm, 2000);

    this.goAway = function(){
        if(document.getElementById("player1").value)
            NAMEPLAYER[0] = document.getElementById("player1").value;
        if(document.getElementById("player2").value)
            NAMEPLAYER[1] = document.getElementById("player2").value;

        $(".welDiv").animate({
            margin: '50px',
            opacity: '0'
        }, 1000);
        setTimeout("$('.welDiv').remove()", 1000);

        setTimeout("begin()", 1000);
    };

    this.enterBtn.addEventListener("click", this.goAway);
}


