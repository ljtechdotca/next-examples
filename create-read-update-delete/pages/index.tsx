import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Console from "../components/common/Console/Console";
import Container from "../components/common/Container/Container";
import List from "../components/common/List/List";
import Button from "../components/ui/Button/Button";
import { INIT_ITEM } from "../constants/init-item";
import { Action, ItemState, TargetState } from "../types";

const Home: NextPage = () => {
  const [target, setTarget] = useState<null | TargetState>(null);
  const [message, setMessage] = useState<null | string>(null);
  const [items, setItems] = useState<ItemState[]>([]);

  useEffect(() => {
    handleEvent({ type: "read" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEvent = async (action: Action) => {
    let response: Response;
    let json: any;
    console.log(action);
    switch (action.type) {
      case "create": // Create: POST fetch
        response = await fetch("/api/items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...INIT_ITEM() }),
        });
        json = await response.json();
        setTarget(null);
        setItems(json.payload);
        setMessage(json.message);
        break;

      case "read": // Read: GET fetch
        response = await fetch("/api/items");
        json = await response.json();
        setTarget(null);
        setItems(json.payload);
        setMessage(json.message);
        break;

      case "update": // Update: PUT fetch
        if (target) {
          response = await fetch(`/api/items?index=${target.index}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...target }),
          });
          json = await response.json();
          setTarget(null);
          setItems(json.payload);
          setMessage(json.message);
        }
        break;

      case "delete": // Delete: DELETE fetch
        response = await fetch(`/api/items?id=${action.value}`, {
          method: "DELETE",
        });
        json = await response.json();
        setTarget(null);
        setItems(json.payload);
        setMessage(json.message);
        break;

      case "target": // Sets the form target values
        setTarget({ ...action.value });
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Console message={message} />
        <Button
          label="Add Item"
          onClick={() => handleEvent({ type: "create" })}
        />
        {target && (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleEvent({ type: "update" });
            }}
          >
            <span>{target.id}</span>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(event) =>
                setTarget({ ...target, name: event.target.value })
              }
              value={target.name}
            />
            <Button type="submit" label="Submit" />
          </form>
        )}
        <List onEvent={(action) => handleEvent(action)} items={items} />
      </Container>
    </div>
  );
};

export default Home;
