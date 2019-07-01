import React from 'react';
import TRComponent from '../../artifacts/component/tr-component';
import TRComponentState from '../../artifacts/component/tr-component-state';



export default class MyView extends TRComponent<any, TRComponentState> {
     renderUI() {
        return (
            <React.Fragment>
                <h1>Bismillah to My View</h1>
            </React.Fragment>
        );
    }
}