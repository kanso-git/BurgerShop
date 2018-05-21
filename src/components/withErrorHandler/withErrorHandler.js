import React, {Fragment,Component} from 'react';
import Modal from "../UI/Modal/Modal";


const withErrorHandler = (WrappedComponent, axios) =>{

    return class extends Component {
        state ={
            error: null
        }
        // use this method tp catch error that comes from the child component mainly
        componentWillMount(){
            axios.interceptors.request.use(req => {
                this.setState(()=>({error:null}))
                return req;
            });
            axios.interceptors.response.use(res => res, error=>{
                this.setState(()=>({
                    error
                }))
            })

        }

        errorConfirmedHandler = () =>{
            this.setState(()=>({error:null}));
        }
        render(){
            return (
                <Fragment>
                    <Modal show={this.state.error}
                           hideBackdrop={this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            )
        }

    }
};

export default  withErrorHandler;