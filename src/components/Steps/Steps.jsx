import React, {useState} from 'react'
import classes from './Steps.module.css'

const Steps = () => {
    const [stepsList, setSteps] = useState(['Design', 'Build'])
    const [stepsWidth, setStepsWidth] = useState('50')


    return (
        <>

            <div className={classes.progressContainer}>
                <ul className={classes.progress}>
                    {
                        stepsList.length > 0 &&
                        stepsList.map((step, index) => {
                            return (
                                <li className={classes.done} key={`${index}`} style={{width: `${stepsWidth}%`}}>
                                    <span className={classes.name}>{step}</span>
                                    <span className={classes.step}></span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

        </>
    )
}

export default Steps
