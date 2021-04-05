import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions'
//reduxFrom works like a "connect"
import StreamForm from './StreamForm'


class StreamCreate extends React.Component{
    onSubmit = (formValues) => { 
        //redux-form has a prop that handles the submit and we dont have to preventDefault behavior 
        console.log(`formValues`, formValues)
        this.props.createStream(formValues)
    }

    render () {
        return (
            <div>
                <h3>Create a Stream</h3>
                <StreamForm onSubmit={this.onSubmit}/>
            </div>
        )
    }
}

export default connect(null, {createStream})(StreamCreate)


//we could use this: -----but is to messy
// export default connect()(reduxForm({
//     form: 'streamCreate',
//     validate //validate: validate
// })(StreamCreate))