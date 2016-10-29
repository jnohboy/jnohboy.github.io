var dom=document.getElementById('clock');
var ctx = dom.getContext('2d');
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
var ratio = width/300

function drawcircle(){
	ctx.save();//保存画之前的环境
	ctx.translate(r,r);
	ctx.beginPath(); //起始一条路径，或重置当前路径
	ctx.arc(0,0,r-5 * ratio,0,2*Math.PI,false); //画一个圆，false表示逆时针
	ctx.lineWidth = 6 * ratio;
	ctx.stroke(); //画出这条线
	
	var hourNumbers=[3,4,5,6,7,8,9,10,11,12,1,2,];
	ctx.font = 18 * ratio +'px Arial';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	hourNumbers.forEach(function(number,i){
		var rad = 2 * Math.PI/12*i;
		var x = Math.cos(rad)*(r-30* ratio);
		var y = Math.sin(rad)*(r-30* ratio);
		ctx.fillText(number, x, y);
	});
	for(var i = 0;i < 60; i++){
		var rad = 2 * Math.PI / 60 * i;
		var x = Math.cos(rad)*(r-18* ratio);
		var y = Math.sin(rad)*(r-18* ratio);
		ctx.beginPath();
		if(i % 5 == 0){
			ctx.fillStyle = '#000';
			ctx.arc(x,y,2* ratio,0,2*Math.PI,false);
		}else{
			ctx.fillStyle = '#CCC';
			ctx.arc(x,y,2* ratio,0,2*Math.PI,false);
		}
		ctx.fill();
	}
}
function drawHour(hour,minute){
	ctx.save();
	ctx.beginPath();
	var rad = 2 * Math.PI / 12 * hour;
	var mrad = 2 * Math.PI / 12 / 60 * minute;
	ctx.rotate(rad + mrad);
	ctx.moveTo(0,10* ratio) //时钟小尾巴
	ctx.lineCap = 'round';
	ctx.lineWidth = 6 * ratio;
	ctx.lineTo(0,-r / 2);//时针的长度
	ctx.stroke();//画出这条线
	ctx.restore();
}
function drawMinute(minute){
	ctx.save();
	ctx.beginPath();
	var rad = 2 * Math.PI / 60 * minute;
	ctx.rotate(rad);
	ctx.moveTo(0,10* ratio) //分针小尾巴
	ctx.lineCap = 'round';
	ctx.lineWidth = 3* ratio;
	ctx.lineTo(0,-r + 30* ratio);//分针的长度
	ctx.stroke();//画出这条线
	ctx.restore();
}
function drawSecond(second){
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = '#c14543';
	var rad = 2 * Math.PI / 60 * second;
	ctx.rotate(rad);
	ctx.moveTo(-2 * ratio,20* ratio);//秒针小尾巴
	ctx.lineTo(2* ratio,20* ratio);
	ctx.lineTo(1,-r + 18* ratio);
	ctx.lineTo(-1,-r + 18* ratio);
	ctx.fill();
	ctx.restore();
}
function drawDot(){
	ctx.beginPath();
	ctx.fillStyle = '#fff';
	ctx.arc(0,0,3* ratio,0,2 * Math.PI,false);
	ctx.fill();
}
function draw(){
	ctx.clearRect(0,0,width,height);
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	drawcircle();
	drawHour(hour,minute);
	drawMinute(minute);
	drawSecond(second);
	drawDot();
	ctx.restore();
}
draw();
setInterval(draw,1000);
