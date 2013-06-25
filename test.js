function Test(){
    this.a = 0;

    this.callA = function(){
        if(this.a>2)
            return;
        alert(this.a);
        this.a++;
    };
    
    this.call = function(){
        tmp = this;
        setInterval("tmp.callA()", 100);
    };
}

var test = new Test();
test.call();

