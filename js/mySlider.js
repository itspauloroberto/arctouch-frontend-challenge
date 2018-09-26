Object.prototype.slide = function(options){
	var me = this,
		container = me.firstElementChild,
		totalSteps = container.childElementCount,
		step = 0,
		scrW = window.screen.width,
		fnSelectStep = function(s){
			var bullets = me.lastElementChild.children;
			[].forEach.call(bullets, function(e){e.className=''});
			bullets[s].className = 'active';
		},
		fnAnimate = function(s){
			var transX = (s * options.cropWidth);
			container.style.transform = 'translateX(-'+transX+'px)';
		},
		fnAutoAnimate = function(){
			var transX = container.style.transform,
				maxValue = (options.cropWidth * totalSteps),
				oldValue = Math.abs(parseInt(transX.split('(')[1])),
				newValue = ((oldValue + options.cropWidth) >= maxValue) ? 0 : (oldValue + options.cropWidth);
			(step === totalSteps-1) ? step=0 : step++;
			fnSelectStep(step);
			container.style.transform = 'translateX(-'+newValue+'px)';
		};
	if (options.autoRotate){
		var fnCycleManager = function(fl, fn, ms) {
   			if(fl)
     			autoCycle = setInterval(fn, ms);
			else
    			clearInterval(autoCycle);
    	},
    	fnStartCycle = function(){ fnCycleManager(true, fnAutoAnimate, (options.rotateEverySeconds*1000)) },
    	fnStopCycle = function(){ fnCycleManager(false); };
		
		fnStartCycle();
		me.addEventListener('mouseover', fnStopCycle);
		me.addEventListener('mouseout', fnStartCycle);
	}
	for (var i=0; i < totalSteps; i++){
		var s = document.createElement('span');
		s.onclick = (function(i) {
        return function () {
            fnSelectStep(i);
            fnAnimate(i);
        };
    	})(i);
		me.lastElementChild.append(s);
	}
	options.cropWidth = (options.cropWidth == 'auto' && scrW < 1080) ? scrW : 1080;
	fnSelectStep(step);
	me.lastElementChild.style.width = (20 * totalSteps)+'px';
	me.style.height = options.cropHeight+'px';
	container.style.width = (options.cropWidth * totalSteps)+'px';
	container.style.transform = 'translateX(0px)';
	container.style.transition = 'all '+options.animationDuration+' '+options.animationEffect;
}