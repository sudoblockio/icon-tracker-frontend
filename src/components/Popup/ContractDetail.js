import React, { Component } from 'react';

class ContractDetail extends Component {
    render() {
        return (
            <div class="popup-wrap detail">
                <div class="dimmed"></div>
                <div class="popup contract">
                    <span class="close"><em class="img"></em></span>
                    <h1 class="title">Contract detail</h1>
                    <div class="scroll">
                        <p class="label">Stauts</p>
                        <p class="txt">Accepted</p>
                        <p class="label">TxHash</p>
                        <p class="txt hash">hx4ab2bfc2bf70c4e386cd288b49dfd7536d554f79</p>
                        <p class="label">검증 Tx hash</p>
                        <p class="txt hash">hx4ab2bfc2bf70c4e386cd288b49dfd7536d554f79</p>
                        <p class="label">검증인</p>
                        <p class="txt">aaa</p>
                        <p class="label">제출인</p>
                        <p class="txt">bbb</p>
                        <p class="label">패키지 Checksum</p>
                        <p class="txt">hx4ab2bfc2bf70c4e386cd288b49dfd7536d554f79</p>
                        <p class="label">Comment</p>
                        <p class="txt">hx4ab2bfc2<br />bf7<br />0c4<br />e386c<br />d28<br />8b49dfd<br />7536d554f79</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContractDetail
