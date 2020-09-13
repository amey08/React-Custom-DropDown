import React from 'react';

const DropdownBox = (props) => {
    const { DropDownBoxClass, onClickDropdown, readOnly, DropDownPlaceHolder, maxTextLength, selectedValue, onTextEntered } = props;
    // createOption-dropdown-container
    return (
        <div className={`cursor-pointer createOption-dropdown-container ${DropDownBoxClass}`} 
            onClick={onClickDropdown} 
            id="new-custom-dropdown">
            <input type="text"
                id="new-custom-dropdown-input"
                className="createOption-input-dropdown" 
                name="createOption" 
                autoFocus={(!readOnly)}
                value={selectedValue} 
                placeholder={DropDownPlaceHolder} 
                maxLength={maxTextLength} 
                readOnly={readOnly}
                onChange={() => onTextEntered(selectedValue)} />
            {/* <span className="arrow-color glyphicon glyphicon-remove" onClick={this.clearSelection}/> */}
            <span className="arrow-color glyphicon glyphicon-chevron-down" id="new-custom-dropdown-icon"/>
        </div>
    );
}

export default DropdownBox;