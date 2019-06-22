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
  componentWillMount() {}

  componentWillReceiveProps(receivedProps) {}

  createNewDropdownClick(){
    this.setState(prevState => {
      return {
          createNewDropdownOpen: !prevState.createNewDropdownOpen
      };
  });
  }
  
  getFilterName(key, value, state){
    let oldData = this.state.filterList.map(o => o);
    
    if(!oldData.includes(value))
      oldData.push(value);
    
    let newDataSet = oldData.map(o => o);
    this.setState({ createNewDropdownOpen: state, selectedName: value, filterList: newDataSet });
  }

  deleteSearch(){}
  render() {
    return (
      <div className="App">
        <h4 className="App-intro">
          Custom Dropdown component place here
        </h4>

        <CustomDropdown 
          DataSet={this.state.filterList}
          onClickDropdown={this.createNewDropdownClick.bind(this)}
          getData={this.getFilterName.bind(this)}
          dropdownVisible={this.state.createNewDropdownOpen}
          childClass="without-title"
          deleteAction={true}
          readOnly= {true}
          value={this.state.selectedName}
          onDeleteClick={this.deleteSearch.bind(this)}
          isCopyMode={true}
          errorText={"this.state.searchNameError"}
        />
      </div>
    );
  }
}

export default App;
