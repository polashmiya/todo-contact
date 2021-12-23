import { useState } from "react";
import ContactManager from "./ContactManager";
import Todo from "./Todo";
import { Button } from "react-bootstrap";
const App = () => {
  const [openTodo, setOpenTodo] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const todoHandler = () => {
    if (openContact) {
      alert("Please Close the Contact First!");
    } else {
      setOpenTodo(!openTodo);
    }
  };
  const contactHandler = () => {
    if (openTodo) {
      alert("Plase Close the Todo Frist!");
    } else {
      setOpenContact(!openContact);
    }
  };
  return (
    <d>
      <div className="btn-group">
        {openTodo ? (
          <Button className="btn btn-danger" onClick={todoHandler}>
            Close Todo
          </Button>
        ) : (
          <Button className="mr-2" onClick={todoHandler}>
            Open Todo
          </Button>
        )}
        {openContact ? (
          <Button onClick={contactHandler} className="btn btn-danger">
            Close Contact Managment
          </Button>
        ) : (
          <Button onClick={contactHandler}>Open Contact Managemnet</Button>
        )}
      </div>
      {openTodo ? <Todo /> : null}
      {openContact ? <ContactManager /> : null}
    </d>
  );
};

export default App;
