import React, {useCallback, useEffect, useState} from 'react'
import classes from './Steps.module.css'
import AddStepForm from '../AddStepForm/AddStepForm'
import ActionButtons from '../ActionButtons/ActionButtons'
import StepItem from './StepItem/StepItem'





const Steps = () => {
    const maximumLength = 5
    const minimumLength = 2


    // Default steps
    const initialSteps = [
        {id: 0, title: 'Design', state: ''},
        {id: 1, title: 'Build', state: ''},
        {id: 2, title: 'Launch', state: ''}
    ]


    const [stepsList, setSteps] = useState(initialSteps) // Set default steps
    const [stepsWidth, setStepsWidth] = useState(0) // Step width in percent
    const [activeStep, setActiveStep] = useState(1) // Id of active step

    // Alert info messages
    const alertText = (text) => {
        window.M.toast({html: text})
    }


    // Calculation width for each steps
    useEffect(() => {
        const widthForEachSteps = 100 / stepsList.length;
        setStepsWidth(widthForEachSteps)
    }, [stepsList])



    //Adding classes for step list
    const setClassesForEachSteps = (stepIndex) => {
        let temporaryArray = []
        if(stepIndex >= 0) {
            for (let i = 0; i < stepsList.length; i++) {
                if (stepsList[i].id < stepIndex) {
                    temporaryArray.push({...stepsList[i], state: 'done'})
                } else if (stepsList[i].id == stepIndex) {
                    temporaryArray.push({...stepsList[i], state: 'active'})
                    setActiveStep(stepsList[i].id)
                } else {
                    temporaryArray.push({...stepsList[i], state: ''})
                }
            }
            setSteps(temporaryArray)
        }
    }




    //Adding classes for step list
    useEffect(() => {
        setClassesForEachSteps(activeStep)
    }, [stepsList.length])



    // Go to Next-Preview step
    const goToStep = useCallback((stepIndex) => {
        setClassesForEachSteps(stepIndex)
    }, [stepsList])






    // Adding new steps
    const addStep = (newStepTitle) => {
        if(newStepTitle && stepsList.length < maximumLength){
            let newStep = {
                id: stepsList.length,
                title: newStepTitle,
                state: ''
            }
            setSteps([...stepsList, newStep])
        } else if (stepsList.length >= maximumLength) {
            alertText(`Maximum length of steps ${maximumLength}`)
        } else if (!newStepTitle) {
            alertText(`Empty field title`)
        }
    }

    //Remove last step
    const removeLastStep = () => {
        if(stepsList.length > minimumLength) {
            stepsList.pop()
            setSteps([...stepsList])
        } else if (stepsList.length <= minimumLength){
            alertText(`Minimum length of steps ${minimumLength}`)
        }
    }






    return (
        <>
            <AddStepForm addStep={addStep} removeLastStep={removeLastStep} />
            <div className={classes.progressContainer}>
                <ul className={classes.progress}>
                    <StepItem stepsList={stepsList} stepsWidth={stepsWidth} />
                </ul>
                <div className={classes.line}>&nbsp;</div>
            </div>
            <ActionButtons activeStep={activeStep} goToStep={goToStep} />
        </>
    )
}

export default Steps
