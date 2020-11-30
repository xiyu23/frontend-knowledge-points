// 命令模式：客户不直接操作动作的接收者（这俩解耦），而是操作一个命令对象，这个对象封装了一个具体的命令，客户需要执行某个具体命令时，
// 就创建一个具体的命令对象，并调用"执行"动作即可（命令对象只提供一个execute执行方法，客户并不关心具体怎么执行）。
// 命令模式的好处，即将客户和动作的接收者解耦，中间由命令对象来连接它俩。
// 还有个牛逼之处，如书中所言，要让每个命令支持undo操作变得容易（直接给命令对象接口ICommand增加一个undo方法，具体的命令对象实现时调用
// 接收者去做undo

interface ICommand {
  execute(): void
  undo(): void
}

class Light {
  name: String
  constructor(name: String) {
    this.name = name;
  }
  on() {
    console.log(this.name + ' light is on');
  }
  
  off() {
    console.log(this.name + ' light is off');
  }
}

class FoShanLight extends Light {
  constructor() {
    super('FoShan');
  }
}

class JinZhouLight extends Light {
  constructor() {
    super('JinZhou');
  }
}

class LightOnCmd implements ICommand {
  light: Light
  constructor(light: Light) {
    this.light = light;
  }
  execute() {
    this.light.on();
  }
  undo() {
    console.log('undo lightOn');
    this.light.off();
  }
}

class LightOffCmd implements ICommand {
  light: Light
  constructor(light: Light) {
    this.light = light;
  }
  execute() {
    this.light.off();
  }
  undo() {
    console.log('undo lightOff');
    this.light.on();
  }
}

// enum SPEED {
//   OFF = 'off',
//   LOW = 'low',
//   MIDDLE = 'middle',
//   HIGH = 'high',
// };

enum SPEED {
  OFF,
  LOW,
  MIDDLE,
  HIGH,
};

class AirConditioner {
  name: String
  speed: SPEED = SPEED.OFF;
  constructor(name: String) {
    this.name = name;
  }
  off() {
    this.setSpeed(SPEED.OFF);
  }
  getSpeed() {
    return this.speed;
  }
  setSpeed(speed: SPEED) {
    this.speed = speed;
    console.log(this.name + ' AirConditioner\'s speed is set to: ' + speed);
  }
  setLow() {
    this.setSpeed(SPEED.LOW);
  }
  setMiddle() {
    this.setSpeed(SPEED.MIDDLE);
  }
  setHigh() {
    this.setSpeed(SPEED.HIGH);
  }
}

class GeLiAirConditioner extends AirConditioner {
  constructor() {
    super('GeLi');
  }
}

class AirConditionerOffCmd implements ICommand {
  airConditioner: AirConditioner
  prevSpeed: SPEED
  constructor(airConditioner: AirConditioner) {
    this.airConditioner = airConditioner;
  }
  execute() {
    this.prevSpeed = this.airConditioner.getSpeed();
    this.airConditioner.off();
  }
  undo() {
    if (this.prevSpeed === SPEED.LOW) {
      this.airConditioner.setLow();
    } else if (this.prevSpeed === SPEED.MIDDLE) {
      this.airConditioner.setMiddle();
    } else if (this.prevSpeed === SPEED.HIGH) {
      this.airConditioner.setHigh();
    } else if (this.prevSpeed === SPEED.OFF) {
      this.airConditioner.off();
    }
  }
}

class AirConditionerLowTempCmd implements ICommand {
  airConditioner: AirConditioner
  prevSpeed: SPEED
  constructor(airConditioner: AirConditioner) {
    this.airConditioner = airConditioner;
  }
  execute() {
    this.prevSpeed = this.airConditioner.getSpeed();
    this.airConditioner.setLow();
  }
  undo() {
    if (this.prevSpeed === SPEED.LOW) {
      this.airConditioner.setLow();
    } else if (this.prevSpeed === SPEED.MIDDLE) {
      this.airConditioner.setMiddle();
    } else if (this.prevSpeed === SPEED.HIGH) {
      this.airConditioner.setHigh();
    } else if (this.prevSpeed === SPEED.OFF) {
      this.airConditioner.off();
    }
  }
}

class AirConditionerMiddleTempCmd implements ICommand {
  airConditioner: AirConditioner
  prevSpeed: SPEED
  constructor(airConditioner: AirConditioner) {
    this.airConditioner = airConditioner;
  }
  execute() {
    this.prevSpeed = this.airConditioner.getSpeed();
    this.airConditioner.setMiddle();
  }
  undo() {
    if (this.prevSpeed === SPEED.LOW) {
      this.airConditioner.setLow();
    } else if (this.prevSpeed === SPEED.MIDDLE) {
      this.airConditioner.setMiddle();
    } else if (this.prevSpeed === SPEED.HIGH) {
      this.airConditioner.setHigh();
    } else if (this.prevSpeed === SPEED.OFF) {
      this.airConditioner.off();
    }
  }
}

class AirConditionerHighTempCmd implements ICommand {
  airConditioner: AirConditioner
  prevSpeed: SPEED
  constructor(airConditioner: AirConditioner) {
    this.airConditioner = airConditioner;
  }
  execute() {
    this.prevSpeed = this.airConditioner.getSpeed();
    this.airConditioner.setHigh();
  }
  undo() {
    if (this.prevSpeed === SPEED.LOW) {
      this.airConditioner.setLow();
    } else if (this.prevSpeed === SPEED.MIDDLE) {
      this.airConditioner.setMiddle();
    } else if (this.prevSpeed === SPEED.HIGH) {
      this.airConditioner.setHigh();
    } else if (this.prevSpeed === SPEED.OFF) {
      this.airConditioner.off();
    }
  }
}


// usage
// receiver
var light = new JinZhouLight();
var lightOn = new LightOnCmd(light); // command object, set receiver
var lightOff = new LightOffCmd(light);
var undoCommand = null;

// invoke
lightOn.execute();
undoCommand = lightOn;

// undo
undoCommand.undo();

lightOn.execute();
undoCommand = lightOn;

lightOff.execute();
undoCommand = lightOff;

undoCommand.undo();

// 空调
var ac = new AirConditioner('笑笑家的');
var acOffCmd = new AirConditionerOffCmd(ac);
var acLowCmd = new AirConditionerLowTempCmd(ac);
var acMidCmd = new AirConditionerMiddleTempCmd(ac);
var acHigCmd = new AirConditionerHighTempCmd(ac);

acLowCmd.execute();
undoCommand = acLowCmd;
undoCommand.undo();

acHigCmd.execute();
undoCommand = acHigCmd;

acMidCmd.execute();
undoCommand = acMidCmd;

undoCommand.undo();

acOffCmd.execute();
undoCommand = acOffCmd;

undoCommand.undo();