import React, { Component, Fragment } from "react";
import "./Dashboard.scss";
import { connect } from "react-redux";
import {
  addDataToAPI,
  getDataFromAPI,
  updateDataAPI,
  removeDataAPI,
} from "../../../config/redux/action";

class Dashboard extends Component {
  state = {
    title: "",
    content: "",
    date: "",
    textButton: "Simpan!",
    noteId: "",
  };

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    this.props.getNotes(userData.uid);
  }

  handleChangeText = (e, type) => {
    this.setState({
      [type]: e.target.value,
    });
  };

  handleSaveNotes = () => {
    const { title, content, textButton, noteId } = this.state;
    const { saveNotes, updateNotes } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));

    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: userData.uid,
    };

    if (textButton === "Simpan!") {
      saveNotes(data);
    } else {
      data.noteId = noteId;
      updateNotes(data);
    }
  };

  updateNotes = (note) => {
    this.setState({
      title: note.data.title,
      content: note.data.content,
      textButton: "Ubah!",
      noteId: note.id,
    });
  };

  cancelUpdate = () => {
    this.setState({
      title: "",
      content: "",
      textButton: "Simpan!",
    });
  };

  deleteNote = (e, note) => {
    e.stopPropagation();
    const { deleteNote } = this.props;

    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      userId: userData.uid,
      noteId: note.id,
    };
    deleteNote(data);
  };

  render() {
    const { title, content, textButton } = this.state;
    const { notes } = this.props;
    const { cancelUpdate, updateNotes, deleteNote } = this;
    return (
      <div className="container">
        <div className="input-form">
          <input
            placeholder="title"
            className="input-title"
            type="text"
            value={title}
            onChange={(e) => this.handleChangeText(e, "title")}
          />
          <textarea
            placeholder="content"
            className="input-content"
            value={content}
            onChange={(e) => this.handleChangeText(e, "content")}
          />
          <div className="action-wrapper">
            {textButton === "Ubah!" ? (
              <button className="save-btn cancel" onClick={cancelUpdate}>
                Cancel
              </button>
            ) : (
              <div />
            )}
            <button className="save-btn" onClick={this.handleSaveNotes}>
              {textButton}
            </button>
          </div>
        </div>
        <hr />
        {notes.length > 0 ? (
          <Fragment>
            {notes.map((note) => {
              return (
                <div
                  className="card-content"
                  key={note.id}
                  onClick={() => updateNotes(note)}
                >
                  <p className="title">{note.data.title}</p>
                  <p className="date">{note.data.date}</p>
                  <p className="content">{note.data.content}</p>
                  <div
                    className="delete-btn"
                    onClick={(e) => deleteNote(e, note)}
                  >
                    &#215;
                  </div>
                </div>
              );
            })}
          </Fragment>
        ) : null}
      </div>
    );
  }
}

const reduxState = (state) => ({
  userData: state.user,
  notes: state.notes,
});

const reduxDispatch = (dispatch) => ({
  saveNotes: (data) => dispatch(addDataToAPI(data)),
  getNotes: (data) => dispatch(getDataFromAPI(data)),
  updateNotes: (data) => dispatch(updateDataAPI(data)),
  deleteNote: (data) => dispatch(removeDataAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Dashboard);
