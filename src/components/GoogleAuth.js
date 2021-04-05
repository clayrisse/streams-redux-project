import React from 'react'; 
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions'

class GoogleAuth extends React.Component{

    // documentation: https://developers.google.com/identity/sign-in/web/reference#authentication
    componentDidMount () {
        window.gapi.load('client:auth2', ()=>{
            window.gapi.client.init({  //init retuurns a promise
                clientId: '744808615445-iirng8uv7rnuohmshj0t2lrviiknrle2.apps.googleusercontent.com',
                scope: 'email'
            }).then (()=> {
                this.auth= window.gapi.auth2.getAuthInstance()
                // this.setState({isSignedIn: this.auth.isSignedIn.get()}) // or this.onAuthChange() after refactor
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    onAuthChange = (isSignedIn) =>{
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId())
        } else {
            this.props.signOut()
        }
     }

    onSignInClick = () =>  this.auth.signIn()

    onSignOutClick = () => this.auth.signOut()

    renderAuthButton () {        
        if (this.props.isSignedIn === null ) {
            // return null 
             return (
                <button className="ui red google button">
                    <i className="google icon" />
                    Sign In with Google
                </button>
            )
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        } else { 
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In with Google
                </button>
            )
        }
    }

    render() {
        return(
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn}
}

export default connect(
    mapStateToProps, 
    {signIn, signOut}
    )(GoogleAuth)  