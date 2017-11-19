const url=require('url');
//let str='//www.gongjuji.net/byte/?name=zhangsan#one';
let str='http://calc.gongjuji.net/byte/?name=zhangsan&age=18#one#two';
//let str='https://www.baidu.com:8080/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd=asdf&rsv_pq=f0d39c890002c5e9&rsv_t=1dd7WV2OmK1tbiDxpR3MMFAWwEIbv15YzPVssqUxcQ1XydNE5FDi7bo9fRk&rqlang=cn&rsv_enter=1&rsv_sug3=4&rsv_sug1=1&rsv_sug7=100&rsv_sug2=0&inputT=249&rsv_sug4=248';
let obj=url.parse(str,true,true);
console.log(obj);

/*
一、url.parse();
1.引入url模块
const url=require('url');
2.url.parse(str,parseQueryString,slashesDenoteHost);  //将url字符串转换为object对象

  str:需要处理的字符串
  parseQueryString:是否将查询的参数解析成对象。如果为true,将参数解析成对象。默认为false,不解析
  slashesDenoteHost：解析主机处理，双斜线表示主机。默认为false，//foo/bar 形式的字符串将被解释成 { pathname: ‘//foo/bar' }
                     如果设置成true，//foo/bar 形式的字符串将被解释成  { host: ‘foo', pathname: ‘/bar' }
3.只解析url字符串
const url=require('url');
let str='http://calc.gongjuji.net/byte/?name=zhangsan&age=18#one#two';
let obj=url.parse(str);
console.log(obj);

输出：
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'calc.gongjuji.net',
  port: null,
  hostname: 'calc.gongjuji.net',
  hash: '#one#two',
  search: '?name=zhangsan&age=18',
  query: 'name=zhangsan&age=18',
  pathname: '/byte/',
  path: '/byte/?name=zhangsan&age=18',
  href: 'http://calc.gongjuji.net/byte/?name=zhangsan&age=18#one#two'
}
其中的query:
query: 'name=zhangsan&age=18', 是按原url字符输出。
其中的pathname:
pathname: '/byte/',输出的是路径

4.指定将url字符串解析成object对象
const url=require('url');
let str='http://calc.gongjuji.net/byte/?name=zhangsan&age=18#one#two';
let obj=url.parse(str,true);
console.log(obj);


输出：
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'calc.gongjuji.net',
  port: null,
  hostname: 'calc.gongjuji.net',
  hash: '#one#two',
  search: '?name=zhangsan&age=18',
  query: { name: 'zhangsan', age: '18' },
  pathname: '/byte/',
  path: '/byte/?name=zhangsan&age=18',
  href: 'http://calc.gongjuji.net/byte/?name=zhangsan&age=18#one#two'
}

其中的query:
query: { name: 'zhangsan', age: '18' }, 被解析成object对象 输出。
其中的pathname:
pathname: '/byte/',输出的是路径

5.解析主机
const url=require('url');
let str='//www.gongjuji.net/byte/?name=zhangsan#one';
let obj=url.parse(str,true);
console.log(obj);
输出：
Url {
  protocol: null,
  slashes: true,
  auth: null,
  host: 'www.gongjuji.net',
  port: null,
  hostname: 'www.gongjuji.net',
  hash: '#one',
  search: '?name=zhangsan',
  query: { name: 'zhangsan' },
  pathname: '/byte/',
  path: '/byte/?name=zhangsan',
  href: '//www.gongjuji.net/byte/?name=zhangsan#one'
}

其中的host、hostname被解析出来




二、url.format(urlObj);
将json对象格式化成url字符串。和url.parse()相反。不作示例了。
三、url.resolve(from,to);
返回从根目录指定到当前目录的绝对路径url
1.返回结果去除了参数和锚点
2.返回结果标准url路径格式
*/
