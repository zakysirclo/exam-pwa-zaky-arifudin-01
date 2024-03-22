/* eslint-disable react/prefer-stateless-function */
import isReactComponent, { isClassComponent, isFunctionComponent } from '@helpers/checkComponent';
import React from 'react';

class ClassComponents extends React.Component {
    render() {
        return (
            <div>ClassComponents</div>
        );
    }
}

describe('Component Helper', () => {
    it('is a class component', () => {
        expect(isClassComponent(ClassComponents)).toBe(true);
    });
    it('is not a function component', () => {
        expect(isFunctionComponent(ClassComponents)).toBe(false);
    });
    it('is a react component', () => {
        expect(isReactComponent(ClassComponents)).toBe(true);
    });
});
