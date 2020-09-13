import React, { Component } from 'react';
import './../css/App.css';
import CustomDropdown from './customDropdown';

class App extends Component {
  constructor(){
    super();
    this.state = {
      filterList: ["1","2","3"]
    }
  }

  createNewDropdownClick = () => {
    this.setState(prevState => {
      return {
          createNewDropdownOpen: !prevState.createNewDropdownOpen
      };
    });
  }

  getFilterName = (key, value, stateReceived) => {
    const oldData = this.state.filterList.map(o => o);
    if(!oldData.includes(value))
        oldData.push(value);
    const newDataSet = oldData.map(o => o);
    this.setState({ createNewDropdownOpen: stateReceived, selectedName: value, filterList: newDataSet });
  }

  render() {
    return (
      <div className="App">
        <h4 className="App-intro">
          Custom Dropdown component place here
        </h4>

        <CustomDropdown 
          options={this.state.filterList}
          onClickDropdown={this.createNewDropdownClick}
          getSelectedData={this.getFilterName}
          dropdownVisible={this.state.createNewDropdownOpen}
          childClass="without-title"
          deleteAction={true}
          readOnly= {true}
          value={this.state.selectedName}
          isCopyMode={true}
          errorText={"this.state.searchNameError"}
        />
      </div>
    );
  }
}

export default App;
