import { $ } from "./selector.js";

function App($app) {
  this.state = {
    racingCarNames: [],
    tryCount: null,
    isInputDone: false,
  };

  const inputInit = new InputInit({
    $app,
    initialState: {
      racingCarNames: this.state.racingCarNames,
      tryCount: this.state.tryCount,
    },
    onSubmit: ({ value, isInputDone = false }) => {
      console.log(value);
      this.setState({
        ...this.state,
        ...value,
        ...isInputDone,
      });
    },
  });

  const road = new RacingRoad({
    $app,
    initialState: {
      racingCarNames: this.state.racingCarNames,
      tryCount: this.state.tryCount,
      isInputDone: this.state.isInputDone,
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    inputInit.setState({
      racingCarNames: this.state.racingCarNames,
      tryCount: this.state.tryCount,
    });
  };

  this.render = () => {
    // $app.innerHTML = "";
  };
}
function InputInit({ $app, initialState, onSubmit }) {
  this.$target = document.createElement("section");
  this.$target.className = "d-flex justify-center mt-5";
  $app.appendChild(this.$target);
  this.onSubmit = onSubmit;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `
  <form>
    <fieldset class="input-car-name">
      <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
      <p>
        5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
        예시) EAST, WEST, SOUTH, NORTH
      </p>
      <div class="d-flex">
        <input type="text" class="w-100 mr-2" placeholder="자동차 이름" value="${this.state.racingCarNames.join(
          ","
        )}" ${this.state.racingCarNames.length === 0 ? "" : "disabled"} />
        <button type="button" class="btn btn-cyan" ${
          this.state.racingCarNames.length === 0 ? "" : "disabled"
        }>확인</button>
      </div>
    </fieldset>
     ${
       this.state.racingCarNames.length === 0
         ? ""
         : `<fieldset class="input-count">
     <p>시도할 횟수를 입력해주세요.</p>
     <div class="d-flex">
       <input type="number" class="w-100 mr-2" placeholder="시도 횟수" value="${
         this.state.tryCount
       }" ${this.state.tryCount && "disabled"} />
       <button type="button" class="btn btn-cyan" ${
         this.state.tryCount && "disabled"
       }>확인</button>
     </div>
   </fieldset>`
     }
  </form>
`;
  };

  this.$target.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  this.$target.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      let value;
      if (e.target.type === "text") {
        value = {
          racingCarNames: e.target.value.split(","),
        };
      } else {
        value = {
          tryCount: Number(e.target.value),
        };
      }
      this.onSubmit(value);
    }
  });

  this.$target.addEventListener("click", (e) => {
    if (
      e.target.tagName === "BUTTON" &&
      e.target.previousElementSibling.tagName === "INPUT"
    ) {
      let value;
      if (e.target.previousElementSibling.type === "text") {
        value = {
          racingCarNames: e.target.previousElementSibling.value.split(","),
        };
      } else {
        value = {
          tryCount: Number(e.target.previousElementSibling.value),
        };
      }
      this.onSubmit({ value, isInputDone: true });
    }
  });

  this.render();
}

function RacingRoad({ $app, initialState }) {
  this.$target = document.createElement("section");
  this.$target.className = "d-flex justify-center mt-5";
  $app.appendChild(this.$target);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  console.log(this.state);

  this.render = () => {
    this.$target.innerHTML = `a`;
  };

  this.render();
}

function car({ $app, initialState }) {
  // this.state = initialState
  // this.setState = (nextState) => {
  //   this.state = nextState
  //   this.render();
  // }
}

new App($("#app"));
