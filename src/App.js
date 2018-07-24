import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CustomDropdown from './customDropdown';

class App extends Component {
  constructor(){
    super();
    this.state = {
      filterList: ["1","2","3"]
    }
  }
  componentWillMount() {
    // let state = this._constructComponent(this.props);
    // this.setState({ ...state});
  }

  componentWillReceiveProps(receivedProps) {
    // let state = this._constructComponent(receivedProps);
    // this.setState({ ...state});
  }

  createNewDropdownClick(){
    this.setState(prevState => {
      return {
          createNewDropdownOpen: !prevState.createNewDropdownOpen
      };
  });
  }
  
  getFilterName(key, value, state){
    this.setState({ createNewDropdownOpen: state, selectedName: value });
  }

  getFilterName(){}
  deleteSearch(){}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>Custom Dropdown component place here</div>
        <CustomDropdown buttonLabel_PlaceHolder={"Select Saved Filter Criteria"}
          linkButtonText={"Create New Filter"} reportInputField={"Enter Filter name"} dataSet={this.state.filterList}
          onClickDropdown={this.createNewDropdownClick.bind(this)} getData={this.getFilterName.bind(this)}
          dropdownVisible={this.state.createNewDropdownOpen} childClass="without-title" deleteAction={true}
          readOnly= {true} value={this.state.selectedName} onDeleteClick={this.deleteSearch.bind(this)}
          isCopyMode={true} errorText={"this.state.searchNameError"}
        />
      </div>
    );
  }
}

export default App;
