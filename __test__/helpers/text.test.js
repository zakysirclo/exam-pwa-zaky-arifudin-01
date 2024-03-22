import { render, screen } from '@testing-library/react';
import { capitalizeEachWord, StripHtmlTags } from '@helpers/text';

describe('Text Helpers', () => {
    it('Prints out capitalize each word', () => {
        render(
            <p>
                {capitalizeEachWord('hello world')}
            </p>,
        );

        const capitalizedText = screen.getByText('Hello World');

        expect(capitalizedText).toBeInTheDocument();
    });

    it('Should strip out HTML tags', () => {
        render(
            <p>
                {StripHtmlTags('Hello <b>world</b>')}
            </p>,
        );

        const strippedHtmlTags = screen.getByText('Hello world');

        expect(strippedHtmlTags).toBeInTheDocument();
    });
});
