window.onload = function(){
    var menu = $('.menu');
    var leftNav = $('.leftNav');
    var hide = $('.hide');
    var recent = $('.recent');
    var specific = $('.specificList');
    var home = $('.home');
    var js = $('.js');
    var blogBody = $('.blogBody');

    function showMenu(){
        leftNav.css("display","flex");
        hide.css("display","block");
    }
    function hideMenu(){
        leftNav.css("display","none");
        hide.css("display","none");
    }
    menu.click(function(e){
        showMenu();
    });
    hide.click(function(e){
       hideMenu();
    });

    function toHome(){
        recent.css("display","block");
        specific.css("display","none");

        leftNav.css("display","none");
        hide[0].style.display = "none"; 
        blogBody.css("display","none");
    }
    home.click(function(e){
       toHome();
    });



    // js.click(function(e){
    //     recent.css("display","none");
    //     specific.css("display","block");
    //     $(".specificList>.title").html("JavaScript");

    //     leftNav.css("display","none");
    //     hide[0].style.display = "none"; 
    //     blogBody.css("display","none");
    // });

    $("#haha").click(function(){
        blogBody.css("display","block");
        specific.css("display","none");

        $.ajax({
            url: "/blog/recent",
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



//首页显示的最近文章
var recentList = null;
$.ajax({
    url: "/blog/recent",
    type: "get",
    dataType: "json",
    async:false, //同步请求
    success: function (msg) {
        recentList = msg.data;
    },
    error: function (err) {
        console.log(err.type);
    }
})
var specificList = null;
function getSpecificList(type){
    $.ajax({
        url: "/blog/specific",
        type: "get",
        dataType: "json",
        data:{"type":type},
        async:false, //同步请求
        success: function (msg) {
            specificList = msg.data;
        },
        error: function (err) {
            console.log(err.type);
        }
    })
}

var reParent = $('.recentList'); //首页要显示的最近博客列表的父容器
var speParent = $('.specificList');//某一具体类别的博客列表的父容器
var blogBody = $('.blogBody');  //博客正文父容器

//最近博客对象构造函数
function Recent(config){
    var recent = document.createElement('div');
    recent.className = "recent"+" "+config.a_Id;

    var title = document.createElement('p');
    title.className = "title";
    title.innerHTML = config.title;
    recent.appendChild(title);

    var hr = document.createElement('hr');
    recent.appendChild(hr);

    var date = document.createElement('div');
    date.className = "info";
    var time = new Date( Date.parse(config.date)).toLocaleString(); 
    date.innerHTML = "Posted: " + time;
    recent.appendChild(date);

    var head = document.createElement('div');
    head.className = "body";
    head.innerHTML = config.intro;
    recent.appendChild(head);

    var type = document.createElement('div');
    type.className = "tags";
    type.innerHTML ="标签：" + config.type;
    recent.appendChild(type);

    return recent;
}

//某一类具体文章构造函数
function Specific(config){
    var specific = document.createElement('div');
    specific.className = "specific"+" "+config.a_Id;

    var head = document.createElement('p');
    head.className = "item";
    head.innerHTML = config.intro;
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


$(".type").click(function(e){
    var myTarget = $(event.target);
    var type = myTarget.attr("class").split(" ")[1];
    if((type=="js")||(type=="c")||(type=="hu")){
        $('.recent').css("display","none");
        $('.specificList').css("display","block");
        $(".specificList>.title").html(type);
        $(".leftNav").css("display","none");
        $(".hide")[0].style.display = "none"; 
        $(".blogBody").css("display","none");

        getSpecificList(type);
        loadSpecific(specificList);

        
    }
    else{
        // toHome();
    }
})

function init(){
    loadrecent(recentList);
}
init();