import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
import './../css/customDropdown.css';
import PropTypes from 'prop-types';
import AddNewOption from "./components/AddNewOption";
import DropdownBox from "./components/DropdownBox";
import OptionList from "./components/OptionList";

class CustomDropdown extends Component {
    constructor(props){
        super(props);
        this.state = {
            ...props,
            selectedValue: '',
            newLinkButton: true
        };
    }

    componentDidMount() {
        document.addEventListener("click", (e) => this.documentClickHandler(e));
    }

    componentWillReceiveProps(receivedProps) {
        console.log("componentWillReceiveProps");
        this.setState({ ...receivedProps});
    }

    componentWillUnmount() {
        document.removeEventListener("click", (e) => this.documentClickHandler(e));
    }

    documentClickHandler(e) {
        const pattern = new RegExp("new-custom-dropdown");
        const res = pattern.test(e.target.id);
        if(!res) {
            this.setState({ dropdownVisible: false });
        }
    }

    onLinkClick = (value) => {
        console.log(value);
        // console.log("onLinkClick : ", e.currentTarget.innerText);
        this.setState({selectedValue: value, newLinkButton: true}, ()=>{
            //params for getSelectedData are reportNo, reportName, isClosed            
            this.props.getSelectedData(this.state.selectedValue, this.state.selectedValue, false);
        });        
    }

    onButtonClick = (action, optionVal) => {
        console.log(action);
        console.log(optionVal);
        if(action === "save"){
            this.toggleState(2);
            // this.toggleState(3, this.reportName.value);
        }
        this.toggleState(1);
    }

    toggleState(_id, _param){
        switch(_id){
            case 1:
                this.setState((prevState => ({newLinkButton: !prevState.newLinkButton})));
            break;
            case 2:
                if(this.reportName && this.reportName.value !== ""){
                    this.props.onClickDropdown(this.reportName.value, this.reportName.value, false);
                }
            break;
            case 3:
                this.setState({selectedValue: _param});
            break;
            default: 
            break;
        }
    }

    clearSelection = () => {
        this.props.getSelectedData("", "", false);
    }
    
    onTextEntered = (value) => {
        console.log(value)
        this.setState({selectedValue: value}, () => this.props.getSelectedData(value, value, false));
    }
    deleteSearch= () => {}
    renderList() {
        const { options, dataValue, dataKey } = this.state;
        const { deleteAction, onDeleteClick } = this.props;
        return (
            <OptionList
                options = {options}
                dataValue = {dataValue}
                dataKey = {dataKey}
                deleteAction = {deleteAction}
                onDeleteClick = {onDeleteClick}
                onLinkClick = {this.onLinkClick}
            />
        )
    }

    createNewComponent(){
        const { maxTextLength, NewReportInputPlaceholder } = this.props;
        return (
            <AddNewOption
                maxLength={maxTextLength} 
                NewReportInputPlaceholder={NewReportInputPlaceholder}
                onBtnClick={() => this.onButtonClick()}
            />
        );
    }

    dropdownBoxComponent(){
        return (
            <DropdownBox 
                {...this.props}
                onTextEntered={this.onTextEntered}
                selectedValue={this.state.selectedValue}
            />
        )
    }

    linkButton(_btnText) {
        return <a className="create-new-link" onClick={() => this.onButtonClick("create", {})} id="new-custom-dropdown-link">{`+ ${_btnText}`}</a>
    }

    showDropdownComp() {
        const { childClass, LinkButtonTextLable } = this.props;
        const { newLinkButton } = this.state;
        return (
            <div id="new-custom-dropdown-CreateNewOption" className={`custom-dropdown-content ${childClass}`}>
                {newLinkButton ? this.linkButton(LinkButtonTextLable) : this.createNewComponent()}
                {this.renderList()}
            </div>
        )
    }

    render() {
        const { columnWidthParent, DropDownComponentClass, readOnly, isCopyMode, errorText } = this.props;
        const { dropdownVisible } = this.state;

        return (
            <div id="new-custom-dropdown-wrapper" className={columnWidthParent}>
                <div className={`custom-dropdown ${DropDownComponentClass}`}>                    
                    {this.dropdownBoxComponent()}
                    {dropdownVisible ? this.showDropdownComp() : null}
                </div>
                {!readOnly && isCopyMode? <span className="errorMsg">{errorText}</span> : null}
            </div>
        );
    }
}

CustomDropdown.propTypes = {
    DropDownPlaceHolder: PropTypes.string, //-- Dropdown box placeholder. Default value: "Select Report Name"
    LinkButtonTextLable: PropTypes.string, //-- create new report functionality title. Default value: "New Report"
    NewReportInputPlaceholder: PropTypes.string, //-- Create New Report input box placeholder. Default value:"New Report Name"
    DropDownBoxClass: PropTypes.string, //-- can set user defined class from this property for dropdown main box with arrow. Default value: popover-container
    DropDownComponentClass: PropTypes.string,//-- can set user defined class from this property for entire dropdown box. Default value is empty string.
    childClass: PropTypes.string,//-- can set user defined class from this property for dropdown list component. Default value: popover
    errorText: PropTypes.string, //-- Error Text will be displayed if needed. Default value is empty string.
    columnWidthParent: PropTypes.string, //-- Change the Bootstrap style of the component. Default value: col-lg-4 col-md-4 col-sm-6 col-xs-12
    
    options: PropTypes.array, //-- Dropdown values data set. Default value is Empty array.
    
    dropdownVisible: PropTypes.bool, //-- Display dropdown list. Default value False.
    readOnly: PropTypes.bool, //-- Dropdown input is can be toggle, by using this props. Default value True. Means, Input filed will be in Read only mode.
    isCopyMode: PropTypes.bool, //-- isCopy mode is specific functionality for reports name
    deleteAction: PropTypes.bool, //-- Default value is False, an Icon will be shown on every row
    
    onDeleteClick: PropTypes.func, //-- Delete function is assinged to the props deleteAction component.
    onClickDropdown: PropTypes.func, //-- Click function t display dropdown list
    getSelectedData: PropTypes.func, //-- Return the selected values or created new values
    
    maxTextLength: PropTypes.number //-- New Report input field maximum length can be set. Default value 30.
};

CustomDropdown.defaultProps = {
    DropDownPlaceHolder: "Select Option",
    LinkButtonTextLable: " New Option",
    NewReportInputPlaceholder: "New Option Name",
    options: [],
    DropDownBoxClass: "popover-container",
    DropDownComponentClass: "",
    childClass: "popover",
    dropdownVisible: false,
    readOnly: true,
    deleteAction: false,
    maxTextLength: 30,
    errorText: '',
    columnWidthParent: "col-lg-4 col-md-4 col-sm-6 col-xs-12"
};

export default CustomDropdown;
