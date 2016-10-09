/*
search_Student.js
@author:yuanzp
@date  :2016/9/28
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
        // 所有学生
        $(all).on("click",function(){

            $("#errorTip,#successTip,#alt_error,#alt_success");
            $("#stdtable tbody tr").remove();
            $("#stdtable").show();
            var currentURL = window.location.origin;
          
            $.get(currentURL + "/search_Student/allstudent",function(results){
            for(var i = 0; i < results.length; i ++) {

                var list = $("<tr>");                           
                list.addClass('success');
                list.attr('id','list-' + i)
                $('#list').append(list);  
                $('#list-' + i).append("<td class='tdval'>" + results[i].sNo + "</td>");
                $('#list-' + i).append("<td class='tdval'>" + results[i].sName + "</td>");
                $('#list-' + i).append("<td class='tdval'>" + results[i].sSex + "</td>");
                $('#list-' + i).append("<td class='tdval'>" + results[i].E_mail + "</td>");
                $('#list-' + i).append("<td class='tdval'>" + results[i].sphone + "</td>");
                $('#list-' + i).append("<td class='tdval'>" + results[i].sBirthday + "</td>");
                $('#list-' + i).append("<td><button class='btn change'>修改</button><button class='btn save'>保存</button><button class='btn del'>删除</button></td>");                                                    
                }  

                $('.change').on("click",function(){
                    if ($("#stdtable tbody tr").find("input").length != 0) {
                        alert("另一条记录未保存");
                        return false;
                    }

                    if ($(this).parent().prev().find("input").length != 0) {
                         alert("已在编辑窗口");
                    }else {

                        if (!$(this).is("input")) {
                            $(this).closest('td').siblings().html(function(i,html){
                            return '<input class="input_td" type="text" value='+html+' />';
                        });
                        }else {
                            return false;
                        }
                    }
                }); 
                //所有学生信息的保存
                $('.save').on("click",function(){
                  
                        $("#errorTip,#successTip,#alt_error,#alt_success").remove();

                        var student = [];
                        var alltd = $(this).parent().prevAll();
                        alltd.find("input").each(function(){
                            student.push($(this).val());
                        });

                        var jstudent = JSON.stringify(student);

                        $.post(currentURL + "/search_Student/updata/" + jstudent,function(results){

                        });
                        //将td中的input移除保留value
                        $(this).closest('td').siblings().text(function(i){
                            var inptval = $(this).find("input").val();
                            return inptval;
                        });
                  
                        
                        $("#row").prepend(successTip.format('更新数据成功'));                            

                });  
                $('.del').on("click",function(){
                    $("#errorTip,#successTip,#alt_error,#alt_success").remove();
                    var firstr = $(this).parent().parent();
                    var sNo = $(this).parent().parent().find("td:first-child").text();
                    sNo = sNo.replace(/\s+/g, '').toLowerCase();
                    $.post(currentURL + "/search_Student/del/" + sNo,function(results){
                                
                    });
                    $("#row").prepend(successTip.format('删除数据成功')); 
                    firstr.remove();
                });                          
            });
        });	  

        //搜索谋个学生
        $(search).on("click",function(){
                var appendedInputButtons = $("#appendedInputButtons").val().trim();

                appendedInputButtons = appendedInputButtons.replace(/\s+/g, '').toLowerCase();

                var currentURL = window.location.origin;

                $("#errorTip,#successTip,#alt_error,#alt_success");
                $("#stdtable tbody tr").remove();
                $("#stdtable").show();

                $.post( currentURL + "/search_Student/search/" + appendedInputButtons,function(results){
                    if (results == false) {
                        $("#row").prepend(errorTip.format('未找到该学生'));  
                    }else {

                        for(var i = 0; i < results.length; i ++) {

                            var list = $("<tr>");                           
                            list.addClass('success');
                            list.attr('id','list-' + i)
                            $('#list').append(list);  
                            $('#list-' + i).append("<td>" + results[i].sNo + "</td>");
                            $('#list-' + i).append("<td>" + results[i].sName + "</td>");
                            $('#list-' + i).append("<td>" + results[i].sSex + "</td>");
                            $('#list-' + i).append("<td>" + results[i].E_mail + "</td>");
                            $('#list-' + i).append("<td>" + results[i].sphone + "</td>");
                            $('#list-' + i).append("<td>" + results[i].sBirthday + "</td>");
                            $('#list-' + i).append("<td><button class='btn change'>修改</button><button class='btn save'>保存</button><button class='btn del'>删除</button></td>");                                                    
                        }
                    }
                        // 点击按钮删除学生记录
                        $('.del').on("click",function(){
                            var firstr = $(this).parent().parent();
                            var sNo = $(this).parent().parent().find("td:first-child").text();
                            sNo = sNo.replace(/\s+/g, '').toLowerCase();
                            $.post(currentURL + "/search_Student/del/" + sNo,function(results){
                                
                            });
                            $("#row").prepend(successTip.format('删除数据成功')); 
                            firstr.remove();
                        });  
                        
                        // 点击修改按钮将表格内容变为可编辑
                        $('.change').on("click",function(){

                            if ($("table tbody tr td input").length != 0) {
                                alert("已在编辑窗口");
                            }else {
                                if (!$(this).is("input")) {
                                    $(this).closest('td').siblings().html(function(i,html){
                                        return '<input class="input_td" type="text" value='+html+' />';
                                    });
                                }else {
                                    return false;
                                }
                            }
                        });

                    $('.save').on("click",function(){
                        $("#errorTip,#successTip,#alt_error,#alt_success").remove();                    
                        if ($(this).parent().prev().find("input").length == 0) {
                            alert("另一条记录未保存 或者未修改！！");
                         
                        } else {
                            var student = [];
                            var alltd = $(this).parent().prevAll();
                            alltd.find("input").each(function(){
                                student.push($(this).val());
                            });

                            var jstudent = JSON.stringify(student);

                            $.post(currentURL + "/search_Student/updata/" + jstudent,function(results){

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
        

     });      