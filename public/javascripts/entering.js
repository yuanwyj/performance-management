/*
entering.js
@author :yaunzp
@date 	:2016/10/3
*/

$(function(){
        var errorTip = '<div id="errorTip" class="alert alert-warning">{0}</div> ';
        var successTip = '<div id="successTip" class="alert alert-success">{0}</div>';
        var	tnoval = $("#tnoval").text();

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
	  

        //搜索某个学生所有课程成绩
        $(searchsno).on("click",function(){
                $("#kctable tbody tr").remove;
                $("#kctable").hide();

                $("#anytable").hide();
                var alltr = $("table tbody tr");
                var appendedInputButtons = $("#appendedInputButtons").val().trim();
                appendedInputButtons = appendedInputButtons.replace(/\s+/g, '').toLowerCase();
                var currentURL = window.location.origin;
                var score = [];
                score = [tnoval,appendedInputButtons];
                var jscore = JSON.stringify(score);

                if (alltr.length != 0) {
                    alltr[0].remove();
                }
                if ($('#errorTip') != 0) {
                    $('#errorTip').remove();
                }
                if ($('#successTip') != 0) {
                    $('#successTip').remove();
                }
                if ($("tbody tr").length != 0) {
                    $("tbody tr").remove();
                }
                $.post( currentURL + "/entering/search/" + jscore,function(results){
                    if (results == false) {
                        $("#row").prepend(errorTip.format('该学生没有选修你的课程或没有该学生'));  
                    }else {

                        for(var i = 0; i < results.length; i ++) {

                            var list = $("<tr>");                           
                            list.addClass('success');
                            list.attr('id','list-' + i)
                            $('#list').append(list);  
                            $('#list-' + i).append("<td>" + results[i].sName + "</td>");
                            $('#list-' + i).append("<td>" + results[i].sNo + "</td>");
                            $('#list-' + i).append("<td>" + results[i].kcNo + "</td>");
                            $('#list-' + i).append("<td>" + results[i].kcName + "</td>");
                            $('#list-' + i).append("<td>" + results[i].credit + "</td>");
                            $('#list-' + i).append("<td>" + results[i].score + "</td>");                          
                            $('#list-' + i).append("<td><button class='btn change' id='change'>录入</button><button class='btn save' id='save'>保存</button></td>");                                                    
                        }
                    }

                $('.change').on("click",function(){

                    if ($(this).parent().prev().find("input").length != 0) {
                         alert("已在编辑窗口");
                    }else {

                        if (!$(this).is("input")) {
                            $(this).closest('td').siblings().last().html(function(i,html){
                                return '<input class="input_td" type="text" value='+html+' />';
                            });
                            $('.input_td').focus();
                        }else {
                            return false;
                        }
                    }
                }); 
                //更新修改后的成绩
                $('.save').on("click",function(){
                  
                    if ($(this).parent().prev().find("input").length == 0) {
                         alert("另一条记录未保存 或者未修改！！");
                         
                    } else {
                        if ($('#successTip') != 0) {
                            $('#successTip').remove();
                        }
                        if ($('#errorTip') != 0) {
                            $('#errorTip').remove();
                        }
                        var grade = [];
                        var alltd = $(this).parent().prevAll();
                        alltd.find("input").each(function(){
                            grade.push($(this).val());
                        });

                        var sno = $(this).parent().parent().find("td:eq(1)").text();
                        var kcno = $(this).parent().parent().find("td:eq(2)").text();

                        grade.push(sno);
                        grade.push(kcno);

                        var jgrade = JSON.stringify(grade);

                        $.post(currentURL + "/search_grade/updata/" + jgrade,function(results){

                        });
                        //将td中的input移除保留value
                        $(this).closest('td').siblings().text(function(i){
                            var inptval = $(this).find("input").val();
                            return inptval;
                        });
                  
                        
                        $("#row").prepend(successTip.format('录入数据成功')); 
                        }    
                        
                });                                    
                });

        });
              
        // 录入某个课程号所有学生成绩
        $(searchkcno).on("click",function(){
                $("#kctable tbody tr").remove;
                $("#kctable").hide();

                $("#anytable").hide();

                $("#gradetable").show();
                var alltr = $("table tbody tr");
                var appendedInputButtons = $("#appendedInputButtons").val().trim();
                appendedInputButtons = appendedInputButtons.replace(/\s+/g, '').toLowerCase();
                var currentURL = window.location.origin;
                var kcnotno = [tnoval,appendedInputButtons];
                var jkcnotno = JSON.stringify(kcnotno);

                if (alltr.length != 0) {
                    alltr[0].remove();
                }
                if ($('#errorTip') != 0) {
                    $('#errorTip').remove();
                }
                if ($('#successTip') != 0) {
                    $('#successTip').remove();
                }
                if ($("tbody tr").length != 0) {
                    $("tbody tr").remove();
                }
                $.post( currentURL + "/entering/searchkcno/" + jkcnotno,function(results){
                    if (results == false) {
                        $("#row").prepend(errorTip.format('您没有教授该课程或没有学生选修该课程'));  
                    }else {

                        for(var i = 0; i < results.length; i ++) {

                            var list = $("<tr>");                           
                            list.addClass('success');
                            list.attr('id','list-' + i)
                            $('#list').append(list);  
                            $('#list-' + i).append("<td>" + results[i].sName + "</td>");
                            $('#list-' + i).append("<td>" + results[i].sNo + "</td>");
                            $('#list-' + i).append("<td>" + results[i].kcNo + "</td>");
                            $('#list-' + i).append("<td>" + results[i].kcName + "</td>");
                            $('#list-' + i).append("<td>" + results[i].credit + "</td>");
                            $('#list-' + i).append("<td>" + results[i].score + "</td>");                          
                            $('#list-' + i).append("<td><button class='btn change' id='change'>录入</button><button class='btn save' id='save'>保存</button></td>");                                                    
                        }
                    }


                 $('.change').on("click",function(){

                    if ($(this).parent().prev().find("input").length != 0) {
                         alert("已在编辑窗口");
                    }else {

                        if (!$(this).is("input")) {
                            $(this).closest('td').siblings().last().html(function(i,html){
                                return '<input class="input_td" type="text" value='+html+' />';
                            });
                            $('.input_td').focus();
                        }else {
                            return false;
                        }
                    }
                });  

                $('.save').on("click",function(){
                  
                    if ($(this).parent().prev().find("input").length == 0) {
                         alert("另一条记录未保存 或者未修改！！");
                         
                    } else {
                        if ($('#successTip') != 0) {
                            $('#successTip').remove();
                        }
                        if ($('#errorTip') != 0) {
                            $('#errorTip').remove();
                        }
                        var grade = [];
                        var alltd = $(this).parent().prevAll();
                        alltd.find("input").each(function(){
                            grade.push($(this).val());
                        });

                        var sno = $(this).parent().parent().find("td:eq(1)").text();
                        var kcno = $(this).parent().parent().find("td:eq(2)").text();

                        grade.push(sno);
                        grade.push(kcno);

                        var jgrade = JSON.stringify(grade);

                        $.post(currentURL + "/search_grade/updata/" + jgrade,function(results){

                        });
                        //将td中的input移除保留value
                        $(this).closest('td').siblings().text(function(i){
                            var inptval = $(this).find("input").val();
                            return inptval;
                        });
                  
                        
                        $("#row").prepend(successTip.format('录入成绩成功')); 
                        }    
                        
                });                                                                       
            });
        });

        $(analyse).on("click",function(){
            $("#kctable tbody tr").remove;
            $("#kctable").hide();       	
            
            var appendedInputButtons = $("#appendedInputButtons").val().trim();
            appendedInputButtons = appendedInputButtons.replace(/\s+/g, '').toLowerCase();
            var currentURL = window.location.origin;

            if (appendedInputButtons.length == 3 && $("#list tr").length != 0) {
                $("#anytable tbody tr").remove();
                $("#anytable").show(); 
                $.post( currentURL + "/search_grade/analyse/" + appendedInputButtons,function(results){
                    if (results == false) {
                        $("#row").prepend(errorTip.format('未找到该课程'));  
                    }else {

                    for(var i = 0; i < results.length; i ++) {

                        var analyselist = $("<tr>");                           
                            analyselist.addClass('success');
                            analyselist.attr('id','analyselist-' + i)
                            $('#analyselist').append(analyselist);  
                            $('#analyselist-' + i).append("<td>" + results[i].avgGrade + "</td>");
                            $('#analyselist-' + i).append("<td>" + results[i].passrate + "</td>");
                            $('#analyselist-' + i).append("<td>" + results[i].goodgrade + "</td>");                                                                 
                        }
                    }                                      
                });
            }else if (appendedInputButtons.length == 8 && $("#list tr").length != 0) {

            }
            else {
            	$("#errorTip,#successTip,#alert-success,#alert-warning").remove();
            	$("#row").prepend(errorTip.format('先查看成绩'));
            }

        });

        $(mykc).on("click",function(){
            $("#kctable tbody tr").remove();
            $("#kctable").hide();

            $("#anytable tbody tr").remove();
            $("#anytable").hide();
            $("#gradetable tbody tr").remove();
            $("#gradetable").hide();
        	var currentURL = window.location.origin;

        	$("#kctable").show();
        	$.post(currentURL + "/entering/searchkc/" + tnoval,function(results){
        		if (results == false) {
        			$("#row").prepend(errorTip.format('没有教授的课程')); 
        		}else {
        			for(var i = 0;i < results.length; i++){
        				var kclist = $("<tr>");
        					kclist.addClass('success');
        					kclist.attr('id','kclist-' + i)
        					$('#kclist').append(kclist);
        					$('#kclist-' + i).append("<td>" + results[i].kcNo + "</td>");
        					$('#kclist-' + i).append("<td>" + results[i].kcName + "</td>");
        					$('#kclist-' + i).append("<td>" + results[i].time + "</td>");
        					$('#kclist-' + i).append("<td>" + results[i].cName + "</td>");
        					$('#kclist-' + i).append("<td>" + results[i].margin + "</td>");
                            $('#kclist-' + i).append("<td><button class='btn logging' id='logging'>录入</button>");                                                    
        			}
        		}
        		$('.logging').on("click",function(){

        			var kcno = $(this).parent().parent().find("td:eq(0)").text();
        			var kcnotno = [tnoval,kcno];
        			var jkcnotno = JSON.stringify(kcnotno);

        			$("#gradetable tbody tr").remove();
       

        			$("#gradetable").show();
                	$.post( currentURL + "/entering/searchkcno/" + jkcnotno,function(results){
                    	if (results == false) {
                        	$("#row").prepend(errorTip.format('您没有教授该课程或没有学生选修该课程'));  
                    	}else {

                        	for(var i = 0; i < results.length; i ++) {

                            	var list = $("<tr>");                           
                            	list.addClass('success');
                            	list.attr('id','list-' + i)
                            	$('#list').append(list);  
                            	$('#list-' + i).append("<td>" + results[i].sName + "</td>");
                            	$('#list-' + i).append("<td>" + results[i].sNo + "</td>");
                            	$('#list-' + i).append("<td>" + results[i].kcNo + "</td>");
                            	$('#list-' + i).append("<td>" + results[i].kcName + "</td>");
                            	$('#list-' + i).append("<td>" + results[i].credit + "</td>");
                            	$('#list-' + i).append("<td>" + results[i].score + "</td>");                          
                            	$('#list-' + i).append("<td><button class='btn change' id='change'>录入</button><button class='btn save' id='save'>保存</button></td>");                                                    
                        	}
                    	}


                 $('.change').on("click",function(){

                    if ($(this).parent().prev().find("input").length != 0) {
                         alert("已在编辑窗口");
                    }else {

                        if (!$(this).is("input")) {
                            $(this).closest('td').siblings().last().html(function(i,html){
                                return '<input class="input_td" type="text" value='+html+' />';
                            });
                            $('.input_td').focus();
                        }else {
                            return false;
                        }
                    }
                });  

                $('.save').on("click",function(){
                  
                    if ($(this).parent().prev().find("input").length == 0) {
                         alert("另一条记录未保存 或者未修改！！");
                         
                    } else {
                        if ($('#successTip') != 0) {
                            $('#successTip').remove();
                        }
                        if ($('#errorTip') != 0) {
                            $('#errorTip').remove();
                        }
                        var grade = [];
                        var alltd = $(this).parent().prevAll();
                        alltd.find("input").each(function(){
                            grade.push($(this).val());
                        });

                        var sno = $(this).parent().parent().find("td:eq(1)").text();
                        var kcno = $(this).parent().parent().find("td:eq(2)").text();

                        grade.push(sno);
                        grade.push(kcno);

                        var jgrade = JSON.stringify(grade);

                        $.post(currentURL + "/search_grade/updata/" + jgrade,function(results){

                        });
                        //将td中的input移除保留value
                        $(this).closest('td').siblings().text(function(i){
                            var inptval = $(this).find("input").val();
                            return inptval;
                        });
                  
                        
                        $("#row").prepend(successTip.format('录入成绩成功')); 
                        }    
                        
                });                                                                       
            });      			
        		});

        	});
        });
     });       