import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './../css/customDropdown.css';
import PropTypes from 'prop-types';

class CustomDropdown extends Component {
    constructor(props){
        super(props);
        this.documentClickHandler = this.documentClickHandler.bind(this);
        this.state = {
            selectedValue: '',
            newLinkButton: true
        };
    }

    componentWillMount() {
        let state = this._constructComponent(this.props);
        this.setState({ ...state});
    }

    componentDidMount() {
        document.addEventListener("click", (e) => this.documentClickHandler(e));
    }

    componentWillReceiveProps(receivedProps) {
        let state = this._constructComponent(receivedProps);
        this.setState({ ...state});
    }

    componentWillUnmount() {
        document.removeEventListener("click", (e) => this.documentClickHandler(e));
    }

    documentClickHandler(e) {
        let pattern = new RegExp("new-custom-dropdown");
        let res = pattern.test(e.target.id);
        if(!res) {
            this.setState({ dropdownVisible: false });
        }
    }

    _constructComponent(props) {
        let nextState = {...props};
        return nextState;
    }

    onLinkClick(e){
        this.setState({selectedValue: e.currentTarget.innerText, newLinkButton: true}, ()=>{
            //params for getData are reportNo, reportName, isClosed            
            this.props.getData(this.state.selectedValue, this.state.selectedValue, false);
        });        
    }

    onButtonClick(e){
        if(e.currentTarget.getAttribute("id") === "save-reportNameBtn"){
            this.toggleState(2);
            this.toggleState(3, this.reportName.value);
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
                this.props.getData(this.reportName.value, this.reportName.value, false);
            }
            break;
        case 3:
            this.setState({selectedValue: _param});
            break;
            default:
        }
    }
    
    onTextEntered(e){
        this.setState({selectedValue: e.target.value});
        this.props.getData(e.target.value, e.target.value, false);
    }

    renderList() {
        let data = this.state.DataSet;
        return data.map((record, index) => {
            let value= this.state.dataValue ?  record[this.state.dataValue] : record;
            
            return (
                <div className="col-md-12 list-anchors" key={index} id="new-custom-dropdown-anchors">
                    <div className="col-sm-9 col-md-10 col-xs-8 col-lg-10 noPaddingLR cursor-pointer" onClick={this.onLinkClick.bind(this)} value={this.state.dataKey ? record[this.state.dataKey] : record}>
                        <a value={this.state.dataKey ? record[this.state.dataKey] : record} title={value}>
                            {value}
                        </a>
                    </div>
                    {
                        this.props.deleteAction
                            ? <div className="col-sm-3 col-md-2 col-xs-4 col-lg-2 noPaddingLR spritesheet-2 cancel_deactive pull-right" title="Delete"
                                onClick={() => this.props.onDeleteClick(record)} />
                            : null }
                </div>
            );
        });
    }

    createNewComponent(){
        return (
            <div className="input-group create-new-report-Edit noMargin" id="new-custom-dropdown-inputListGrp">
                <input type="text" className="form-control new-report-name" name="reportName"
                    maxLength={this.props.maxTextLength} placeholder={this.props.NewReportInputPlaceholder}
                    ref={(input)=> this.reportName = input} id="new-custom-dropdown-innerInput" />
                <Button id="save-reportNameBtn" className="btn btn-success" type="button"
                    onClick={this.onButtonClick.bind(this)} block={true}>Confirm</Button>
            </div>
        );
    }

    dropdownBoxComponent(){
        return (
            <div className={"cursor-pointer createReport-dropdown-container "+this.props.DropDownBoxClass} onClick={this.props.onClickDropdown} id="new-custom-dropdown">
                <input type="text"
                    id="new-custom-dropdown-input"
                    className="createReport-input-dropdown" 
                    name="createReport" 
                    autoFocus={(!(this.props.readOnly))}
                    value={this.state.selectedValue} 
                    placeholder={this.props.DropDownPlaceHolder} 
                    maxLength={this.props.maxTextLength} 
                    readOnly={this.props.readOnly}
                    onChange={this.onTextEntered.bind(this)} />
                <span className="arrow-color glyphicon glyphicon-asterisk" id="new-custom-dropdown-icon"/>+
            </div>
        );
    }

    render() {
        return (
            <div id="new-custom-dropdown-wrapper" className={this.props.columnWidthParent}>
                <div className={"custom-dropdown green-common-bottom-border "+this.props.DropDownComponentClass} >                    
                    {this.dropdownBoxComponent()}
                    {this.state.dropdownVisible ? (
                        <div id="new-custom-dropdown-CreateReport" className={"custom-dropdown-content "+this.props.childClass}>
                            {this.state.newLinkButton ? 
                            (<a className="create-new-report-link" onClick={this.onButtonClick.bind(this)} id="new-custom-dropdown-link">{"+ "+this.props.LinkButtonTextLable}</a>) 
                            : this.createNewComponent()}
                            {this.renderList()}
                        </div>
                    ) : null}
                </div>
                {!this.props.readOnly && this.props.isCopyMode? <span className="errorMsg">{this.props.errorText}</span> : null}
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
    
    DataSet: PropTypes.array, //-- Dropdown values data set. Default value is Empty array.
    
    dropdownVisible: PropTypes.bool, //-- Display dropdown list. Default value False.
    readOnly: PropTypes.bool, //-- Dropdown input is can be toggle, by using this props. Default value True. Means, Input filed will be in Read only mode.
    isCopyMode: PropTypes.bool, //-- isCopy mode is specific functionality for reports name
    deleteAction: PropTypes.bool, //-- Default value is False, an Icon will be shown on every row
    
    onDeleteClick: PropTypes.func, //-- Delete function is assinged to the props deleteAction component.
    onClickDropdown: PropTypes.func, //-- Click function t display dropdown list
    getData: PropTypes.func, //-- Return the selected values or created new values
    
    maxTextLength: PropTypes.number //-- New Report input field maximum length can be set. Default value 30.
};

CustomDropdown.defaultProps = {
    DropDownPlaceHolder: "Select Report Name",
    LinkButtonTextLable: " New Report",
    NewReportInputPlaceholder: "New Report Name",
    DataSet: [],
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
