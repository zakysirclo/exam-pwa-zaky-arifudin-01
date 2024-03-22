import { basePath } from '@config';

function setDefaultWhenEmpty(imageSrc) {
    return imageSrc || `${basePath}/assets/img/sample/product.png`;
}

export default setDefaultWhenEmpty;
