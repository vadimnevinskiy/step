import React, {useCallback, useEffect, useState} from 'react'
import classes from './Steps.module.css'
import AddStepForm from "../AddStepForm/AddStepForm";
import classNames from 'classnames'
const Steps = () => {
    const maximumLength = 5
    const minimumLength = 2
    const cx = classNames.bind(classes);
    const initialSteps = [
        {id: 0, title: 'Design', state: ''},
        {id: 1, title: 'Build', state: ''}
    ]
    const [stepsList, setSteps] = useState(initialSteps)
    const [stepsWidth, setStepsWidth] = useState(0)
    const [activeStep, setActiveStep] = useState(0)



    useEffect(() => {
        const width = 100 / stepsList.length;
        setStepsWidth(width)
    }, [stepsList])

    useEffect(() => {
        let internalSteps = []
        for(let i = 0; i < stepsList.length; i++) {
            let currentStep = stepsList[i]
            if(currentStep.id === activeStep){
                setActiveStep(stepsList[i].id)
                internalSteps.push({id: stepsList[i].id, title: stepsList[i].title, state: 'active'})
            } else {
                internalSteps.push({id: stepsList[i].id, title: stepsList[i].title, state: ''})
            }
        }
        setSteps(internalSteps)
    }, [stepsList.length])



    const addStep = (newStepTitle) => {
        if(newStepTitle && stepsList.length < maximumLength){
            let newStep = {
                id: stepsList.length,
                title: newStepTitle,
                state: ''
            }
            setSteps([...stepsList, newStep])
        } else if (stepsList.length >= maximumLength) {
            window.M.toast({html: `Maximum length of steps ${maximumLength}`})
        } else if (!newStepTitle) {
            window.M.toast({html: `Empty field title`})
        }
    }
    const removeLastStep = () => {
        if(stepsList.length > minimumLength) {
            stepsList.pop()
            setSteps([...stepsList])
        } else if (stepsList.length <= minimumLength){
            window.M.toast({html: `Minimum length of steps ${minimumLength}`})
        }
    }

    const nextStep = useCallback((nextStep) => {
        alert('nextStep ' + nextStep)
    }, [])

    const previousStep  = useCallback((previousStep) => {
        alert('previousStep ' + previousStep)
    }, [])

    return (
        <>
            <AddStepForm addStep={addStep} removeLastStep={removeLastStep} />
            <div className={classes.progressContainer}>
                <ul className={classes.progress}>
                    {
                        stepsList.length > 0 &&
                        stepsList.map((step, index) => {
                            let className = cx({
                                [classes.done]: step.state === 'done',
                                [classes.active]: step.state === 'active'
                            });
                            return (
                                <li
                                    className={className}
                                    key={`${index}_${step.id}`}
                                    style={{width: `${stepsWidth}%`}}>
                                    <span className={classes.name}>{step.title} {step.id}</span>
                                    <span className={classes.step}></span>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className={classes.line}></div>
            </div>
            <div className={'container'}>
                <button className={'btn waves-effect waves-light'} type="button" onClick={() => previousStep(activeStep - 1)}>
                    <i className="material-icons left">navigate_before</i>
                    Previous step {activeStep - 1}
                </button>

                <button className={'btn waves-effect waves-light'} type="button" onClick={() => nextStep(activeStep + 1)}>
                    <i className="material-icons right">navigate_next</i>
                    Next step {activeStep + 1}
                </button>
            </div>
        </>
    )
}

export default Steps
