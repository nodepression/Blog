(function () {
    var configure = {};//要发布文章的参数

    function getConfigure(){
        configure.title = $(".title").html();
        configure.timestamp = new Date().getTime();
        configure.type = $(".type").html();
        configure.head = 1;
    }

    //markdown转html
    function compile() {
        var text = document.getElementById("content").value;
        var converter = new showdown.Converter();
        var html = converter.makeHtml(text);
        console.log(html)
        document.getElementById("result").innerHTML = html;
    }

    //发布文章
    function publish(configure) {
        var timestamp = new Date().getTime(),
            title = configure.title,
            head = configure.head,
            type = configure.type;

        $.ajax({
            type: "POST",
            url: "/backStage/publish",
            data: configure,
            dataType: 'json',
            success: function (myData) {

            },
            error: function (xhr, type) {
                console.log(type);
            },
        });


    }





    // 事件绑定
    $("#content").keyup(function () {
        compile();
    })

}.call(this));