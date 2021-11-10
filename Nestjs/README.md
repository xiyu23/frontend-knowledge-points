## 

## 2、路由

|HTTP Method|访问URI|对应handler|-|
|-|-|-|-|
|GET|/greet/hello|getHello|-|
|GET|/greet/somebody?name=yuhui|greetSomebody|-|
|GET|/greet/xiao|greetXiao|-|

```ts
// app.controller.ts
import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller('greet')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('somebody')
  greetSomebody(@Req() request: Request): string {
    const {
      name = 'unknown',
    } = request.query;
    return `hi ${name}!`;
  }

  @Get('xiao')
  greetXiao(): string {
    return 'hi xiao!';
  }
}

```

`@Controller`装饰器指明controller的一级路由，而类中每个方法都可以是二级路由，方法名可以任意写，通过`@Get`来修饰表明可以处理`GET`方法，而参数就是二级路径。

`greetSomebody`示例了可以在handler中取到request object。