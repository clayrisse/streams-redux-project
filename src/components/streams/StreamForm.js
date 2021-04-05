import React from 'react';
//reduxFrom works like a "connect"
import { Field, reduxForm } from 'redux-form';


class StreamForm extends React.Component{
// const StreamCreate = () => {
    renderInput = ({ input, label, meta }) => {
        const className= `field ${meta.error && meta.touched ? 'error':''}`
        console.log(`meta`, meta)
        //<Field/> passes an object with props
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {/* <input onChange={formProps.input.onChange} value={formProps.input.value} /> */}
                {/* <div>{meta.error}</div> */}
                {this.renderError(meta)}
            </div>
        )
    }

    renderError = ({ error, touched }) => {
        if (touched && error) {
            return(
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    onSubmit = (formValues) => { 
        //redux-form has a prop that handles the submit and we dont have to preventDefault behavior 
        this.props.onSubmit(formValues)
    }

    render () {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title"/> 
                <Field name="description" component={this.renderInput} label="Enter Description"/>
                <button className="ui button primary">submit</button>
            </form>
        )
    }
}

const validate = (formValues) => {
    const errors = {}
    if (!formValues.title)  errors.title = 'You must enter title'
    if (!formValues.description)  errors.description = 'You must enter description'
    
    return errors
    //if errors return empty, it means that all is OK and redux can submit form
}

export default reduxForm({
    form: 'streamForm',
    validate //validate: validate
})(StreamForm)



//we could use this: -----but is to messy
// export default connect()(reduxForm({
//     form: 'streamCreate',
//     validate //validate: validate
// })(StreamCreate))