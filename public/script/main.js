

//多加点炫酷的动画 

(function () {
    var reParent = $('.recentList'); //首页要显示的最近博客列表的父容器
    var speParent = $('.specificList');//某一具体类别的博客列表的父容器
    var hotParent = $('.allHot');//左侧热门文章列表的父容器
    var blogBody = $('.blogBody');  //博客正文父容器


    var specificList = null; //某一栏目下的博客列表
    var recentList = null; //最近博客列表
    var hotList = null; //热门列表
    var manager = {
        toHome: function () {
            console.log("showtoHome()");
            $('.recent').css("display", "block");
            $('.specificList').css("display", "none");

            $('.leftNav').animate({ width: '0', opacity: '0' });
            $('.hide').css("display", "none");
            $('.blogBody').css("display", "none");
        },
        showNav: function () {
            console.log("showNav()");
            $('.leftNav').animate({ width: '12.5%', opacity: '1.0' });
            $('.hide').css("display", "block");
        },
        hideNav: function () {
            console.log("hideNav()");
            $('.leftNav').animate({ width: '0', opacity: '0' });
            $('.hide').css("display", "none");
        },
        addRecent: function (config) { //返回一个最近博客item
            var recent = document.createElement('div');
            recent.className = "recent" + " " + config.a_Id + " " + "toArticle" + " " + "hvr-wobble-to-bottom-right";

            var title = document.createElement('p');
            title.className = "title";
            title.innerHTML = config.title;
            recent.appendChild(title);

            var hr = document.createElement('hr');
            recent.appendChild(hr);

            var date = document.createElement('div');
            date.className = "info";
            var time = new Date(Date.parse(config.date)).toLocaleString();
            date.innerHTML = "Posted: " + time;
            recent.appendChild(date);

            var head = document.createElement('div');
            head.className = "body";
            head.innerHTML = config.intro;
            recent.appendChild(head);

            var type = document.createElement('div');
            type.className = "tags";
            type.innerHTML = "标签：" + config.type;
            recent.appendChild(type);

            return recent;
        },
        addSpecific: function (config) {//返回一个某一类博客item
            var specific = document.createElement('div');
            specific.className = "specific" + " " + config.a_Id + " " + "toArticle";

            var head = document.createElement('p');
            head.className = "item";
            head.innerHTML = config.title;
            specific.appendChild(head);

            var hr = document.createElement('hr');
            specific.appendChild(hr);

            return specific;
        },
        addHot: function (config) {
            var hot = document.createElement('div');
            hot.className = "hotItem" + " " + config.a_Id + " " + "toArticle" + " " + "hvr-radial-in";
            hot.innerHTML = config.title;

            return hot;
        },
        lodeSpecfic: function (speList) { //加载某个类型博客
            console.log("speclist");
            $('.specific').remove();
            speList.map(function (item, index, array) {
                var specific = manager.addSpecific(item);
                speParent[0].appendChild(specific);
            })
        },
        lodeRencent: function (reList) { //加载最近添加的一些博客
            console.log("relist");
            reParent.empty();
            reList.map(function (item, index, array) {
                var recent = manager.addRecent(item);
                reParent[0].appendChild(recent);
            })
        },
        lodeHot: function (hotList) { //加载热门文章列表，右侧简单显示
            $('.hotItem').remove();
            hotList.map(function (item, index, array) {
                var hot = manager.addHot(item);
                hotParent[0].appendChild(hot);
            })
        },
        lodeArticle: function (a_id) { //根据a_id加载博客正文
            var blog = null;
            $.ajax({
                url: "./blog/oneBlog",
                type: "get",
                dataType: "json",
                data: { "a_id": a_id },
                success: function (msg) {
                    $('.blogBody').css("display", "block");
                    $('.specificList').css("display", "none");
                    $('.recent').css("display", "none");

                    blog = msg.data[0];
                    console.log(blog);

                    // blogBody[0].innerHTML=blog.article
                    blogBody.children()[0].innerHTML = blog.article;
                    // blogBody.children()[1].innerHTML= blog.review;
                },
                error: function (err) {
                    console.log(err.type);
                }
            })
        },
        lodeReview: function (a_id) { //根据a_id加载评论

        },
        init: function () { //初始化页面(记载最近博客列表)

        }
    }

    $('.menu').click(function () { //点击menu加载左侧导航栏，并提供模糊效果
        manager.showNav();
        renderLeft();
    });
    $('.hide').click(function () { //点击模糊效果区域隐藏左侧导航栏，并取消模糊效果
        manager.hideNav();
        reRenderLeft();
    });
    $('.home').click(function () { //点击左侧导航栏中的home回到主页
        manager.toHome();
    });
    $('.type').click(function (event) { //点击class带有type的元素加载某一类博客列表
        var myTarget = $(event.target);
        var type = myTarget.attr("class").split(" ")[1];
        if ((type == "js") || (type == "c") || (type == "hu")) {
            $('.recent').css("display", "none");
            $('.specificList').css("display", "block");
            if (type == "hu") {
                $(".specificList>.title").html("人文");
            }
            else if (type == "c") {
                $(".specificList>.title").html("C/C++");
            } else {
                $(".specificList>.title").html("JavaScript");
            }

            $('.leftNav').animate({ width: '0', opacity: '0' });
            $(".hide")[0].style.display = "none";
            $(".blogBody").css("display", "none");

            updateSpecific(type);
        }
        else {
            manager.toHome();
        }
    });

    function toArticle() {
        $('.toArticle').click(function (event) { //点击class带有toArticle的元素加载博客正文
            var myTarget = $(event.target);
            console.log(myTarget[0]);
            var targetClass = myTarget.attr("class").split(" ")[0];
            var id;
            if ( targetClass== "hotItem" || targetClass== "picItem") {
                id = myTarget.attr("class").split(" ")[1];
            } else {
                id = myTarget.parents('.toArticle').attr("class").split(" ")[1];
            }

            manager.lodeArticle(id);
        });
    }


    function renderLeft() {
        $('.home').animate({ left: "0" }, 1000);
        $('.js').animate({ top: "0" }, 1000);
        $('.c').animate({ bottom: "0" }, 1000);
        $('.hu').animate({ left: "0" }, 1000);
    }
    function reRenderLeft() {
        $('.leftNav>.home').animate({ left: "100px" }, 1000);
        $('.leftNav>.js').animate({ top: "100px" }, 1000);
        $('.leftNav>.c').animate({ bottom: "100px" }, 1000);
        $('.leftNav>.hu').animate({ left: "-100px" }, 1000);
    }
    function updateRecent() {
        $.ajax({
            url: "/blog/recent",
            type: "get",
            dataType: "json",
            async: false, //同步请求
            success: function (msg) {
                recentList = msg.data;
                manager.lodeRencent(recentList);
                toArticle();
            },
            error: function (err) {
                console.log(err.type);
            }
        });
    }
    //更新某一栏目下需要渲染的数据
    function updateSpecific(type) {
        $.ajax({
            url: "/blog/specific",
            type: "get",
            dataType: "json",
            data: { "type": type },
            async: false, //同步请求
            success: function (msg) {
                specificList = msg.data;
                manager.lodeSpecfic(specificList);
                toArticle()
            },
            error: function (err) {
                console.log(err.type);
            }
        })
    }

    function updateHot() {
        $.ajax({
            url: "/blog/recent",
            type: "get",
            dataType: "json",
            async: false, //同步请求
            success: function (msg) {
                hotList = msg.data;
                manager.lodeHot(hotList);
                toArticle();
            },
            error: function (err) {
                console.log(err.type);
            }
        });
    }

    //初始化整个博客网站
    (function () {
        updateRecent();
        updateHot();
    }());

}());