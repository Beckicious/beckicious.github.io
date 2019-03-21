var i = 0;
var topZ = 0;
var frameOffset = 54;
var buttonOffset = 29;

$(document).ready(function() {
	
	$("#name").keyup(function(event){
    if(event.keyCode == 13){
        $("#butAddChannel").click();
    }
	});

	var colBackground = document.getElementById('colBackground');
	colBackground.addEventListener("change", colBackgroundChange, false);
	var colWindowEdge = document.getElementById('colWindowEdge');
	colWindowEdge.addEventListener("change", colWindowEdgeChange, false);

	var url = window.location.href;
	var param = url.split('?')[1];
	if (param) {
		createFromParam(param);
	}
});

function createFromParam(param) {
	var splitted = param.split('&');
	var colBG = splitted[0].split('=')[1];
	var colWE = splitted[1].split('=')[1];
	var streams = splitted[2].split('=')[1];
	var chats = splitted[3].split('=')[1];

	//background color
	$('#colBackground').val(colBG);
	var style = $('<style>#inner { background-color: ' + colBG + '; }</style>');
	$('html > head').append(style);

	//window edge color
	$('#colWindowEdge').val(colWE);
	var style = $('<style>.frame { background-color: ' + colWE + '; }</style>');
	$('html > head').append(style);

	//streams
	if (streams) {
		streams.split('_').forEach(function(stream) {
			if (stream) {
				var streamsplitted = stream.split(';');
				var channelName = streamsplitted[0];
				var top = parseInt(streamsplitted[1]);
				var left = parseInt(streamsplitted[2]);
				var height = parseInt(streamsplitted[3]);
				var width = parseInt(streamsplitted[4]);
				var z = parseInt(streamsplitted[5]);
				if (z > topZ) {
					topZ = z;
				}
				addStream(channelName,top,left,height,width,z);
			}
		});	
	}

	//chats
	if (chats) {
		chats.split('_').forEach(function(chat) {
			if (chat) {
				var chatsplitted = chat.split(';');
				var channelName = chatsplitted[0];
				var top = parseInt(chatsplitted[1]);
				var left = parseInt(chatsplitted[2]);
				var height = parseInt(chatsplitted[3]);
				var width = parseInt(chatsplitted[4]);
				var z = parseInt(chatsplitted[5]);
				if (z > topZ) {
					topZ = z;
				}
				addChat(channelName,top,left,height,width,z);
			}
		});	
	}
}

function colBackgroundChange(event) {
	var style = $('<style>#inner { background-color: '+event.target.value+'; }</style>');
	$('html > head').append(style);
	setPath();
}
function colWindowEdgeChange(event) {
	var style = $('<style>.frame { background-color: '+event.target.value+'; }</style>');
	$('html > head').append(style);
	setPath();
}

function addStreamFromButton() {
	var channelName = $("#name").val();
	var top = 50;
	var left = 10;
	var height = 400
	var width = height * 1.64;
	var topZ = topZ + 1;

	addStream(channelName, top, left, height, width, topZ);
	putToFront($("#field" + i-1 + "d"));
}

function addStream(channelName, top, left, height, width, z) {
	var frameheight = parseInt(height) + frameOffset;
	var framewidth = parseInt(width) + frameOffset;
	
	var buttonpos = width + buttonOffset;
	
	$("#inner").append(`
		<div id='field` + i + `d' 
			 class='frame stream' 
			 style='height:` + frameheight + `; 
				width:` + framewidth + `; 
				z-index:` + z + `'
			 onresize='resize(this)' 
			 onmouseenter='showFrame(this)'
			 onmouseleave='hideFrame(this)'
			 onmousedown='putToFront(this)'>
			 <label class='labelChannelName'>` + channelName + `</label>
			 <button class='end' style='left:` + buttonpos + `;' onclick='removeElement(this)'>✕</button>
			 <iframe class='twitchfield' 
				src='https://player.twitch.tv/?channel=` + channelName + `' 
				frameborder='0' 
				scrolling='no' 
				allowfullscreen='true'
				height='` + height + `' 
				width='` + width + `'>
			 </iframe>
			 <div class='iframeShield'></div>
		</div>
	`);
	$("#field" + i + "d").draggable({
		start: function () {
			$(".iframeShield").css('visibility', 'visible');
		},
		stop: function () {
			$(".iframeShield").css('visibility', 'hidden');
			setPath();
		}
	});
	$("#field" + i + "d").resizable({
		start: function () {
			$(".iframeShield").css('visibility', 'visible');
		},
		stop: function () {
			$(".iframeShield").css('visibility', 'hidden');
			setPath();
		},
		handles:'n, e, s, w, ne, se, sw, nw'
	});
	$("#field" + i + "d").css({top: top, left:left});
	hideFrame("#field" + i + "d");
	i = i+1;

	setPath();
}

