import React from 'react'

const ActionButtons = ({activeStep, goToStep}) => {
    return (
        <div className={'container'}>
            <button className={'btn waves-effect waves-light'} type="button" onClick={() => goToStep(activeStep - 1)}>
                <i className="material-icons left">navigate_before</i>
                Previous step
            </button>

            <button className={'btn waves-effect waves-light'} type="button" onClick={() => goToStep(activeStep + 1)}>
                <i className="material-icons right">navigate_next</i>
                Next step {activeStep + 1}
            </button>
        </div>
    )
}

export default ActionButtons
