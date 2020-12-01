const M = 8;

let i = 0;

function getI() {
  return i;
}

function setI(val) {
  i = val;
}
let liveBlocks = [[], [], []];
const members = []
for (let i = 0; i < 10; i++) {
  members.push({
    name: `yuhui-${i}`,
    age: 26,
  });
}

onMembersChange(members);

function addMember(pos = 0) {
  const no = parseInt(Math.random()*100);
  console.log(`insert 'yuhui-${no}' at pos ${pos}`);
  members.splice(pos, 0, {name: `yuhui-${no}`, age: 8});

  onMembersChange(members);
}

function removeMember(pos) {
  if(isNaN(pos) || pos < 0 || members.length <= pos) {
    console.warn(`removeMember failed: pos ${pos} should be ∈[0, ${members.length})`);
    return;
  }
  console.log(`remove members[${pos}](${members[pos].name})`);
  members.splice(pos, 1);

  onMembersChange(members);
}

function onMembersChange(members) {
  const blocks = toBlocks(members);
  const liveBlocks = getWindowBlocks(blocks);

  
}

function getWindowBlocks(blocks) {
  const blocksLen = blocks.length;
  if (getI() < 0 || blocksLen <= getI()) {
    if (getI() < 0) {
      throw 'i cannot be 0, how does it happened?';
    }

    console.warn(`window index changed from ${getI()} to ${blocksLen - 1}`);
    setI(blocksLen - 1);
  }

  const i = getI();
  const liveBlocks = [];
  liveBlocks.push(0 <= i - 1 ? blocks[i - 1] : []);
  liveBlocks.push(blocks[i]);
  liveBlocks.push(i + 1 < blocksLen ? blocks[i + 1] : []);

  console.log(`liveBlocks:
  左窗口：[${i-1}](len=${liveBlocks[0].length}
  可见窗口：[${i}](len=${liveBlocks[1].length}
  右窗口：[${i+1}](len=${liveBlocks[2].length}
  `);
  return liveBlocks;
}

function toBlocks(members) {
  let blocks = [];
  for (let i = 0, l = members.length; i < l;) {
    const block = [];
    for (let j = 0; j < M && i < l; j++) {
      block.push(members[i++]);
    }
    blocks.push(block);
    console.log(`blocks[${Math.ceil(i / M) - 1}].length = ${block.length}`);
  }
  return blocks;
}

// webview
/**
 * 
 * @param {是否向左滑动} isSlideLeft 
 * @param {滑动窗口状态} state 
 */
function doAnimation(isSlideLeft, state) {
  // calculate animation transform infomation
  var LC; // left-win component
  var MC; // middle-win component
  var RC; // right-win component

  var transLC = new BlockTransformInfo({ component: LC });
  var transMC = new BlockTransformInfo({ component: MC });
  var transRC = new BlockTransformInfo({ component: RC });

  if (isSlideLeft) {
    if (state === 0) {
      transLC.setRange(0, 200);
      transMC.setRange(0, -100);
      transRC.setRange(0, -100);
    } else if (state === 1) {
      transLC.setRange(200, 100);
      transMC.setRange(-100, 100);
      transRC.setRange(-100, -200);
    } else if (state === 2) {
      transLC.setRange(100, 0);
      transMC.setRange(100, 0);
      transRC.setRange(-200, 0);
    } else {
      console.log('[error] invalid state got: ' + state);
    }
  } else {
    if (state === 0) {
      transLC.setRange(0, 100);
      transMC.setRange(0, 100);
      transRC.setRange(0, -200);
    } else if (state === 1) {
      transLC.setRange(200, 0);
      transMC.setRange(-100, 0);
      transRC.setRange(-100, 0);
    } else if (state === 2) {
      transLC.setRange(100, 200);
      transMC.setRange(100, -100);
      transRC.setRange(-200, -100);
    } else {
      console.log('[error] invalid state got: ' + state);
    }
  }

  var speed = 50;
  var move = 0;
  var timerID = setInterval(step, 1000);

  function step() {
    move += speed;
    if (100 < move) {
      move = 100;
    }

    if (move <= 100) {
      transLC.move(move);
      transMC.move(move);
      transRC.move(move);
    } else {
      // animation stop
      console.log('animation stopped');
      clearInterval(timerID);
      transLC.hoist();
      transMC.hoist();
      transRC.hoist();
    }
  }
  
}

function BlockTransformInfo(props) {
  this.component = props.component;
  this.from = props.from || 0;
  this.to = props.to || 0;
  this._isFast = this.to - this.from === 200;

  this.setFrom = function(val) {
    this.from = val;
    this._isFast = this.to - this.from === 200;
  }
  this.setTo = function(val) {
    this.to = val;
    this._isFast = this.to - this.from === 200;
  }
  this.setRange = function(from, to) {
    this.setFrom(from);
    this.setTo(to);
    
    // ASSERT
    if (![100, 200].includes(Math.abs(to - from))) {
      console.log('[error] from/to set invalid, expected either 100 or 200, but got from = ' + from + ', to = ' + to);
    }
  }
  this.isFast = function() {
    return this._isFast;
  }
  /**
   * 设置组件的CSS
   * @param {偏移量} offset 
   */
  this.move = function(offset) {
    if (this.isFast()) {
      console.log(`[move][fast] ${this.to + (this.to > this.from ? 2*offset : -2*offset)}`);
      // this.component.setStyle({
      //   transform: `translateX(${this.to + (this.to > this.from ? 2*offset : -2*offset)}%)`,
      //   zIndex: '-1',
      //   position: 'relative',
      // });
    } else {
      console.log(`[move] ${this.to + (this.to > this.from ? offset : -offset)}`);
      // this.component.setStyle({
      //   transform: `translateX(${this.to + (this.to > this.from ? offset : -offset)}%)`,
      // });
    }
  }
  this.hoist = function() {
    if (this.isFast()) {
      console.log('hoist block to z-index: auto, position: static');
      // this.component.setStyle({
      //   zIndex: 'auto',
      //   position: 'static',
      // });
    }
  }
  
  return this;
}

// test cases
doAnimation(true, 0);