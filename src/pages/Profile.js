import React from 'react';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import './Profile.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      dataUser: {},
      loading: false,
      inputDisable: true,
    };
  }

  componentDidMount() {
    this.dataName();
  }

  handleClick() {
    const { inputDisable } = this.state;
    this.setState({ inputDisable: !inputDisable });
  }

  handleSave() {
    const { newName, newEmail } = this.state;
    updateUser({ name: newName, email: newEmail }).then(() => {
      window.location.reload(false);
    });
  }

  handleClickImage() {
    console.log('Ainda não implemantado');
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    this.setState({
      [name]: value,
    });
    console.log(this.state);
  }

  dataName = async () => {
    this.setState({ loading: true });
    const getNameUser = await getUser();
    this.setState({ dataUser: getNameUser, loading: false });
  }

  render() {
    const { dataUser, loading, inputDisable } = this.state;
    return (
      <div className="page">
        <div className="conteinerMenu">
          <Header />
        </div>
        <div className="resultsProfile">
          <h2 className="fs-6"> Profile Info </h2>
          {(!loading)
            ? (
              <div>
                <div className="input-group mb3">
                  <button
                    className="btn btn-outline-success"
                    type="button"
                    id="button-addon1"
                    onClick={ () => this.handleClick() }
                  >
                    Edit Profile
                  </button>
                  <input
                    className="form-control"
                    type="text"
                    name="newName"
                    disabled={ inputDisable }
                    placeholder={ dataUser.name }
                    aria-describedby="button-addon1"
                    onChange={ this.handleChange }
                  />
                </div>
                <div className="mb3">
                  <input
                    className="form-control"
                    type="text"
                    name="newEmail"
                    disabled={ inputDisable }
                    placeholder={ dataUser.email ? dataUser.email : 'email' }
                    onChange={ this.handleChange }
                  />
                </div>
                <div className="input-group mb3">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon1"
                    onClick={ () => this.handleClickImage() }
                  >
                    Click to add
                  </button>
                  <input
                    className="form-control"
                    type="text"
                    name="newImage"
                    disabled
                    placeholder={ dataUser.image ? dataUser.image : 'profile image' }
                    onChange={ this.handleChange }
                  />
                </div>
                <br />
                <button
                  className="btn btn-success btnProfile"
                  type="button"
                  onClick={ () => this.handleSave() }
                >
                  Save
                </button>
              </div>
            )
            : <span>...</span>}
        </div>
      </div>
    );
  }
}

export default Profile;
