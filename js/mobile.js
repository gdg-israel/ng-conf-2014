/**
 * Created by oshrikdoshim on 5/24/14.
 */


(function(window, document){


	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

		var maxScroll = Math.max( document.body.scrollHeight, document.body.offsetHeight,
			document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight ) - 1300;


		var shareMobileDom = document.getElementsByClassName('share-on-mobile-modal')[0];

		var homeSection = document.getElementsByClassName('home-section')[0];

		var video = homeSection.getElementsByTagName('video')[0];
		video.style.visibility="hidden";

		homeSection.style.backgroundImage="url('/images/poster.jpg')";

		window.addEventListener("scroll", function() {



			if(document.body.scrollTop >= maxScroll){
				shareMobileDom.style.top='110px';
			}else if(document.body.scrollTop <= maxScroll){
				shareMobileDom.style.top='-90px';
			}


		});

	}



})(window, document);
