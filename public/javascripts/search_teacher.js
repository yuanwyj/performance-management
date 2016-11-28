/*search_teacher.js
@author: yuanzp
date   :2016/9/27
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
        // 查询所有老师
        $(all).on("click",function(){
            $("#errorTip,#successTip,#alt_error,#alt_success").remove();
            $("#teachertable tbody tr").remove();
            $("#teachertable").show();
            var currentURL = window.location.origin;
          
            $.get(currentURL + "/search_Teacher/allteacher",function(results){
            for(var i = 0; i < results.length; i ++) {

                var list = $("<tr>");                           
                list.addClass('success');
                list.attr('id','list-' + i)
                $('#list').append(list);  
                $('#list-' + i).append("<td class='tdval'>" + results[i].tNo + "</td>");
                $('#list-' + i).append("<td class='tdval'>" + results[i].tName + "</td>");
                $('#list-' + i).append("<td class='tdval'>" + results[i].tSex + "</td>");
                $('#list-' + i).append("<td class='tdval'>" + results[i].E_mail + "</td>");
                $('#list-' + i).append("<td class='tdval'>" + results[i].tPhone + "</td>");
                $('#list-' + i).append("<td class='tdval'>" + results[i].tBirthday + "</td>");
                $('#list-' + i).append("<td><button class='btn change'>修改</button><button class='btn save'>保存</button><button class='btn del'>删除</button></td>");                                                    
                }  

                $('.change').on("click",function(){
                    if ($("#teachertable tbody tr").find("input").length != 0) {
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
                //所有老师信息的保存
                $('.save').on("click",function(){
                  
                        if ($('#successTip') != 0) {
                            $('#successTip').remove();
                        }
                        if ($('#errorTip') != 0) {
                            $('#errorTip').remove();
                        }
                        var teacher = [];
                        var alltd = $(this).parent().prevAll();
                        alltd.find("input").each(function(){
                            teacher.push($(this).val());
                        });

                        var jteacher = JSON.stringify(teacher);

                        $.post(currentURL + "/search_Teacher/updata/" + jteacher,function(results){

                        });
                        //将td中的input移除保留value
                        $(this).closest('td').siblings().text(function(i){
                            var inptval = $(this).find("input").val();
                            return inptval;
                        });
                  
                        
                        $("#row").prepend(successTip.format('更新数据成功'));                           

                });  
                        $('.del').on("click",function(){
                            if ($('#successTip') != 0) {
                                $('#successTip').remove();
                            }
                            if ($('#errorTip') != 0) {
                                $('#errorTip').remove();
                            }
                            var tnotr = $(this).parent().parent();
                            var tNo = tnotr.find("td:first-child").text();
                            tNo = tNo.replace(/\s+/g, '').toLowerCase();
                            $.post(currentURL + "/search_Teacher/del/" + tNo,function(results){
                                
                            });
                            $("#row").prepend(successTip.format('删除数据成功')); 
                            tnotr.remove();
                        });  

            });
        });	  

        //搜索谋个老师
        $(search).on("click",function(){
            
            $("#errorTip,#successTip,#alt_error,#alt_success").remove();
            $("#teachertable tbody tr").remove();
            $("#teachertable").show();
                
            var appendedInputButtons = $("#appendedInputButtons").val().trim();

            appendedInputButtons = appendedInputButtons.replace(/\s+/g, '').toLowerCase();

            var currentURL = window.location.origin;


            $.post( currentURL + "/search_Teacher/search/" + appendedInputButtons,function(results){
                if (results == false) {
                    $("#row").prepend(errorTip.format('未找到该老师'));  
                }else {

                    for(var i = 0; i < results.length; i ++) {

                        var list = $("<tr>");                           
                        list.addClass('success');
                        list.attr('id','list-' + i)
                        $('#list').append(list);  
                        $('#list-' + i).append("<td>" + results[i].tNo + "</td>");
                        $('#list-' + i).append("<td>" + results[i].tName + "</td>");
                        $('#list-' + i).append("<td>" + results[i].tSex + "</td>");
                        $('#list-' + i).append("<td>" + results[i].E_mail + "</td>");
                        $('#list-' + i).append("<td>" + results[i].tPhone + "</td>");
                        $('#list-' + i).append("<td>" + results[i].tBirthday + "</td>");
                        $('#list-' + i).append("<td><button class='btn change'>修改</button><button class='btn save'>保存</button><button class='btn del'>删除</button></td>");                                                    
                    }
                }
                        // 点击按钮删除老师记录
                        $('.del').on("click",function(){
                            var tnotr = $(this).parent().parent();
                            var tNo = tnotr.find("td:first-child").text();
                            tNo = tNo.replace(/\s+/g, '').toLowerCase();
                            $.post(currentURL + "/search_Teacher/del/" + tNo,function(results){
                                
                            });
                            $("#row").prepend(successTip.format('删除数据成功')); 
                            tnotr.remove();
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

                        // 点击按钮保存修改后的内容

                 $('.save').on("click",function(){
                    $("#errorTip,#successTip,#alt_error,#alt_success").remove();                    
                    if ($(this).parent().prev().find("input").length == 0) {
                         alert("另一条记录未保存 或者未修改！！");
                         
                    } else {
                        var teacher = [];
                        var alltd = $(this).parent().prevAll();
                        alltd.find("input").each(function(){
                            teacher.push($(this).val());
                        });

                        var jteacher = JSON.stringify(teacher);

                        $.post(currentURL + "/search_Teacher/updata/" + jteacher,function(results){

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