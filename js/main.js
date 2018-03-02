
function writeCode(prefix,code,fn){
    let n = 0;

    let domCode = document.querySelector('#code');
     domCode.innerHTML = prefix || '' ;
    domCode.scrollTop = domCode.scrollHeight; //页面下拉
    var id = setInterval(() => {
        n++;
        domCode.innerHTML = Prism.highlight(prefix + code.slice(0,n), Prism.languages.css);
        styleTag.innerHTML = prefix + code.slice(0,n);

        if(n>=code.length){
            window.clearInterval(id)
            fn();
        }
    },70)
}



function writeMarkdown(markdown,fn){
    let n = 0;

    let domPaper = document.querySelector('#paper>.content');
    domPaper.innerHTML = markdown ;
    domPaper.scrollTop = domPaper.scrollHeight; //页面下拉
    var id = setInterval(() => {
        n++;
        domPaper.innerHTML = markdown.substring(0, n);
        if(n>=markdown.length){
            window.clearInterval(id)
            fn();
        }
    },35)
}




var result = `  
  /*你好，我是王洁，我先以代码的形式介绍我自己*/
  *{transition: all 1s;}
  html{background:#DCE2F1;}
  #code{border: 1px solid #EBEBE4;}
   
  /*我需要代码高亮*/
  .token.selector{ color: #690; }
  .token.property{ color: #905; }

  /*加一个3D效果吧*/
  #code-wrapper{ perspective: 1000px;}
  #code{
    animation: breath 0.5s infinite alternate-reverse;
    transform: rotateY(10deg) translateZ(-100px) ;
    -webkit-transform: rotateY(10deg) translateZ(-100px) ;
   }

  /*现在正式开始自我介绍*/
  /*我需要一张白纸*/

  #paper > .content{
    width:100%;
    height:100%;}
  
  #code-wrapper{
    width: 50%; left: 0; position: fixed; 
    height: 100%;}
  
  #paper > .content{display: block;}

  /* 现在我要在白纸上写字了--> */
`

var result2 = `
  /* 接下来把 Markdown 变成 HTML */
`

var md = `
## 自我介绍
我叫王洁
南昌大学 软件工程专业 毕业
主修课程：C语言程序设计  面向对象编程  Java程序设计 
         Javascript程序设计   数据结构与算法

## 技能介绍
熟悉 JavaScript CSS  html5 JQuery
了解 Vue框架 Webpack 

## 个人项目介绍
  - 苹果风格键盘导航
  - 个人简历网站
  - Canvas画板
  - 仿网易云音乐
  - Vue在线简历编辑器
  
## 个人爱好
  - 健身
  - 阅读
  - 烹饪
    
## 联系方式
  - 微信 w782328816
  - Email: 17321256848@163.com
  - 手机:17321256848

`

let result3 = `
 /*
  * 这就是我的会动的简历
  * 谢谢观看
  */
`



writeCode('',result,() => {  /*第一部分文字展示*/
    createPaper(() => {
        writeMarkdown(md,() => {  /*md文字展示*/
            writeCode(result,result2,() => {   /*第二部分文字展示*/
                MarkdownToHtml(() => {
                    writeCode(result+result2,result3,() => {});  /*第三部分文字展示*/
                });
            })
        });
    });
});




function createPaper(fn){
var paper = document.createElement('div');
paper.id = 'paper';
var content = document.createElement('pre');
content.className = 'content';
paper.appendChild(content);
document.body.appendChild(paper);
fn();
}


function MarkdownToHtml(fn){
    var pre = document.createElement('pre');
    pre.className = 'html markdownToHtml';
    pre.innerHTML = marked(md);
    var markdownContainer = document.querySelector('#paper>.content');
    markdownContainer.replaceWith(pre);
    fn();

}



