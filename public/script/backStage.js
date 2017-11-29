(function () {
    var configure = {};//要发布文章的参数

    function getConfigure(){
        configure.title = $.trim($(".title").val());//文章标题
        configure.type = $.trim($(".type").val());//文章类型
        configure.intro = $.trim($(".article_intro").val());//文章简短介绍
        configure.article = $("#result").html(); //文章正文
    }
    //markdown转html
    function compile() {
        var text = document.getElementById("content").value;
        var converter = new showdown.Converter();
        var html = converter.makeHtml(text);
        // console.log(html)
        document.getElementById("result").innerHTML = html;
    }

    //发布文章
    function publish(configure) {
        $.ajax({
            type: "POST",
            url: "/backStage/publish",
            data: configure,
            dataType: 'json',
            success: function (myData) {
                console.log(myData.data);
                if(myData.status=="ok"){
                    alert("插入成功");
                }
            },
            error: function (xhr, type) {
                console.log(type);
            },
        });


    }





    // markdown转换
    $("#content").keyup(function () {
        compile();
    })

    //发布文章
    $(".publish").click(function () {
        getConfigure();//得到准备发布的文章的参数
        publish(configure);
    })

}.call(this));