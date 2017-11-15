window.onload = function(){
    var menu = $('.menu');
    var leftNav = $('.leftNav');
    var hide = $('.hide');
    var recent = $('.recent');
    var specific = $('.specificList');
    var home = $('.home');
    var js = $('.js');
    var blogBody = $('.blogBody');

    menu.click(function(e){
        leftNav.css("display","flex");
        // hide.css("dispaly","block");//为什么不行？
        hide[0].style.display = "block"; 
    });
    hide.click(function(e){
        leftNav.css("display","none");
        hide[0].style.display = "none"; 
    });
    home.click(function(e){
        recent.css("display","block");
        specific.css("display","none");

        leftNav.css("display","none");
        hide[0].style.display = "none"; 
        blogBody.css("display","none");
    });

    js.click(function(e){
        recent.css("display","none");
        specific.css("display","block");

        leftNav.css("display","none");
        hide[0].style.display = "none"; 
        blogBody.css("display","none");
    });

    $("#haha").click(function(){
        blogBody.css("display","block");
        specific.css("display","none");

        $.ajax({
            url: "./blog/recent",
            type: "get",
            dataType: "json",
            success: function (msg) {
               blogBody[0].innerHTML=msg.data[0].article;
            },
            error: function (err) {
                console.log(err.type);
            }
        })
    })

}


var recentList = null;
$.ajax({
    url: "./blog/recent",
    type: "get",
    dataType: "json",
    success: function (msg) {
        recentList = msg.data;
    },
    error: function (err) {
        console.log(err.type);
    }
})
var reParent = $('.recentList');
var speParent = $('.specifictList');
var blogBody = $('.blogBody');

//最近博客对象
function Recent(config){
    var recent = document.createElement('div');
    recent.className = "recent"+" "+config.id;

    var title = document.createElement('p');
    title.className = "title";
    title.innerHTML = config.title;
    recent.appendChild(title);

    var hr = document.createElement('hr');
    recent.appendChild(hr);

    var date = document.createElement('div');
    date.className = "info";
    date.innerHTML = config.date;
    recent.appendChild(date);

    var head = document.createElement('div');
    head.className = "body";
    head.innerHTML = config.head;
    recent.appendChild(head);

    var type = document.createElement('div');
    type.className = "tags";
    type.innerHTML ="标签：" + config.type;
    recent.appendChild(type);

    return recent;
}

//某一类具体博客
function Specific(config){
    var specific = document.createElement('div');
    specific.className = "specific"+" "+config.id;

    var head = document.createElement('p');
    head.className = "item";
    head.innerHTML = config.head;
    specific.appendChild(head);

    var hr = document.createElement('hr');
    specific.appendChild(hr);

    return specific;


}
//加载首页最近博客列表(根据日期)
function loadrecent(reList){
    reParent.empty();
    reList.map(function(item,index,array){
        var recent = Recent(item);
        reParent[0].appendChild(recent);
    })
}
//加载某一类具体博客列表(根据type,根据日期排序)
function loadSpecific(speList){
    $('.specific').remove();
    speList.map(function(item,index,array){
        var specific = Specific(item);
        speParent[0].appendChild(specific);
    })
}
//加载博客正文,博客评论(根据id)
function loadBlog(b_id){
    var blog = null;
    $.ajax({
        url: "./blog/recent",
        type: "get",
        dataType: "json",
        data:{"b_id":b_id},
        success: function (msg) {
          blog = msg.data[0];
        //   console.log(blog);
          blogBody.children()[0].html = blog.article;
          blogBody.children()[1].html = blog.review;
        },
        error: function (err) {
            console.log(err.type);
        }
    })
}