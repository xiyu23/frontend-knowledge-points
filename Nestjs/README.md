## 

## 2、路由

|HTTP Method|访问URI|对应handler|-|
|-|-|-|-|
|GET|/greet/hello|getHello|-|
|GET|/greet/yu|greetYu|-|
|GET|/greet/xiao|greetXiao|-|

```ts
// app.controller.ts
@Controller('greet')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('yu')
  greetYu(): string {
    return 'hi yuhui!';
  }

  @Get('xiao')
  greetXiao(): string {
    return 'hi xiao!';
  }
}
```

`@Controller`装饰器指明controller的一级路由，而类中每个方法都可以是二级路由，方法名可以任意写，通过`@Get`来修饰表明可以处理`GET`方法，而参数就是二级路径。