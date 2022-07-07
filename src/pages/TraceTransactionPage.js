import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Logs from '../components/ErrorBlock/index'
class TraceTransaction extends Component {
	constructor(props) {
        
		super(props)
		this.state = {
			
		}
	}
     checkError = (data) => {
        if (
          data.toUpperCase().includes("ERROR") ||
          data.toUpperCase().includes("FAILURE") ||
          data.toUpperCase().includes("INVALID") ||
          data.toUpperCase().includes("SUCCESS=FALSE") ||
          data.toUpperCase().includes("SYSTEMEXCEPTION") ||
          data.toUpperCase().includes("OUTOFSTEP") ||
          data.toUpperCase().includes("REVERTED") ||
          data.toUpperCase().includes("SCOREEXCEPTION") ||
          data.toUpperCase().includes("ONLY NFT OWNER")
        ) {
          return true;
        } else {
          return false;
        }
      };

        render()  {
            console.log(this.props.location.state.detail,"state Value=======>");
	            return (
                    <div className="content-wrap">
					<div className="screen0">
						<div className="wrap-holder">
							<p className="title">Transaction</p>
							<Logs   logs={this.props.location.state.detail}/>
						</div>
					</div>
                    </div>
				)
			}
		
}
	




export default withRouter(TraceTransaction);
