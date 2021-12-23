import React, { useEffect, useState } from "react";
import { Form, Table, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import "./style.css";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contacts, setContacts] = useState([]);
  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem("contacts"));
  //   setContacts(data);
  // }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      name,
      email,
      id: uuidv4(),
    };
    if (name === "" || email === "") {
      alert("Please Enter Name And Email");
    } else {
      setContacts([...contacts, newContact]);
      localStorage.setItem(
        "contacts",
        JSON.stringify([newContact, ...contacts])
      );
      setName("");
      setEmail("");
    }
  };
  const remove = (id) => {
    const newItems = contacts.filter((item) => item.id !== id);
    setContacts(newItems);
    localStorage.setItem("contacts", JSON.stringify(newItems));
  };
  return (
    <div className="app">
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div className="display-contact">
        <h1>Your Contacts</h1>
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>SL.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          {contacts
            ? contacts.map((item, index) => {
                return (
                  <tbody key={item.id}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>
                        <button onClick={() => remove(item.id)}>Remove</button>
                      </td>
                    </tr>
                  </tbody>
                );
              })
            : null}
        </Table>
      </div>
    </div>
  );
};

export default App;
