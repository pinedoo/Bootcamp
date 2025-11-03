import { LitElement, html, css } from "https://unpkg.com/lit?module";

class TimeSegment extends LitElement {
  static properties = { value: {type: Number}, label: {type: String}, pad: {type: String} };

  static styles = css`
    span {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      padding: 6px 10px;
      background: #f3f6ff;
      border-radius: 6px;
      font-family: sans-serif;
      margin: 2px;
    }
    span strong {
      font-size: 1.2rem;
      font-weight: bold;
    }
  `;

  formatValue(v) {
    return this.pad === "2" ? String(v).padStart(2, "0") : String(v);
  }

  render() {
    return html`
      <span>
        <strong>${this.formatValue(this.value)}</strong>
        <small>${this.label}</small>
      </span>
    `;
  }
}
customElements.define("time-segment", TimeSegment);


class TimerDisplay extends LitElement {
  static properties = {
    days:{type:Number}, hours:{type:Number},
    minutes:{type:Number}, seconds:{type:Number},
    pad:{type:String},
    showDays:{type:Boolean,attribute:"show-days"},
    showHours:{type:Boolean,attribute:"show-hours"},
    showMinutes:{type:Boolean,attribute:"show-minutes"},
    showSeconds:{type:Boolean,attribute:"show-seconds"}
  };

  static styles = css`
    :host {
      display: flex;
      gap: 6px;
      margin-bottom: 8px;
      font-family: sans-serif;
    }
  `;

  render() {
    return html`
      ${this.showDays ? html`<time-segment .value=${this.days} label="d" pad=${this.pad}></time-segment>`: ""}
      ${this.showHours? html`<time-segment .value=${this.hours} label="h" pad=${this.pad}></time-segment>`: ""}
      ${this.showMinutes? html`<time-segment .value=${this.minutes} label="m" pad=${this.pad}></time-segment>`: ""}
      ${this.showSeconds? html`<time-segment .value=${this.seconds} label="s" pad=${this.pad}></time-segment>`: ""}
    `;
  }
}
customElements.define("timer-display", TimerDisplay);

class TimerControls extends LitElement {
  static properties = { controls: {type: String} };

  static styles = css`
    :host { display: flex; gap: 8px; }
    button {
      padding: 6px 12px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      background: #1d72ff;
      color: white;
      font-size: 0.9rem;
      font-family: sans-serif;
    }
    button:hover {
      background: #125bd4;
    }
    button.secondary {
      background: #555;
    }
    button.secondary:hover {
      background: #333;
    }
  `;

  emit(type) {
    this.dispatchEvent(new CustomEvent(type, { bubbles: true, composed: true }));
  }

  render() {
    const list = (this.controls || "").split(",")
    return html`
      ${list.includes("play")? html`<button @click=${()=>this.emit("play")}>Play</button>`: ""}
      ${list.includes("pause")? html`<button class="secondary" @click=${()=>this.emit("pause")}>Pause</button>`: ""}
      ${list.includes("reset")? html`<button class="secondary" @click=${()=>this.emit("reset")}>Reset</button>`: ""}
    `;
  }
}
customElements.define("timer-controls", TimerControls);

class CountdownTimer extends LitElement {
  static properties = {
    days:{type:Number}, hours:{type:Number},
    minutes:{type:Number}, seconds:{type:Number},
    pad:{type:String}, controls:{type:String},
    remaining:{state:true}
  };

  static styles = css`
    :host {
      display: inline-block;
      padding: 12px;
      border: 1px solid #dfe3f1;
      border-radius: 8px;
      font-family: sans-serif;
      margin: 6px 0;
      background: white;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    const d=(+this.getAttribute("days")||0)*86400;
    const h=(+this.getAttribute("hours")||0)*3600;
    const m=(+this.getAttribute("minutes")||0)*60;
    const s=+this.getAttribute("seconds")||0;
    this.remaining=d+h+m+s;
  }

  startTimer(){
    if(this.interval) return;
    this.dispatchEvent(new CustomEvent("timer-play",{bubbles:true,composed:true}));
    this.interval=setInterval(()=>{
      this.remaining--;
      if(this.remaining<=0) this.finish();
      this.requestUpdate();
    },1000);
  }
  pauseTimer(){
    clearInterval(this.interval);
    this.interval=null;
    this.dispatchEvent(new CustomEvent("timer-pause",{bubbles:true,composed:true}));
  }
  resetTimer(){
    this.pauseTimer();
    this.connectedCallback();
    this.dispatchEvent(new CustomEvent("timer-reset",{bubbles:true,composed:true}));
  }
  finish(){
    this.pauseTimer();
    this.remaining=0;
    this.dispatchEvent(new CustomEvent("timer-finish",{bubbles:true,composed:true}));
  }

  timeParts(sec){
    return{
      days:Math.floor(sec/86400),
      hours:Math.floor(sec%86400/3600),
      minutes:Math.floor(sec%3600/60),
      seconds:sec%60
    };
  }

  render(){
    const t=this.timeParts(this.remaining);
    return html`
      <timer-display
        .days=${t.days} .hours=${t.hours}
        .minutes=${t.minutes} .seconds=${t.seconds}
        pad=${this.pad}
        ?show-days=${this.hasAttribute("show-days")}
        ?show-hours=${this.hasAttribute("show-hours")}
        ?show-minutes=${this.hasAttribute("show-minutes")}
        ?show-seconds=${this.hasAttribute("show-seconds")}
      ></timer-display>

      <timer-controls
        controls=${this.controls}
        @play=${this.startTimer}
        @pause=${this.pauseTimer}
        @reset=${this.resetTimer}
      ></timer-controls>
    `;
  }
}
customElements.define("countdown-timer", CountdownTimer);
