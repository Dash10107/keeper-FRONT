import React, { useState, useEffect } from "react";

import Grid from '@mui/material/Grid';

import axios from "axios";

import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import EditModal from "./components/EditModal";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(0);
  const URL = "http://localhost:4000";

  const getModal = (id) => {
    setShowModal(id);
  };

  // Get list from database on page load
  useEffect(() => {
    getList();
  }, []);

  // READ
  const getList = () => {
    axios
      .get(URL + "/notes",{crossdomain: true})
      .then((res) => {
        console.log(res.data);
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // UPDATE
  const hideModal = (id, data) => {
    if (data.title === "" && data.content === "") {
      deleteNote(id);
    } else {
      // eslint-disable-next-line no-template-curly-in-string
      axios.patch(URL + '/notes/update/' + id, data).then(() => {
        getList();
      });
    }
    setShowModal(0);
  };

  // DELETE
  const deleteNote = (id) => {
    // eslint-disable-next-line no-template-curly-in-string
    axios.delete(URL + '/notes/' + id,{crossdomain: true}).then(() => {
      setNotes((prevNotes) => {
        return prevNotes.filter((note) => note._id !== id);
      });
    });
  };

  return (
    <div className="fullPage">
      <Header />

      <div className="listArea">
        <Grid container>
          <CreateArea onAdd={getList} URL={URL} />
        </Grid>

        <Grid container spacing={0}>
          {notes.map((noteItem) => {
            const { _id, title, content, updatedAt } = noteItem;
            return (
              <Grid
                container
                item
                xs={12}
                sm={6}
                md={3}
                spacing={0}
                key={"gridKey" + _id}
              >
                <Note
                  key={"noteKey" + _id}
                  id={_id}
                  title={title}
                  content={content.substring(0,25)}
                  onDelete={deleteNote}
                  onEdit={() => getModal(_id)}
                />
                <EditModal
                  key={"modalKey" + _id}
                  id={_id}
                  openState={showModal === _id}
                  handleOnClose={hideModal}
                  title={title}
                  content={content}
                  time={updatedAt}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>

      <Footer />
    </div>
  );
};

export default App;