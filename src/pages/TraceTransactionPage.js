import React, { Component } from 'react';
import Logs from '../components/ErrorBlock/index'
import { getFailMessage } from '../redux/store/iiss';
class TraceTransaction extends Component {
	constructor(props) {
    super(props)
		this.state = {
			logs:null,
      logs_error:[]
		}
	}
 async componentDidMount(){
    let moreMsg = await getFailMessage(this.props.match.params.txHash,'wholemsg');
    let err=[];
    moreMsg.result.logs.map(e=>{
      if (this.checkError(e.msg)) {
        err.push(e);
      }
      })
      this.setState({logs:moreMsg.result.logs,logs_error:err})
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
            return (
                <div className="content-wrap">
                <div className="screen0">
                <div className="wrap-holder">
                  <p className="title">Transaction Logs</p>
                  <Logs checkError={this.checkError} logs_error={this.state.logs_error} logs={this.state.logs} />
                </div>
              </div>
          </div>
				)
			}
		
}

export default TraceTransaction;
