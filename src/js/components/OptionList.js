import React from "react";

const OptionList = (props) => {
    const { options, dataValue, dataKey, deleteAction, onDeleteClick, onLinkClick } = props;
    return options !== undefined ? options.map((record, index) => {
        const labelValue= dataValue ?  record[dataValue] : record;
        const optionValue = dataKey ? record[dataKey] : record;
        return (
            <div id={`new-custom-dropdown-anchors_${index}`} className="col-md-12 list-anchors" key={index}>
                <div className="col-sm-9 col-md-10 col-xs-8 col-lg-10 noPaddingLR cursor-pointer" 
                    onClick={() => onLinkClick(optionValue)} 
                    value={optionValue}>
                    <option value={optionValue} title={labelValue}>
                        {labelValue}
                    </option>
                </div>
                {
                    deleteAction
                        ? <div 
                            className="col-sm-3 col-md-2 col-xs-4 col-lg-2 pull-right" 
                            title="Remove"
                            onClick={() => onDeleteClick(record)} />
                        : null 
                }
            </div>
        );
    }) : undefined;
}

export default OptionList;