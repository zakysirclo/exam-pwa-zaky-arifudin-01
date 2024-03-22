import { render, screen } from '@testing-library/react';
import { generateThumborUrl, getImageFallbackUrl, generateImageDimensions } from '@helpers/image';

const storeConfig = JSON.parse(localStorage.getItem('storeConfig'));
const enable = storeConfig.pwa.thumbor_enable;
const useHttpsOrHttp = storeConfig.pwa.thumbor_https_http;
const url = storeConfig.pwa.thumbor_url;
describe('Image Helpers', () => {
    it('Should return thumbor url from Sirclo\'s CDN', () => {
        render(
            <>
                <div>{generateThumborUrl('https://www.google.com/image.jpg', 400, 600, enable, useHttpsOrHttp, url)}</div>
            </>,
        );

        const imageSource = screen.getByText('https://thumbor.sirclocdn.com/unsafe/400x600/filters:format(webp)/www.google.com/image.jpg');
        expect(imageSource).toBeInTheDocument();
    });

    it('Should return image fallback URL', () => {
        render(
            <>
                <div>{getImageFallbackUrl('https://www.google.com/image.webp')}</div>
            </>,
        );

        const imageSource = screen.getByText('https://www.google.com/image.jpeg');
        expect(imageSource).toBeInTheDocument();
    });

    it('Should return an array containing default image dimension if params are empty', () => {
        expect(generateImageDimensions('')).toMatchObject({
            height: 500,
            width: 500,
        });
    });

    it('Should return an array containing image natural dimension', () => {
        expect(generateImageDimensions('https://via.placeholder.com/150x150')).toMatchObject({
            height: 0,
            width: 0,
        });
    });
});
