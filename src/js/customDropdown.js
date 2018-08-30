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
            this.props.getData(e.currentTarget.childNodes[0].getAttribute("value"), e.currentTarget.innerText, false);
        });        
    }

    onButtonClick(e){
        if(e.currentTarget.getAttribute("id") === "save-reportNameBtn"){
            this.toggleState(2);
        }
        this.toggleState(1);
    }

    toggleState(_id, _param){
        switch(_id){
        case 1:
            this.setState((prevState => ({newLinkButton: !prevState.newLinkButton})));
            break;
        case 2:
        console.log(this.reportName.value);
            (this.reportName && this.reportName.value !== "") ? this.setState({selectedValue: this.reportName.value}) : null;
            this.props.getData(null, this.reportName.value, false);
            break;
        case 3:
            this.setState({selectedValue: _param});
            break;
            default:
            console.log("nothing to update");
        }
    }

    renderList() {
        let data = this.state.dataSet;
        return data.map((record, index) => {
            let value= this.state.dataValue ?  record[this.state.dataValue] : record;
            return (
                <div className="col-md-12 list-anchors" key={index} id="new-custom-dropdown-anchors">
                    <div className="col-sm-9 col-md-10 col-xs-8 col-lg-10 noPaddingLR cursor-pointer" onClick={this.onLinkClick.bind(this)}>
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

    onTextEntered(e){
        this.setState({selectedValue: e.target.value});
        this.props.getData(null, e.target.value, false);
    }

    render() {
        let {buttonLabel_PlaceHolder, linkButtonText,
            reportInputField, parentClass, superParentClass, childClass } = {...this.state};

        return (
            <div id="new-custom-dropdown-wrapper">
                <div className={"custom-dropdown green-common-bottom-border "+superParentClass} >
                    <div className={"cursor-pointer createReport-dropdown-container "+parentClass} onClick={this.props.onClickDropdown} id="new-custom-dropdown">
                        <input type="text" className="createReport-input-dropdown" name="createReport" autoFocus={(!(this.props.readOnly))} id="new-custom-dropdown-input"
                            value={this.state.selectedValue} placeholder={buttonLabel_PlaceHolder} maxLength={this.props.maxTextLength} readOnly={this.props.readOnly} onChange={this.onTextEntered.bind(this)} />
                        <span className="arrow-color glyphicon glyphicon-chevron-down" id="new-custom-dropdown-icon"/>
                    </div>

                    {this.state.dropdownVisible ? (
                        <div id="new-custom-dropdown-CreateReport" className={"custom-dropdown-content "+childClass}>
                            {this.state.newLinkButton ? (<a className="create-new-report-link" onClick={this.onButtonClick.bind(this)} id="new-custom-dropdown-link">{"+ "+linkButtonText}</a>) : (
                                <div className="input-group create-new-report-Edit noMargin" id="new-custom-dropdown-inputListGrp">
                                    <input type="text" className="form-control new-report-name" name="reportName"
                                        maxLength={this.props.maxTextLength} placeholder={reportInputField}
                                        ref={(input)=> this.reportName = input} id="new-custom-dropdown-innerInput" />
                                    <Button id="save-reportNameBtn" className="btn btn-success" type="button"
                                        onClick={this.onButtonClick.bind(this)} block={true}>Confirm</Button>
                                </div>)}
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
    buttonLabel_PlaceHolder: PropTypes.string,
    linkButtonText: PropTypes.string,
    reportInputField: PropTypes.string,
    dataSet: PropTypes.object,
    parentClass: PropTypes.string,
    superParentClass: PropTypes.string,
    childClass: PropTypes.string,
    dropdownVisible: PropTypes.bool,
    onClickDropdown: PropTypes.func,
    getData: PropTypes.func,
    readOnly: PropTypes.bool,
    isCopyMode: PropTypes.bool,
    dataSetKey: PropTypes.string,
    dataSetValue: PropTypes.string,
    deleteAction: PropTypes.bool,
    onDeleteClick: PropTypes.func,
    errorText: PropTypes.string,
    maxTextLength: PropTypes.number
};

CustomDropdown.defaultProps = {
    buttonLabel_PlaceHolder: "Select Report Name",
    linkButtonText: " New Report",
    reportInputField: "New Report Name",
    dataSet: [],
    parentClass: "popover-container",
    superParentClass: "",
    childClass: "popover",
    dropdownVisible: false,
    readOnly: true,
    deleteAction: false,
    maxTextLength: 30
};

export default CustomDropdown;
