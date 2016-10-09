/*
teacher_kc
@author: yuanzp
@date  : 2016/10/9
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
	  

        //搜索某个课程
        $(search).on("click",function(){
                $("#errorTip,#successTip,#alt_warning,#alt_sucess").remove();
                var appendedInputButtons = $("#appendedInputButtons").val().trim();

                appendedInputButtons = appendedInputButtons.replace(/\s+/g, '').toLowerCase();

                var currentURL = window.location.origin;

                if ($("tbody tr").length != 0) {
                    $("tbody tr").remove();
                }
                $("#score tbody tr").remove();
                $("#score").show();

                $.post( currentURL + "/search_course/search/" + appendedInputButtons,function(results){
                    if (results == false) {
                        $("#row").prepend(errorTip.format('未找到该课程'));  
                    }else {

                        for(var i = 0; i < results.length; i ++) {

                            var list = $("<tr>");                           
                            list.addClass('success');
                            list.attr('id','list-' + i)
                            $('#list').append(list);  
                            $('#list-' + i).append("<td>" + results[i].kcNo + "</td>");
                            $('#list-' + i).append("<td>" + results[i].kcName + "</td>");
                            $('#list-' + i).append("<td>" + results[i].tName + "</td>");
                            $('#list-' + i).append("<td>" + results[i].cName + "</td>");
                            $('#list-' + i).append("<td>" + results[i].time + "</td>");
                            $('#list-' + i).append("<td>" + results[i].margin + "</td>");
                        }
                    }                                      
                });

        });
        
         // 查询所有课程
        $(all).on("click",function(){
            
            $("#errorTip,#successTip,#alt_warning,#alt_sucess").remove();
            $("#score tbody tr").remove();
            $("#score").show();

            var currentURL = window.location.origin;
          
            $.get(currentURL + "/search_course/allcourse",function(results){
            for(var i = 0; i < results.length; i ++) {

                var list = $("<tr>");                           
                list.addClass('success');
                list.attr('id','list-' + i)
                $('#list').append(list);  
                $('#list-' + i).append("<td class='tdval'>" + results[i].kcNo + "</td>");
                $('#list-' + i).append("<td class='tdval'>" + results[i].kcName + "</td>");
                $('#list-' + i).append("<td class='tdval'>" + results[i].tName + "</td>");
                $('#list-' + i).append("<td class='tdval'>" + results[i].cName + "</td>");
                $('#list-' + i).append("<td class='tdval'>" + results[i].time + "</td>");
                $('#list-' + i).append("<td class='tdval'>" + results[i].margin + "</td>");
                }  
            });
        });       
        //根据教师编号查找课程安排
        $(searchtno).on("click",function(){
                $("#errorTip,#successTip,#alt_warning,#alt_sucess").remove();
                $("#score tbody tr").remove();
                $("#score").show();
                var alltr = $("table tbody tr");
                var appendedInputButtons = $("#appendedInputButtons").val().trim();
                appendedInputButtons = appendedInputButtons.replace(/\s+/g, '').toLowerCase();
                var currentURL = window.location.origin;

                if (alltr.length != 0) {
                    alltr[0].remove();
                }
                if ($("tbody tr").length != 0) {
                    $("tbody tr").remove();
                }
                $.post( currentURL + "/search_course/searchtno/" + appendedInputButtons,function(results){
                    if (results == false) {
                        $("#row").prepend(errorTip.format('未找到该课程'));  
                    }else {

                        for(var i = 0; i < results.length; i ++) {

                            var list = $("<tr>");                           
                            list.addClass('success');
                            list.attr('id','list-' + i)
                            $('#list').append(list);  
                            $('#list-' + i).append("<td>" + results[i].kcNo + "</td>");
                            $('#list-' + i).append("<td>" + results[i].kcName + "</td>");
                            $('#list-' + i).append("<td>" + results[i].tName + "</td>");
                            $('#list-' + i).append("<td>" + results[i].cName + "</td>");
                            $('#list-' + i).append("<td>" + results[i].time + "</td>");
                            $('#list-' + i).append("<td>" + results[i].margin + "</td>");
                        }
                    }                                       
                });
        });
        // 根据课程名称查找课程安排
        $(searchkcname).on("click",function(){
                $("#errorTip,#successTip,#alt_warning,#alt_sucess").remove();
                $("#score tbody tr").remove();
                $("#score").show();

                var alltr = $("table tbody tr");
                var appendedInputButtons = $("#appendedInputButtons").val().trim();
                appendedInputButtons = appendedInputButtons.replace(/\s+/g, '').toLowerCase();
                var currentURL = window.location.origin;

                if ($("tbody tr").length != 0) {
                    $("tbody tr").remove();
                }
                $.post( currentURL + "/search_course/searchkcname/" + appendedInputButtons,function(results){
                    if (results == false) {
                        $("#row").prepend(errorTip.format('未找到该课程'));  
                    }else {

                        for(var i = 0; i < results.length; i ++) {

                            var list = $("<tr>");                           
                            list.addClass('success');
                            list.attr('id','list-' + i)
                            $('#list').append(list);  
                            $('#list-' + i).append("<td>" + results[i].kcNo + "</td>");
                            $('#list-' + i).append("<td>" + results[i].kcName + "</td>");
                            $('#list-' + i).append("<td>" + results[i].tName + "</td>");
                            $('#list-' + i).append("<td>" + results[i].cName + "</td>");
                            $('#list-' + i).append("<td>" + results[i].time + "</td>");
                            $('#list-' + i).append("<td>" + results[i].margin + "</td>");
                        }
                    }                                       
                });
        });
     });       