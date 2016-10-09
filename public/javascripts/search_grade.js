/*
search_grade.js
@author :yuanzp	
@date 	:2016/10/2
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
	  

        //搜索某个学生所有课程成绩
        $(searchsno).on("click",function(){
                $("#errorTip,#successTip,#alt_success,#alt_error").remove();
                $("#anytable").hide();

                $("#gradetable tbody tr").remove();

                $("#gradetable").show();
                
                var alltr = $("table tbody tr");
                var appendedInputButtons = $("#appendedInputButtons").val().trim();

                appendedInputButtons = appendedInputButtons.replace(/\s+/g, '').toLowerCase();

                var currentURL = window.location.origin;

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
                $.post( currentURL + "/search_grade/search/" + appendedInputButtons,function(results){
                    if (results == false) {
                        $("#row").prepend(errorTip.format('未找到该学生成绩记录'));  
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
                            $('#list-' + i).append("<td><button class='btn change' id='change'>修改</button><button class='btn save' id='save'>保存</button></td>");                                                    
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
                  
                        
                        $("#row").prepend(successTip.format('更新数据成功')); 
                        }    
                        
                });                                    
                });

        });
              
        // 查看某个课程号所有学生成绩
        $(searchkcno).on("click",function(){
                $("#errorTip,#successTip,#alt_success,#alt_error").remove();
                $("#anytable").hide();

                $("#gradetable tbody tr").remove();
                $("#gradetable").show();
                var appendedInputButtons = $("#appendedInputButtons").val().trim();
                appendedInputButtons = appendedInputButtons.replace(/\s+/g, '').toLowerCase();
                var currentURL = window.location.origin;

                if ($("tbody tr").length != 0) {
                    $("tbody tr").remove();
                }
                $.post( currentURL + "/search_grade/searchkcno/" + appendedInputButtons,function(results){
                    if (results == false) {
                        $("#row").prepend(errorTip.format('未找到该课程号学生成绩'));  
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
                            $('#list-' + i).append("<td><button class='btn change' id='change'>修改</button><button class='btn save' id='save'>保存</button></td>");                                                    
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
                  
                        
                        $("#row").prepend(successTip.format('更新数据成功')); 
                        }    
                        
                });                                                                       
            });
        });

        $(analyse).on("click",function(){
            
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
            }
            else if(appendedInputButtons.length == 8 && $("#list tr").length != 0) {
                $("#anytable tbody tr").remove();
                $("#anytable").show(); 
                $.post( currentURL + "/search_grade/analysesno/" + appendedInputButtons,function(results){
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
            }

        });
     });       