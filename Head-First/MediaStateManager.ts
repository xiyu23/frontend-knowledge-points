class State {
  mediaStateManager: MediaStateManager;

  constructor(mediaStateManager: MediaStateManager) {
    this.mediaStateManager = mediaStateManager;
  }

  /**
   * 开始媒体进房
   */
  join() {}
  /**
   * 媒体进房成功
   */
  joined() {}
  /**
   * 开始媒体退房
   */
  leave() {}
  /**
   * 媒体退房成功
   */
  left() {}
  /**
   * 媒体开始尝试恢复
   */
  recover() {}
  /**
   * 媒体被中断
   */
  interrupted() {}
}

class OutsideState extends State {
  constructor(mediaStateManager: MediaStateManager) {
    super(mediaStateManager);
  }

  join() {
    console.log('joining...');
    this.mediaStateManager.setState(this.mediaStateManager.getJoiningState());
  }
}

class JoiningState extends State {
  constructor(mediaStateManager: MediaStateManager) {
    super(mediaStateManager);
  }

  joined() {
    console.log('joined');
    this.mediaStateManager.setState(this.mediaStateManager.getJoinedState());
  }
}

class JoinedState extends State {
  constructor(mediaStateManager: MediaStateManager) {
    super(mediaStateManager);
  }

  leave() {
    console.log('leaving...');
    this.mediaStateManager.setState(this.mediaStateManager.getLeavingState());
  }

  interrupted() {
    console.log('interrupted!');
    this.mediaStateManager.setState(this.mediaStateManager.getInterruptedState());
  }
}

class LeavingState extends State {
  constructor(mediaStateManager: MediaStateManager) {
    super(mediaStateManager);
  }

  left() {
    console.log('left');
    this.mediaStateManager.setState(this.mediaStateManager.getOutsideState());
  }
}

class InterruptedState extends State {
  constructor(mediaStateManager: MediaStateManager) {
    super(mediaStateManager);
  }

  recover() {
    console.log('recovering...');
    this.mediaStateManager.setState(this.mediaStateManager.getRecoveringState());
  }

  leave() {
    console.log('leaving...');
    this.mediaStateManager.setState(this.mediaStateManager.getLeavingState());
  }
}

class RecoveringState extends State {
  constructor(mediaStateManager: MediaStateManager) {
    super(mediaStateManager);
  }

  joined() {
    console.log('recovered!');
    this.mediaStateManager.setState(this.mediaStateManager.getJoinedState());
  }
}



class MediaStateManager {
  state: State;

  outsideState: OutsideState;
  joiningState: JoiningState;
  joinedState: JoinedState;
  leavingState: LeavingState;
  interruptedState: InterruptedState;
  recoveringState: RecoveringState;

  constructor() {
    this.outsideState = new OutsideState(this);
    this.joiningState = new JoiningState(this);
    this.joinedState = new JoinedState(this);
    this.leavingState = new LeavingState(this);
    this.interruptedState = new InterruptedState(this);
    this.recoveringState = new RecoveringState(this);

    this.setState(this.getOutsideState());
  }

  setState(state: State) {
    this.state = state;
  }

  getOutsideState() {
    return this.outsideState;
  }
  getJoiningState() {
    return this.joiningState;
  }
  getJoinedState() {
    return this.joinedState;
  }
  getLeavingState() {
    return this.leavingState;
  }
  getInterruptedState() {
    return this.interruptedState;
  }
  getRecoveringState() {
    return this.recoveringState;
  }
  
  join() {
    this.state.join();
  }

  joined() {
    this.state.joined();
  }

  leave() {
    this.state.leave();
  }

  left() {
    this.state.left();
  }

  recover() {
    this.state.recover();
  }

  interrupted() {
    this.state.interrupted();
  }
}


// client code
const msm = new MediaStateManager();
msm.join();
msm.joined();
msm.leave();
msm.left();
msm.join();
msm.joined();
msm.interrupted();
msm.recover();
msm.joined();
msm.interrupted();
msm.leave();
msm.left();