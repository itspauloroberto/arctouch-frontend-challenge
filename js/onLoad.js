function setupSlider(){
	var slider = document.getElementById('mySlider');
	slider.slide({
		animationEffect: 'ease',
		animationDuration: '0.3s',
		autoRotate: true,
		rotateEverySeconds: 4,
		navigation: true,
		stopWhenInteract: true,
		cropHeight: 200,
		cropWidth: 'auto'
	});
}