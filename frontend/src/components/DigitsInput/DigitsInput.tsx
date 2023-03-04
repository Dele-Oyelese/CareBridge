import React from "react";
import "./styles.scss";
import { Machine, interpret, assign } from "xstate";
import useDigitInput from "react-digit-input";
import { useNavigate } from "react-router-dom";

const CODE = "00000";
const INITIALS = "AA";

type LockContext = {
  code: string;
  codeInitials: string;
  digits: string;
  initials: string;
};

const stateMachine = Machine<LockContext>(
  {
    id: "lock",
    initial: "locked",
    context: {
      code: CODE,
      codeInitials: INITIALS,
      digits: "",
      initials: ""
    },
    states: {
      locked: {
        on: {
          ENTER_DIGITS: {
            target: "locked",
            actions: assign({
              digits: (_context, event) => {
                return event.payload;
              }
            })
          },
          ENTER_INITIALS: {
            target: "locked",
            actions: assign({
              initials: (_context, event) => {
                return event.payload;
              }
            })
          },
          PRESS_BUTTON: [
            {
              target: "open",
              cond: "isCodeCorrect"
            }
          ]
        }
      },
      open: {
        on: {
          LOCK: "locked"
        }
      }
    }
  },
  {
    guards: {
      isCodeCorrect: (context) => {
        return context.code === context.digits && context.codeInitials === context.initials.toUpperCase();
      }
    }
  }
);

export default function Lock() {
  const [state, setState] = React.useState(stateMachine.initialState);
  const navigate = useNavigate();
  let errorMessage = "";

  const service = React.useMemo(() => {
    const service = interpret(stateMachine);
    service.onTransition((state) => {
      setState(state);
    });
    service.start();

    return service;
  }, []);

  const handleDigitsChange = (value: string) => {
    service.send({ type: "ENTER_DIGITS", payload: value });
  };

  const handleInitialsChange = (value: string) => {
    service.send({ type: "ENTER_INITIALS", payload: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    service.send({ type: "PRESS_BUTTON" });
    if (service.state.value === "open") {
      redirect();
    }
    errorMessage = "Incorrect code or initial. Please try again.";
  };

  const digits = useDigitInput({
    acceptedCharacters: /^[0-9]$/,
    length: CODE.length,
    value: state.context.digits,
    onChange: handleDigitsChange
  });

  const initials = useDigitInput({
    acceptedCharacters: /^[A-Za-z]$/,
    length: INITIALS.length,
    value: state.context.initials,
    onChange: handleInitialsChange
  });

  const redirect = () => {
      navigate("/");
  };

  const renderLocked = () => (
    <form onSubmit={handleSubmit}>
      <p className="h1 text-dark">Welcome to <b>CareBridge</b></p>
      <img src="https://static.vecteezy.com/system/resources/thumbnails/002/265/272/small_2x/bridge-building-logo-design-template-icon-free-vector.jpg" alt="Placeholder Bridge Logo"/>
      <p className="h4 text-dark">Your family member has invited you</p>
      <p className="h4 text-dark"><strong>JANE SMITH</strong></p>
      <p className="h4 text-dark">to receive automated updates on their care in hospital or urgent care.</p>
      <p className="h4 text-dark">To confirm you want updates on this family member that has identified you as a primary contact and family designate for phone calls, please enter the code and patient initials given to you.</p>
      <p>Enter the 5-digit code</p>
      <div className="form-row w-75 mx-auto">
        {Array.from(CODE).map((_, i) => (
          <div className="form-group col" key={i}>
            <div className="input-group">
              <input
                className="form-control text-center"
                inputMode="decimal"
                {...digits[i]}
              />
            </div>
          </div>
        ))}
      </div>
      <p>Enter the patient initials</p>
      <div className="form-row w-25 mx-auto">
        {Array.from(INITIALS).map((_, i) => (
          <div className="form-group col" key={i}>
            <div className="input-group">
              <input
                className="form-control text-center"
                inputMode="text"
                {...initials[i]}
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <button type="submit" className="btn btn-primary btn-block">
          Authenticate
        </button>
      </div>
    </form>


  );

  return (
    <div className="border rounded-lg bg-white p-3 text-center">
      {renderLocked()}
    </div>
  );
}
