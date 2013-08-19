/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
$.browser = {msie: (navigator.appName === "Microsoft Internet Explorer")};
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);
jQuery(document).ready(function($) { 
	var tabs = function() { 
		var dur = { 'superlong': 1000, 'long': 575, 'medium': 400, 'short': 350 }; 
		var context = false; 
		var tablinks = [];
		var currenttab = false; var currentlink = false; var tabcontainer = false; 
		function init() { 
			gettablinks();  
			$(window).hashchange(function(e){
				if(currenttab != location.hash) { 
					gototab(location.hash.substring(1,location.hash.length)); 
					makelinkactive(location.hash); 
				} else { 
					return false; 
				}
			}); 
			$('.tablink').on('click',function() {

				// foundation sub-nav hack:  
				$('.tablink').each(function() { $(this.parentNode).removeClass('active'); }); 
				$(this.parentNode).addClass('active'); 
				// end foundation sub-nav hack

				if($(this).hasClass('activetab')) { 
					// $(this.parentNode)
					var initialheight = tabcontainer.offsetHeight; 
					currenttab.style.display="none"; 
					var finalheight = tabcontainer.offsetHeight; 
					currenttab.style.display=""; 
					tabcontainer.style.height = initialheight + "px"; 
					$(currenttab).stop(true,true).animate({"left":"-100%","opacity":0},dur.medium,'easeInOutExpo',function() { 
						this.style.display='none'; 
						$(tabcontainer).animate({"height":finalheight+"px"}, dur.superlong, 'easeInOutExpo', function() { 
							tabcontainer.style.height = 'auto'; 
						}); 
					}); 
					$(this).removeClass('activetab'); 
					location.hash = ""; 
					return false; 
				} else { 
					if(this.getAttribute('rel')) { 
						context = document.getElementById(this.getAttribute('rel')); 
					} 
				}
			}); 
			if(location.hash=="" || location.hash=="#") {
				location.hash = tablinks[0].getAttribute('href'); 
			} else { 
				var timer = window.setTimeout(function() { 
					gototab(location.hash.substring(1,location.hash.length)); 
					makelinkactive(location.hash); 
				}, 450); 
			} 
		} 
		function gototab(tabid) { 
			if(document.getElementById(tabid)) { 
				if(context==false) { 
					var newtab = document.getElementById(tabid); 
				} else { 
					var children = (context.children);
					for(var i=0; i < children.length; ++i) { 
						// console.log(children[i]); 
					} 
					var newtab = document.getElementById(tabid); 
				}
				if(currenttab==false) { 
					$(newtab).stop(true,true).css({"display":"","position":"relative","left":"100%","opacity":0}).animate({"left":"0%","opacity":1},dur.medium,'easeInOutExpo',function() { 

					}); 
				} else {
					$(currenttab).stop(true,true).animate({"left":"-100%","opacity":0},dur.medium,'easeInOutExpo',function() { 
						this.style.display="none";
						$(newtab).css({"display":"","position":"relative","left":"100%","opacity":0}).animate({"left":"0%","opacity":1},dur.long,'easeInOutExpo',function() { 

						}); 
					}); 
				}
				currenttab = newtab; 
			}
		}
		function makelinkactive(hash) { 
			$(tablinks).each(function() { 
				$(this.parentNode).removeClass('active'); 
			}); 
			for(var i=0; i < tablinks.length; ++i) { 
				if(tablinks[i].getAttribute('href')==hash) { 
					if($(tablinks[i]).hasClass('activetab')) { 
						$(tablinks[i]).removeClass('activetab'); 
						$(tablinks[i].parentNode).removeClass('active'); 
					} else { 
						$(tablinks[i]).addClass('activetab'); 
						$(tablinks[i].parentNode).addClass('active'); 
						if(currentlink!=false) { 
							$(currentlink).removeClass('activetab'); 
						}
						currentlink = tablinks[i]; 
					}
				}
			}
		}
		function gettablinks() { 
			var allLinks = document.getElementsByTagName('a'); 
			for(var i=0; i < allLinks.length; ++i) { 
				if(allLinks[i].getAttribute('class')) {
					if(allLinks[i].getAttribute('class').indexOf('tablink')>-1) { 
						if(tabcontainer==false) { 
							tabcontainer = document.getElementById(allLinks[i].getAttribute('href').substring(1,allLinks[i].getAttribute('href').length)).parentNode; 
							tabcontainer.style.overflow = "hidden"; 
						}
						tablinks.push(allLinks[i]); 
					} 
				}
			}
		}
		init();
	}(); 
}); 