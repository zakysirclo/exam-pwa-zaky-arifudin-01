/* eslint-disable array-callback-return */
import { render, screen } from '@testing-library/react';
import { regexPhone, regexEmail } from '@helpers/regex';

const phoneTestCase = [
    {
        name: 'valid phone number indonesia 13 digits',
        value: '0812123456789',
    },
    {
        name: 'valid phone number indonesia 12 digits',
        value: '081212345678',
    },
    {
        name: 'valid phone number indonesia 11 digits',
        value: '08121234567',
    },
    {
        name: 'valid phone number indonesia 10 digits',
        value: '0812123456',
    },
    {
        name: 'valid phone number indonesia 13 digits with cc code',
        value: '+62812345678901',
    },
    {
        name: 'valid phone number indonesia 12 digits with cc code',
        value: '+6281234567890',
    },
    {
        name: 'valid phone number indonesia 11 digits with cc code',
        value: '+628123456789',
    },
    {
        name: 'valid phone number indonesia 10 digits with cc code',
        value: '++62812345678',
    },

];

const emailTestCase = [
    {
        name: 'simple valid email',
        value: 'example@sirclo.com',
    },
    {
        name: 'simple valid email with dots between words',
        value: 'example.first.middle.lastname@sirclo.com',
    },
    {
        name: 'simple valid email subdomains',
        value: 'example@icube.sirclo.com',
    },
    {
        name: 'simple valid email with special character on username',
        value: 'example+firstname+lastname@sirclo.com',
        expect: 'true',
    },
    {
        name: 'simple valid email with number',
        value: '0987654321@sirclo.com',
        expect: 'true',
    },
    {
        name: 'simple valid email with special character on domain',
        value: 'example@sirclo-one.com',
        expect: 'true',
    },
    {
        name: 'simple valid email with underscore on username',
        value: '_______@sirclo.com',
        expect: 'true',
    },
    {
        name: 'simple valid email with new TLDs',
        value: 'example@sirclo.museum',
        expect: 'true',
    },
    {
        name: 'simple valid email with new TLDs',
        value: 'example@sirclo.name',
        expect: 'true',
    },
    {
        name: 'simple valid email with country code TLDs',
        value: 'example@sirclo.co.jp',
        expect: 'true',
    },
    {
        name: 'simple valid email with mixed special character',
        value: 'example.firstname-lastname@sirclo.com',
        expect: 'true',
    },
    {
        name: 'simple valid email with double quote mark',
        value: '“example”@sirclo.com',
        expect: 'true',
    },
];

describe('Regex Phone', () => {
    phoneTestCase.map((testCase, index) => {
        it(`It's a ${testCase.name}`, () => {
            render(
                <>
                    <div key={index}>{regexPhone.test(testCase.value) ? 'True Phone' : 'False Phone'}</div>
                </>,
            );

            const falsePhone = screen.queryByText('False Phone');
            expect(falsePhone).toBeNull();
        });
    });
});

describe('Regex Email', () => {
    emailTestCase.map((testCase, index) => {
        it(`It's a ${testCase.name}`, () => {
            render(
                <>
                    <div key={index}>{regexEmail.test(testCase.value) ? 'True Email' : 'False Email'}</div>
                </>,
            );
            const trueEmail = screen.queryByText('False Email');
            expect(trueEmail).toBeNull();
        });
    });
});
