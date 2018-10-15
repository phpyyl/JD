window.onload = function(){
	var banner = document.querySelector(".banner");
	var ul = document.querySelector(".banner>ul");//就是ul
	ul.style.transition = "all 1s";	//ul的变化需要弹性效果（就是渐变）
	var bannerWidth = banner.clientWidth;//获得banner的宽度，其实就是屏幕宽
	var posX1 = posX2 = 0;	//初始化触摸点的起始和结束位置的x坐标
	var index = 1;	//默认图片位置（图片号），从0-7
	var timer1 = null;
	banner.addEventListener("touchstart",function(ev){
		//初始触摸的时候的x坐标
		posX1 = ev.changedTouches[0].clientX;
		//触摸开始，定时器也应该停止：
		window.clearInterval(timer1)
	});
	banner.addEventListener("touchmove",function(ev){
		//这里用于实现手指触摸过程中（类似拖动）的效果
		posX2 = ev.changedTouches[0].clientX;	//过程中的x坐标
		var distance = posX2 - posX1;	//拖动的距离，往左是负的，往右是正的
		//当前ul停留的位置是：- index * bannerWidth
		//则移动中的新的位置就是：
		translateX = -index * bannerWidth + distance;
		ul.style.transform = "translateX(" + translateX + "px)";

	});
	banner.addEventListener("touchend",function(ev){
		//触摸结束的时候的x坐标
		posX2 = ev.changedTouches[0].clientX;
		var distance = posX2 - posX1 ;//两个点的x坐标差
		//通常认为，移动距离超过50px，是一个明确的滑动过程
		if (distance > 50) {//这是属于往右划
			index--;
			if(index < 0){
				index = 8;
			}
			//var baifenbi = - 12.5 * index;	//这是计算百分比的移动
			//ul.style.transform = "translateX(" + baifenbi + "px)";
			var translateX = - bannerWidth * index;//这是要移动的像素
			ul.style.transform = "translateX(" + translateX + "px)";
		}
		else if(distance < -50) {//这是属于往左划
			//此时，就需要将ul盒子的translateX值变得更小
			index++;
			if(index >= 10){
				index = 1;
			}
			//var baifenbi = - 12.5 * index;	//这是计算百分比的移动
			//ul.style.transform = "translateX(" + baifenbi + "px)";
			var translateX = - bannerWidth * index;//这是要移动的像素
			ul.style.transform = "translateX(" + translateX + "px)";
		}
		else{
			//这里，表示touch触摸的距离不足，就不移动！
			var translateX = - bannerWidth * index;//这是要移动的像素
			ul.style.transform = "translateX(" + translateX + "px)";
		}
		ul.style.transition = "all 1s";
		//触摸结束，重新启动定时器。
		timer1 = window.setInterval(autoPlay, 2000);
	});

	//ul变换结束后，触发该事件！
	ul.addEventListener("transitionend",function(){
		if(index == 9){//这是指最后一张图（实际上是图8后面的图1）
			ul.style.transition = "none";//
			index = 1;
			var translateX = - bannerWidth * index;//这是要移动的像素
			ul.style.transform = "translateX(" + translateX + "px)";
		}
		else if(index == 0){//这是指第一张图（实际上是图1前面的图8）
			ul.style.transition = "none";
			index = 8;
			var translateX = - bannerWidth * index;//这是要移动的像素
			ul.style.transform = "translateX(" + translateX + "px)";
		}
	});
	function autoPlay(){
		ul.style.transition = "all 1s";
		index++;
		if(index >= 10){
			index = 1;
		}
		translateX = -index * bannerWidth;
		ul.style.transform = "translateX(" + translateX + "px)";
	}
	//启动一个定时器，来实现“自动切换”
	timer1 = window.setInterval(autoPlay, 2000);

}