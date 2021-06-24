import React from "react"
import {Form, Field} from 'react-final-form'

const AddStepForm = ({addStep, removeLastStep}) => {
    const onSubmit = (values) => {
        addStep(values.stepName)
    }
    return (
        <div className={'container'}>
            <Form
                onSubmit={onSubmit}
                initialValues={{stepName: ''}}
                render={({handleSubmit, form, submitting, pristine, values}) => (
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col s12 m10 l10 xl4">
                                <Field
                                    name="stepName"
                                    component="input"
                                    type="text"
                                    placeholder="Step Name"
                                />
                            </div>
                            <div className="col s12 m2 l2 xl7">
                                <button className={'btn waves-effect waves-light'} type="submit">
                                    <i className="material-icons left">add</i>
                                    Add new step
                                </button>
                                <button className={'btn waves-effect waves-light'} type="button" onClick={removeLastStep}>
                                    <i className="material-icons left">remove</i>
                                    Remove last step
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            />
        </div>
    )
}

export default AddStepForm
