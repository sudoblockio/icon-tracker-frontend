import React, { Component } from 'react';

class ContractDetail extends Component {
    render() {
        return (
            <div className="popup contract">
                <span className="close"><em className="img"></em></span>
                <h1 className="title">Contract detail</h1>
                <div className="scroll">
                    <p className="label">Stauts</p>
                    <p className="txt">Accepted</p>
                    <p className="label">TxHash</p>
                    <p className="txt hash">hx4ab2bfc2bf70c4e386cd288b49dfd7536d554f79</p>
                    <p className="label">검증 Tx hash</p>
                    <p className="txt hash">hx4ab2bfc2bf70c4e386cd288b49dfd7536d554f79</p>
                    <p className="label">검증인</p>
                    <p className="txt">aaa</p>
                    <p className="label">제출인</p>
                    <p className="txt">bbb</p>
                    <p className="label">패키지 Checksum</p>
                    <p className="txt">hx4ab2bfc2bf70c4e386cd288b49dfd7536d554f79</p>
                    <p className="label">Comment</p>
                    <p className="txt">hx4ab2bfc2<br />bf7<br />0c4<br />e386c<br />d28<br />8b49dfd<br />7536d554f79</p>
                </div>
            </div>
        )
    }
}

export default ContractDetail
