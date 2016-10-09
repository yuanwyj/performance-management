/*
chose.js
@author :yuanzp
@date 	:2016/10/9
*/

$(function(){
        var errorTip = '<div id="errorTip" class="alert alert-warning">{0}</div> ';
        var successTip = '<div id="successTip" class="alert alert-success">{0}</div>';

        String.prototype.format = function (args) {
            var result = this;
            if (arguments.length > 0) {
                if (arguments.length == 1 && typeof (args) == "object") {
                    for (var key in args) {
                        if (args[key] != undefined) {
                            var reg = new RegExp("({" + key + "})", "g");
                            result = result.replace(reg, args[key]);
                        }
                    }
                }
                else {
                    for (var i = 0; i < arguments.length; i++) {
                        if (arguments[i] != undefined) {
                            var reg = new RegExp("({)" + i + "(})", "g");
                            result = result.replace(reg, arguments[i]);
                        }
                    }
                }
            }
            return result;
        }
	  
        
         // 查询所有课程
        $(all).on("click",function(){
            $("#successTip,#errorTip, #alt_warning,#alt_sucess").remove();

            $("#scoretable tbody tr").remove();
            $("#scoretable").hide();

            $("#kctable tbody tr").remove();
            $("#kctable").show();
            var currentURL = window.location.origin;
          
            $.get(currentURL + "/search_course/allcourse",function(results){
            for(var i = 0; i < results.length; i ++) {

                var kc_list = $("<tr>");                           
                kc_list.addClass('success');
                kc_list.attr('id','kc_list-' + i)
                $('#kc_list').append(kc_list);  
                $('#kc_list-' + i).append("<td class='tdval'>" + results[i].kcNo + "</td>");
                $('#kc_list-' + i).append("<td class='tdval'>" + results[i].kcName + "</td>");
                $('#kc_list-' + i).append("<td class='tdval'>" + results[i].tName + "</td>");
                $('#kc_list-' + i).append("<td class='tdval'>" + results[i].cName + "</td>");
                $('#kc_list-' + i).append("<td class='tdval'>" + results[i].time + "</td>");
                $('#kc_list-' + i).append("<td class='tdval'>" + results[i].margin + "</td>");
                $('#kc_list-' + i).append("<td><button class='btn btn-lg delall choose'>选择</button></td>");                                                    
                }  

            $('.choose').on("click",function(){
            	$("#successTip,#errorTip, #alt_warning,#alt_sucess").remove();
            	var kcno = $(this).parent().parent().find("td:first-child").text();
            	kcno =  kcno.replace(/\s+/g, '').toLowerCase();
            	$.post(currentURL +"/chose_kc/choose/"+kcno,function(message){
                    if (message.length != 0) {
                        $("#row").prepend(errorTip.format(message));
                    }
            	});
            	
            });
                           
            });
        });       
        // 根据课程名称查找课程安排
        $(kcno).on("click",function(){
            $("#successTip,#errorTip, #alt_warning,#alt_sucess").remove();
            var appendedInputButtons = $("#appendedInputButtons").val().trim();
            appendedInputButtons = appendedInputButtons.replace(/\s+/g, '').toLowerCase();
            var currentURL = window.location.origin;

            if (appendedInputButtons.length == 0) {
                $("#row").prepend(errorTip.format('请填写要查找的课程编号'));
                return false;
            }

                $("#scoretable tbody tr").remove();
                $("#scoretable").hide();
                $("#kctable tbody tr").remove();

                $("#kctable").show();
                $.post( currentURL + "/search_course/search/" + appendedInputButtons,function(results){
                    if (results == false) {
                        $("#row").prepend(errorTip.format('未找到该课程'));  
                    }else {

                        for(var i = 0; i < results.length; i ++) {

                            var kc_list = $("<tr>");                           
                            kc_list.addClass('success');
                            kc_list.attr('id','kc_list-' + i)
                            $('#kc_list').append(kc_list);  
                            $('#kc_list-' + i).append("<td>" + results[i].kcNo + "</td>");
                            $('#kc_list-' + i).append("<td>" + results[i].kcName + "</td>");
                            $('#kc_list-' + i).append("<td>" + results[i].tName + "</td>");
                            $('#kc_list-' + i).append("<td>" + results[i].cName + "</td>");
                            $('#kc_list-' + i).append("<td>" + results[i].time + "</td>");
                            $('#kc_list-' + i).append("<td>" + results[i].margin + "</td>");
                            $('#kc_list-' + i).append("<td><button class='btn choose'>选择</button></td>");                                                    
                        }
                    }
                    // 选择课程
                    $('.choose').on("click",function(){

                        $("#successTip,#errorTip, #alt_warning,#alt_sucess").remove();
                        var kcno = $(this).parent().parent().find("td:first-child").text();
                        kcno =  kcno.replace(/\s+/g, '').toLowerCase();
                        $.post(currentURL +"/chose_kc/choose/"+kcno,function(message){
                        if (message.length != 0) {
                            if (message.length == 4) {
                                $("#row").prepend(successTip.format(message));
                            }
                            else{
                                $("#row").prepend(errorTip.format(message));
                            }
                        }
                    });
                
                });                                      
            });
        });
     });       
