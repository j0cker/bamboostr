function lanzarDraftsPro(id_msgPro){
	var parametros = { id:id_msgPro };
    $.ajax({data:  parametros,
			url:   "scripts/mod-draft-message.php",
			type:  "post",
			success:  function (response) {
			  if(response.indexOf("FALSE")!="-1"){
				toastr["error"](txt135, "ERROR");
			  } else if(response.indexOf("TRUE")!="-1") {
				toastr["info"](txt136);
			  } else {
				toastr["error"](txt92);
			  }
                                  getMsgsProgram(1);
                                  getDraftsProgram(2);
                                  getCalendar();
			},
			error: function (response){
			  toastr["error"](txt92);
			}
    });
}
function guardarDraftsPro(id_msgPro){
      if(document.getElementById("timepicker2").value){
        var timePrArray = document.getElementById("timepicker2").value;
	timePr = timePrArray.split(":");
	timePrH = timePr[0];
	timePrMArray = timePr[1].split(" ");
	timePrM = timePrMArray[0];
	timeP = timePrH + "" +timePrM;
	var date = new Date();
	timeRFecha = date.getDate() + "/" +(date.getMonth()+1) + "/" +  date.getFullYear();
	timeR = date.getHours() + "" +date.getMinutes() + " ";
	
	timeRFechaParse = monthNames[parseInt(date.getMonth())] + " " +date.getDate() + ", " +  date.getFullYear();
	timePFechaArray = document.getElementById("datepicker2").value.split("-");
	timePFechaParse = monthNames[parseInt(timePFechaArray[1]-1)] + " " +timePFechaArray[0] + ", " +  timePFechaArray[2];
      }

		if(document.getElementById("datepicker2").value){
			var fecha = document.getElementById("datepicker2").value + " " + 
						timePrH + ":" +timePrM;
                      } else {
                        var fecha = ' ';
                      }

		var parametros = { id:id_msgPro, 
		                   mensaje:document.getElementById("mensajeMsgsPro").value,
						   horario:husoHorario,
						   fecha:fecha
						   };
	    $.ajax({data:  parametros,
				url:   "scripts/mod-draft-message.php",
				type:  "post",
				success:  function (response) {
				  if(response.indexOf("FALSE")!="-1"){
					toastr["error"](txt133, "ERROR");
				  } else if(response.indexOf("TRUE")!="-1") {
					toastr["success"](txt134);
				  } else {
					toastr["error"](txt92);
				  }
                                  $("#edit-message").modal("hide");
                                  getMsgsProgram(1);
                                  getDraftsProgram(2);
                                  getCalendar();
				},
				error: function (response){
				  toastr["error"](txt92);
				}
        }); 
}
function editarDraftsPro(id_msgPro){
  $("#edit-message").modal("show");
  var parametros = { id:id_msgPro};
  $.ajax({  data:  parametros,
			url:   "scripts/get-draft-message.php",
			type:  "post",
			success:  function (response) {
			  if(response.indexOf("FALSE")!="-1"){
		            toastr["error"](txt122, "ERROR");
			  } else if(response.indexOf("Base de datos")!="-1"){
			    toastr["error"](txt117, "ERROR");
			  } else {
				obj = JSON.parse(response);
				if(obj.data.length!=0){
				  htmlDialogEditMsPr = '';
				  htmlDialogEditMsPr += '<div style="display: table; width: 100%;">';
					htmlDialogEditMsPr += '<div style="display: table-row; width: 100%;">';
					  htmlDialogEditMsPr += '<div style="text-align: center; display: table-cell; width: 100%;">';
						htmlDialogEditMsPr += ''+obj.data[0].screen_name+'';
					  htmlDialogEditMsPr += '</div>';
					htmlDialogEditMsPr += '</div>';
					htmlDialogEditMsPr += '<div style="display: table-row; width: 100%;">';
					  htmlDialogEditMsPr += '<div style="text-align: center; display: table-cell; width: 100%;">';
						htmlDialogEditMsPr += '<img style="width: 50px;" src="'+obj.data[0].image_profile+'" />';
					  htmlDialogEditMsPr += '</div>';
					htmlDialogEditMsPr += '</div>';
				  htmlDialogEditMsPr += '</div>';
				  htmlDialogEditMsPr += '<div style="display: table-row; width: 100%;">';
					  htmlDialogEditMsPr += '<div style="text-align: left; display: table-cell; width: 200px;">';
						htmlDialogEditMsPr += 'Red social: ';
					  htmlDialogEditMsPr += '</div>';
					  htmlDialogEditMsPr += '<div style="text-align: left; display: table-cell;">';
						htmlDialogEditMsPr += ''+obj.data[0].red+'';
					  htmlDialogEditMsPr += '</div>';
					htmlDialogEditMsPr += '</div>';
				  htmlDialogEditMsPr += '<div style="display: table; width: 100%;">';
					htmlDialogEditMsPr += '<div style="display: table-row; width: 100%;">';
					  htmlDialogEditMsPr += '<div style="text-align: left; display: table-cell; width: 200px;">';
						htmlDialogEditMsPr += 'Fecha: ';
					  htmlDialogEditMsPr += '</div>';
					  htmlDialogEditMsPr += '<div style="text-align: left; display: table-cell;">';
					    fechaEdirMsgsProArray=obj.data[0].fecha.split(" ");
						htmlDialogEditMsPr += ''+txt79+': <input value="'+fechaEdirMsgsProArray[0]+'" style="display: inline-block;" type="date" class="datepicker2" id="datepicker2">';
						htmlDialogEditMsPr += ' '+txt80+': <input value="'+fechaEdirMsgsProArray[1]+'" style="display: inline-block;" type="text" id="timepicker2">';
					  htmlDialogEditMsPr += '</div>';
					htmlDialogEditMsPr += '</div>';
					htmlDialogEditMsPr += '<div style="display: table-row; width: 100%;">';
					  htmlDialogEditMsPr += '<div style="text-align: left; display: table-cell; width: 200px;">';
						htmlDialogEditMsPr += 'Mensaje: ';
					  htmlDialogEditMsPr += '</div>';
					  htmlDialogEditMsPr += '<div style="text-align: left; display: table-cell;">';
						htmlDialogEditMsPr += '<input id="mensajeMsgsPro" name="mensajeMsgsPro" type="text" style="width: 100%;" value="'+obj.data[0].mensaje.replace(/"/g, " ")+'" />';
					  htmlDialogEditMsPr += '</div><br /><br />';
					htmlDialogEditMsPr += '</div>';
					htmlDialogEditMsPr += '<div style="display: table-row; width: 100%;">';
					  htmlDialogEditMsPr += '<div style="text-align: left; display: table-cell; width: 200px;">';
						htmlDialogEditMsPr += 'Imágen(es): ';
					  htmlDialogEditMsPr += '</div>';
					  htmlDialogEditMsPr += '<div style="text-align: left; display: table-cell;">';
					  if(obj.data[0].images==""){
					    htmlDialogEditMsPr += 'N/A';
					  }
					  arrayImageEdit = obj.data[0].images.split(",");
					  for(var iCImMsgsPro=0; iCImMsgsPro<arrayImageEdit.length-1; iCImMsgsPro++){
					    htmlDialogEditMsPr += '<img style="width: 400px;" src="'+arrayImageEdit[iCImMsgsPro]+'" /><br />';
					  }
					  htmlDialogEditMsPr += '</div>';
					htmlDialogEditMsPr += '</div>';
				  htmlDialogEditMsPr += '</div>';
				  htmlDialogEditMsPr += '<div style="display: table-row; width: 100%;">';
					  htmlDialogEditMsPr += '<div style="text-align: left; display: table-cell; width: 200px;">';
						htmlDialogEditMsPr += 'Link: ';
					  htmlDialogEditMsPr += '</div>';
					  htmlDialogEditMsPr += '<div style="text-align: left; display: table-cell;">';
					  if(obj.data[0].link==""){
					    htmlDialogEditMsPr += 'N/A';
					  }
					  htmlDialogEditMsPr += '</div><br /><br />';
					htmlDialogEditMsPr += '</div><br />';
				  htmlDialogEditMsPr += '<div style="display: table; width: 100%;">';
					htmlDialogEditMsPr += '<div style="display: table-row; width: 100%;">';
					  htmlDialogEditMsPr += '<div style="text-align: center; display: table-cell; width: 100%;">';
						htmlDialogEditMsPr += '<a class="waves-effect waves-light btn" onclick="guardarDraftsPro('+comilla+''+id_msgPro+''+comilla+');">Guardar Cambios</a>';
                                          htmlDialogEditMsPr += '</div>';
					htmlDialogEditMsPr += '</div>';
				  htmlDialogEditMsPr += '</div>';
				  $("#edit-message-body").html(htmlDialogEditMsPr);
				    $(function() {
					 $(".datepicker2").pickadate({
					   changeMonth: true,
					   changeYear: true,
					   dateFormat: 'dd-mm-yyyy',
                                           format: 'dd-mm-yyyy',
					   minDate: 0,
					   showOn: "both",
					   buttonImage: "images/calendar.gif",
					   buttonImageOnly: false,
					   buttonText: "Select date"
					 });
				  });
				  
				  $('#timepicker2').timepicker({ 'scrollDefault': 'now', 'step': 15, 'timeFormat': 'H:i A' });
				} else {
				  toastr["error"](txt122, "ERROR");
				}
			  }
			},
			error: function (response){
			  toastr["error"](txt92);
			}
  });
}
function eliminarDraftsPro(id_msgPro){
var parametros = { id:id_msgPro};
  $.ajax({  data:  parametros,
			url:   "scripts/delete-draft-message.php",
			type:  "post",
			success:  function (response) {
			  if(response.indexOf("FALSE")!="-1"){
				toastr["error"](txt129, "ERROR");
			  } else if(response.indexOf("TRUE")!="-1") {
				toastr["success"](txt130);
				getDraftsProgram(2);
			  } else {
				toastr["error"](txt92);
			  }
			},
			error: function (response){
			  toastr["error"](txt92);
			}
  });
}
function getDraftsProgram(feedDraftsProgram){
  var feedheight = 550; 
  var showmensajesactions = true;
  var showmensajeslinks = true;
  var status = "";
  var loadingHTML = '<center><div style="text-align: center; display: table; width: 100%;" id="loading-container'+feedDraftsProgram+'"><br /><div class="Knight-Rider-loader animate"><div class="Knight-Rider-bar"></div><div class="Knight-Rider-bar"></div><div class="Knight-Rider-bar"></div></div><br /></div></center>';
  $('#main-feed'+feedDraftsProgram+'').html(loadingHTML);
  
  $.ajax({  url:   "thread-sys.php?id_token="+id_token+"&option=draftsMsgs",
			type:  "POST",
			success:  function (response) {
			  feedDraftsPro = '';
			  if(response.indexOf("FALSE")!="-1"){
			    $('#main-feed'+feedDraftsProgram+'').html("<center>"+ txt141 +"</center>");
			  } else if(response.indexOf("Base de datos")!="-1"){
			    $('#main-feed'+feedDraftsProgram+'').html("<center>"+ txt117 +"</center>");
				$('#main-feed'+feedDraftsProgram+'').html($('#main-feed'+feedDraftsProgram+'').html() + '<div style="width: 100%; text-align: center;"><img onclick="imgRefreshDraftsProgram('+comilla+''+feedDraftsProgram+''+comilla+')" src="images/refresh.gif" style="cursor: pointer;" /></div>');
			  } else {
				obj = JSON.parse(response);
				if(obj.data.length!=0){
				  for(var i=0; i<obj.data.length; i++){
					status = "";
					if (showmensajeslinks == true && obj.data[i].mensaje) {
						status = addlinks(obj.data[i].mensaje);
					}
					if(i==0){
					  feedDraftsPro += '<div id="columna'+feedDraftsProgram+'" style="position:relative; height:'+feedheight+'px; overflow-y: auto;">';
					}
					feedDraftsPro += '<div class="twitter-article'+feedDraftsProgram+'" style="display: table-row;">'; 							
					if(obj.data[i].red=="facebook"){	                 
					  feedDraftsPro += '<div class="twitter-pic" style="display: table-cell;"><a href="https://facebook.com/'+obj.data[i].identify+'" target="_blank"><img id="profileImage'+window["contImageMsgPro" + feedDraftsProgram]+''+feedDraftsProgram+'" src="'+obj.data[i].image_profile+'" width="42" height="42" alt="Profile" /></a></div>';
					  feedDraftsPro += '<div class="twitter-text" style="padding-left: 10px; display: table-cell;"><p><span class="tweetprofilelink"><strong><a href="https://facebook.com/'+obj.data[i].identify+'" target="_blank">'+obj.data[i].screen_name+'</a></strong></span><span class="tweet-time">'+obj.data[i].fecha+'</span><br/>';
					} else if(obj.data[i].red=="twitter"){
					  feedDraftsPro += '<div class="twitter-pic" style="display: table-cell;"><a href="https://twitter.com/'+obj.data[i].screen_name+'" target="_blank"><img id="profileImage'+window["contImageMsgPro" + feedDraftsProgram]+''+feedDraftsProgram+'" src="'+obj.data[i].image_profile+'" width="42" height="42" alt="Profile" /></a></div>';
					  feedDraftsPro += '<div class="twitter-text" style="padding-left: 10px; display: table-cell;"><p><span class="tweetprofilelink"><strong><a href="https://twitter.com/'+obj.data[i].screen_name+'" target="_blank">'+obj.data[i].screen_name+'</a></strong></span><span style="padding-left: 10px;" class="tweet-time">'+obj.data[i].fecha+'</span><br/>';
					} else if(obj.data[i].red=="instagram"){
					  feedDraftsPro += '<div class="twitter-pic" style="display: table-cell;"><a href="https://instagram.com/'+obj.data[i].screen_name+'" target="_blank"><img id="profileImage'+window["contImageMsgPro" + feedDraftsProgram]+''+feedDraftsProgram+'" src="'+obj.data[i].image_profile+'" width="42" height="42" alt="Profile" /></a></div>';
					  feedDraftsPro += '<div class="twitter-text" style="padding-left: 10px; display: table-cell;"><p><span class="tweetprofilelink"><strong><a href="https://twitter.com/'+obj.data[i].screen_name+'" target="_blank">'+obj.data[i].screen_name+'</a></strong></span><span style="padding-left: 10px;" class="tweet-time">'+obj.data[i].fecha+'</span><br/>';
					}
					
					if(obj.data[i].images!=""){
					  imagesDraftsPrArray = obj.data[i].images.split(",");
					  for(var cMsgPr=0; cMsgPr<imagesDraftsPrArray.length-1; cMsgPr++){
					    if(status!="")
						  feedDraftsPro += '<br />'+status+'<br /><br />';
					    feedDraftsPro += '<div style="display: table-row; width: 100%;"><div style="display: table-cell; width: 100%;"><a target="_blank" href="'+imagesDraftsPrArray[cMsgPr]+'"><img style="width: 100%;" src="'+imagesDraftsPrArray[cMsgPr]+'"></a></div></div></p><br />';
					  }
					} else {
					  feedDraftsPro += ''+status+'<br />';
					}
					if (showmensajesactions == true) {
						feedDraftsPro += '<div style="width: 100%; float: left; display: block;" id="twitter-actions'+feedDraftsProgram+'"><br /><div style="display: table-cell;"><a style="cursor: pointer;" onclick="lanzarDraftsPro('+comilla+''+obj.data[i].id+''+comilla+');" title="Lanzar">Lanzar&nbsp;</a></div><div style="display: table-cell;"><a style="cursor: pointer;" onclick="editarDraftsPro('+comilla+''+obj.data[i].id+''+comilla+');" title="Editar">&nbsp;Editar&nbsp;</a></div><div style="display: table-cell;"><a style="cursor: pointer;" onclick="eliminarDraftsPro('+comilla+''+obj.data[i].id+''+comilla+');" title="Borrar">&nbsp;Borrar</a></div><br /></div>';
					}
					feedDraftsPro += '</div>';
					feedDraftsPro += '</div>';
				  }//fin for
				} else {
				  $('#main-feed'+feedDraftsProgram+'').html("<center>"+ txt141 +"</center>");
				}
				feedDraftsPro += '</div>';
			    $('#main-feed'+feedDraftsProgram+'').html(feedDraftsPro);
			  }
			  /*
			  //Add twitter action animation and rollovers
			  if (showmensajesactions == true) {				
				$('.twitter-article'+feedDraftsProgram+'').hover(function(){
					$(this).find('#twitter-actions'+feedDraftsProgram+'').css({'float':'left', 'display':'table-row', 'opacity':0, 'margin-top':-20});
					$(this).find('#twitter-actions'+feedDraftsProgram+'').animate({'opacity':1, 'margin-top':0},200);
				}, function() {
					$(this).find('#twitter-actions'+feedDraftsProgram+'').animate({'opacity':0, 'margin-top':-20},120, function(){
						$(this).css('display', 'none');
					});
				});	
			  }*/
			  
			  //Function modified from Stack Overflow
			  function addlinks(data) {
				//Add link to all http:// links within tweets
				 data = data.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
					return '<a href="'+url+'" >'+url+'</a>';
				});
					 
				//Add link to @usernames used within tweets
				data = data.replace(/\B@([_a-z0-9]+)/ig, function(reply) {
					return '<a href="http://twitter.com/'+reply.substring(1)+'" style="font-weight:lighter;" target="_blank">'+reply.charAt(0)+reply.substring(1)+'</a>';
				});
				//Add link to #hastags used within tweets
				data = data.replace(/\B#([_a-z0-9]+)/ig, function(reply) {
					return '<a href="https://twitter.com/search?q='+reply.substring(1)+'" style="font-weight:lighter;" target="_blank">'+reply.charAt(0)+reply.substring(1)+'</a>';
				});
				return data;
			  }
			},
			error: function (response){
			  $('#main-feed'+feedDraftsProgram+'').html("<center>"+ txt117 +"</center>");
			  $('#main-feed'+feedDraftsProgram+'').html($('#main-feed'+feedDraftsProgram+'').html() + '<div style="width: 100%; text-align: center;"><img onclick="imgRefreshDraftsProgram('+comilla+''+feedDraftsProgram+''+comilla+')" src="images/refresh.gif" style="cursor: pointer;" /></div>');
			}
  });
}