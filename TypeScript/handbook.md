# TypeScript HandBook

### 1. any
不确定类型时可以为之指定***any***类型，这样就会避开ts的type-checking。
另外，可以调用any类型变量的任何方法，而Object则不行。

    let notsure: any = 4;  
    notSure.ifItExists(); // okay

    let prettySure: Object = 4;  
    prettySure.toFixed(); // Error: 'toxFixed' doesn't exist on type 'Object'