function addChatFromButton() {
	var channelName = $("#name").val();
	var top = 50;
	var left = 10;
	var height = 400;
	var width = height * 0.7;
	var topZ = topZ + 1;

	addChat(channelName, top, left, height, width, topZ);
	putToFront($("#field" + i-1 + "d"));
}

function addChat(channelName, top, left, height, width, z) {	
	var frameheight = parseInt(height) + frameOffset;
	var framewidth = parseInt(width) + frameOffset;
	
	var buttonpos = width + buttonOffset;
	
	$("#inner").append(`
		<div id='field` + i + `d' 
			class='frame chat' 
			style='height:` + frameheight + `; 
				width:` + framewidth + `; 
				z-index:` + z + `'
			onresize='resize(this)' 
			onmouseenter='showFrame(this)'
			onmouseleave='hideFrame(this)'
			onmousedown='putToFront(this)'>
			<label class='labelChannelName'>` + channelName + `</label>
			<button class='end' style='left:` + buttonpos + `;' onclick='removeElement(this)'>✕</button>
			<iframe class='twitchfield' 
				src='https://www.twitch.tv/embed/` + channelName + `/chat?darkpopout'
				id='` + channelName + `' 
				frameborder='0' 
				scrolling='no' 
				height='` + height + `' 
				width='` + width + `'>
			</iframe>
			<div class='iframeShield'></div>			
		</div>
	`);
	$("#field" + i + "d").draggable({
		start: function () {
			$(".iframeShield").css('visibility', 'visible');
		},
		stop: function () {
			$(".iframeShield").css('visibility', 'hidden');
			setPath();
		}
	});
	$("#field" + i + "d").resizable({
		start: function () {
			$(".iframeShield").css('visibility', 'visible');
		},
		stop: function () {
			$(".iframeShield").css('visibility', 'hidden');
			setPath();
		},
		handles:'n, e, s, w, ne, se, sw, nw'
	});
	$("#field" + i + "d").css({top: top, left:left});
	hideFrame("#field" + i + "d");
	i = i+1;

	setPath();
}

function putToFront(ele) {
	topZ = topZ + 1;
	$(ele).css("z-index", topZ);

	setPath();
}

function showFrame(ele) {
	if ($('#inner').find('.frame').hasClass('ui-draggable-dragging') === false && $('#inner').find('.frame').hasClass('ui-resizable-resizing') === false) {
		$(ele).css('background-color', document.getElementById('colWindowEdge').value);
		$(ele).find('label').css('display', 'block');
		$(ele).find('button').css('display', 'block');
		$(ele).find('div:not(.iframeShield)').css('display', 'block');
	}
}

function hideFrame(ele) {
	if ($('#inner').find('.frame').hasClass('ui-draggable-dragging') === false && $('#inner').find('.frame').hasClass('ui-resizable-resizing') === false) {
		$(ele).css('background-color', 'transparent');
		$(ele).find('label').css('display', 'none');
		$(ele).find('button').css('display', 'none');
		$(ele).find('div:not(.iframeShield)').css('display', 'none');
	} else {
		showFrame(ele);
	}
}

function removeElement(ele) {
	$(ele).parent().remove();
	setPath();
}

function resize(ele) {
	var height = $(ele).height() - frameOffset;
	var width = $(ele).width() - frameOffset;
	var butpos = width + buttonOffset;
	$(ele).find("iframe").css({"height":height, "width": width});
	$(ele).find("button").css("left",butpos);
	setPath();
}

function setPath() {
	var path = '//' + window.location.hostname + '/?';
	path += 'colBG=' + $('#colBackground')[0].value + '&';
	path += 'colWE=' + $('#colWindowEdge')[0].value + '&';
	path += 'streams=';
	$('#inner').find('.stream').each(function() {
		var channel = $(this).find('label')[0].innerHTML;
		var top = $(this).position().top;
		var left = $(this).position().left;
		var height = $(this).height() - frameOffset;
		var width = $(this).width() - frameOffset;
		var z = $(this)[0].style.zIndex;
		var pathPart = channel + ';' + top + ';' + left + ';' + height + ';' + width + ';' + z + '_';
		path += pathPart;
	});
	path += '&chats=';
	$('#inner').find('.chat').each(function() {
		var channel = $(this).find('label')[0].innerHTML;
		var top = $(this).position().top;
		var left = $(this).position().left;
		var height = $(this).height() - frameOffset;
		var width = $(this).width() - frameOffset;
		var z = $(this)[0].style.zIndex;
		var pathPart = channel + ';' + top + ';' + left + ';' + height + ';' + width + ';' + z + '_';
		path += pathPart;
	});
	window.history.replaceState(null,null, path);
}