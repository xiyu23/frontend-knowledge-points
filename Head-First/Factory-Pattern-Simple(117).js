// 简单工厂方法：其实就是将各种判断创建具体对象的if-else，移动到一个函数里。
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 工厂方法：负责创建具体对象的方法就叫做工厂方法。
// 客户代码：就是使用者，比如这个订餐代码(PizzaStore中的orderPizza方法)中使用到了简单工厂，用它来创建pizza，那么"简单工厂"的客户就是"订餐代码"。
var SimpleFactory = /** @class */ (function () {
    function SimpleFactory() {
    }
    SimpleFactory.prototype.createPizza = function (type) {
        var pizza = null;
        switch (type) {
            case 'cheese':
                pizza = new CheesePizza();
                break;
            case 'clam':
                pizza = new ClamPizza();
                break;
            default:
                throw "unsupported pizza type: " + type;
        }
        return pizza;
    };
    return SimpleFactory;
}());
var Pizza = /** @class */ (function () {
    function Pizza() {
    }
    Pizza.prototype.prepare = function () {
        console.log("preparing '" + this.name + "' pizza...");
    };
    Pizza.prototype.bake = function () {
        console.log('baking...');
    };
    Pizza.prototype.cut = function () {
        console.log('cut...');
    };
    Pizza.prototype.box = function () {
        console.log('boxing..., done');
    };
    return Pizza;
}());
var CheesePizza = /** @class */ (function (_super) {
    __extends(CheesePizza, _super);
    function CheesePizza() {
        var _this = _super.call(this) || this;
        _this.name = 'Cheese';
        return _this;
    }
    return CheesePizza;
}(Pizza));
var ClamPizza = /** @class */ (function (_super) {
    __extends(ClamPizza, _super);
    function ClamPizza() {
        var _this = _super.call(this) || this;
        _this.name = 'Clam';
        return _this;
    }
    return ClamPizza;
}(Pizza));
// 客户代码 START
var PizzaStore = /** @class */ (function () {
    function PizzaStore(factory) {
        this.pizzaFactory = factory;
    }
    PizzaStore.prototype.orderPizza = function (type) {
        // #1 不管具体是什么pizza，我们只是面向pizza接口编程，只知道返回的pizza支持下面的方法即可
        var pizza = this.createPizza(type);
        pizza.prepare();
        pizza.bake();
        pizza.cut();
        pizza.box();
    };
    PizzaStore.prototype.createPizza = function (type) {
        return this.pizzaFactory.createPizza(type);
    };
    return PizzaStore;
}());
// 测试：
var simpleFactory = new SimpleFactory();
var pizzaStore = new PizzaStore(simpleFactory);
pizzaStore.orderPizza('clam');
pizzaStore.orderPizza('cheese');
// 客户代码 END
