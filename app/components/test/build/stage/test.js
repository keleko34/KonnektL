function test()
{
  this.yay = "yay";
}

test.prototype.test = function(){

};

test.prototype.k_html = "<div something = 'something'>{{yay}}</div>";
test.prototype.k_css = ".test {}";
