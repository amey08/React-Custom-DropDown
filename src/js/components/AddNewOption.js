import React from 'react';
import { Button } from 'react-bootstrap';

const AddNewOption = (props) => {
    this.refInput  = React.createRef();
    return (
        <div className="input-group" id="new-custom-dropdown-inputListGrp">
            <input 
                id="new-custom-dropdown-innerInput"
                type="text" 
                className="form-control" 
                maxLength={props.maxTextLength} 
                placeholder={props.NewReportInputPlaceholder}
                ref={(input)=> this.refInput = input} />
            <Button 
                className="btn btn-success" 
                type="button"
                onClick={() => props.onBtnClick("save", this.refInput)} 
                block={true}
            >Confirm</Button>
        </div>
    );
}

export default AddNewOption;