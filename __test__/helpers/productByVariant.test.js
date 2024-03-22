/* eslint-disable max-len */
import ProductByVariant, {
    generateValue, handleSelected, generateAvailableCombination, CheckAvailableStock,
} from '@helpers/productByVariant';

// Sample test case : `chaz-kangeroo-hoodie`

describe('Product Variant Helper', () => {
    it('Should generate value product variant when no selected options are available', () => {
        const selectConfigurable = {};
        const configurable_options = [
            {
                __typename: 'ConfigurableProductOptions',
                id: 3,
                attribute_id: '93',
                label: 'Color',
                position: 0,
                use_default: false,
                attribute_code: 'color',
                values: [
                    {
                        __typename: 'ConfigurableProductOptionsValues',
                        value_index: 49,
                        label: 'Black',
                        swatch_data: {
                            __typename: 'ColorSwatchData',
                            value: '#000000',
                        },
                    },
                    {
                        __typename: 'ConfigurableProductOptionsValues',
                        value_index: 52,
                        label: 'Gray',
                        swatch_data: {
                            __typename: 'ColorSwatchData',
                            value: '#8f8f8f',
                        },
                    },
                    {
                        __typename: 'ConfigurableProductOptionsValues',
                        value_index: 56,
                        label: 'Orange',
                        swatch_data: {
                            __typename: 'ColorSwatchData',
                            value: '#eb6703',
                        },
                    },
                ],
                product_id: 67,
            },
            {
                __typename: 'ConfigurableProductOptions',
                id: 2,
                attribute_id: '141',
                label: 'Size',
                position: 0,
                use_default: false,
                attribute_code: 'size',
                values: [
                    {
                        __typename: 'ConfigurableProductOptionsValues',
                        value_index: 167,
                        label: 'XS',
                        swatch_data: {
                            __typename: 'TextSwatchData',
                            value: 'XS',
                        },
                    },
                    {
                        __typename: 'ConfigurableProductOptionsValues',
                        value_index: 168,
                        label: 'S',
                        swatch_data: {
                            __typename: 'TextSwatchData',
                            value: 'S',
                        },
                    },
                    {
                        __typename: 'ConfigurableProductOptionsValues',
                        value_index: 169,
                        label: 'M',
                        swatch_data: {
                            __typename: 'TextSwatchData',
                            value: 'M',
                        },
                    },
                    {
                        __typename: 'ConfigurableProductOptionsValues',
                        value_index: 170,
                        label: 'L',
                        swatch_data: {
                            __typename: 'TextSwatchData',
                            value: 'L',
                        },
                    },
                    {
                        __typename: 'ConfigurableProductOptionsValues',
                        value_index: 171,
                        label: 'XL',
                        swatch_data: {
                            __typename: 'TextSwatchData',
                            value: 'XL',
                        },
                    },
                ],
                product_id: 67,
            },
        ];
        const combination = {};
        const expected = [
            {
                options: {
                    __typename: 'ConfigurableProductOptions',
                    id: 3,
                    attribute_id: '93',
                    label: 'Color',
                    position: 0,
                    use_default: false,
                    attribute_code: 'color',
                    values: [
                        {
                            __typename: 'ConfigurableProductOptionsValues',
                            value_index: 49,
                            label: 'Black',
                            swatch_data: {
                                __typename: 'ColorSwatchData',
                                value: '#000000',
                            },
                        },
                        {
                            __typename: 'ConfigurableProductOptionsValues',
                            value_index: 52,
                            label: 'Gray',
                            swatch_data: {
                                __typename: 'ColorSwatchData',
                                value: '#8f8f8f',
                            },
                        },
                        {
                            __typename: 'ConfigurableProductOptionsValues',
                            value_index: 56,
                            label: 'Orange',
                            swatch_data: {
                                __typename: 'ColorSwatchData',
                                value: '#eb6703',
                            },
                        },
                    ],
                    product_id: 67,
                    isSwatch: true,
                },
                value: [
                    {
                        label: 'Black',
                        value: 49,
                        disabled: false,
                        thumbnail: '',
                        content: '#000000',
                    },
                    {
                        label: 'Gray',
                        value: 52,
                        disabled: false,
                        thumbnail: '',
                        content: '#8f8f8f',
                    },
                    {
                        label: 'Orange',
                        value: 56,
                        disabled: false,
                        thumbnail: '',
                        content: '#eb6703',
                    },
                ],
            },
            {
                options: {
                    __typename: 'ConfigurableProductOptions',
                    id: 2,
                    attribute_id: '141',
                    label: 'Size',
                    position: 0,
                    use_default: false,
                    attribute_code: 'size',
                    values: [
                        {
                            __typename: 'ConfigurableProductOptionsValues',
                            value_index: 167,
                            label: 'XS',
                            swatch_data: {
                                __typename: 'TextSwatchData',
                                value: 'XS',
                            },
                        },
                        {
                            __typename: 'ConfigurableProductOptionsValues',
                            value_index: 168,
                            label: 'S',
                            swatch_data: {
                                __typename: 'TextSwatchData',
                                value: 'S',
                            },
                        },
                        {
                            __typename: 'ConfigurableProductOptionsValues',
                            value_index: 169,
                            label: 'M',
                            swatch_data: {
                                __typename: 'TextSwatchData',
                                value: 'M',
                            },
                        },
                        {
                            __typename: 'ConfigurableProductOptionsValues',
                            value_index: 170,
                            label: 'L',
                            swatch_data: {
                                __typename: 'TextSwatchData',
                                value: 'L',
                            },
                        },
                        {
                            __typename: 'ConfigurableProductOptionsValues',
                            value_index: 171,
                            label: 'XL',
                            swatch_data: {
                                __typename: 'TextSwatchData',
                                value: 'XL',
                            },
                        },
                    ],
                    product_id: 67,
                    isSwatch: true,
                },
                value: [
                    {
                        label: 'XS',
                        value: 167,
                        disabled: false,
                        thumbnail: '',
                        content: 'XS',
                    },
                    {
                        label: 'S',
                        value: 168,
                        disabled: false,
                        thumbnail: '',
                        content: 'S',
                    },
                    {
                        label: 'M',
                        value: 169,
                        disabled: false,
                        thumbnail: '',
                        content: 'M',
                    },
                    {
                        label: 'L',
                        value: 170,
                        disabled: false,
                        thumbnail: '',
                        content: 'L',
                    },
                    {
                        label: 'XL',
                        value: 171,
                        disabled: false,
                        thumbnail: '',
                        content: 'XL',
                    },
                ],
            },
        ];
        expect(generateValue(selectConfigurable, configurable_options, combination)).toMatchObject(expected);
    });
    it('Should generate value product variant when AVAILABLE selected options', () => {
        const selectConfigurable = {
            color: 49,
        };
        const configurable_options = [
            {
                __typename: 'ConfigurableProductOptions',
                id: 3,
                attribute_id: '93',
                label: 'Color',
                position: 0,
                use_default: false,
                attribute_code: 'color',
                values: [
                    {
                        __typename: 'ConfigurableProductOptionsValues',
                        value_index: 49,
                        label: 'Black',
                        swatch_data: {
                            __typename: 'ColorSwatchData',
                            value: '#000000',
                        },
                    },
                    {
                        __typename: 'ConfigurableProductOptionsValues',
                        value_index: 52,
                        label: 'Gray',
                        swatch_data: {
                            __typename: 'ColorSwatchData',
                            value: '#8f8f8f',
                        },
                    },
                    {
                        __typename: 'ConfigurableProductOptionsValues',
                        value_index: 56,
                        label: 'Orange',
                        swatch_data: {
                            __typename: 'ColorSwatchData',
                            value: '#eb6703',
                        },
                    },
                ],
                product_id: 67,
            },
            {
                __typename: 'ConfigurableProductOptions',
                id: 2,
                attribute_id: '141',
                label: 'Size',
                position: 0,
                use_default: false,
                attribute_code: 'size',
                values: [
                    {
                        __typename: 'ConfigurableProductOptionsValues',
                        value_index: 167,
                        label: 'XS',
                        swatch_data: {
                            __typename: 'TextSwatchData',
                            value: 'XS',
                        },
                    },
                    {
                        __typename: 'ConfigurableProductOptionsValues',
                        value_index: 168,
                        label: 'S',
                        swatch_data: {
                            __typename: 'TextSwatchData',
                            value: 'S',
                        },
                    },
                    {
                        __typename: 'ConfigurableProductOptionsValues',
                        value_index: 169,
                        label: 'M',
                        swatch_data: {
                            __typename: 'TextSwatchData',
                            value: 'M',
                        },
                    },
                    {
                        __typename: 'ConfigurableProductOptionsValues',
                        value_index: 170,
                        label: 'L',
                        swatch_data: {
                            __typename: 'TextSwatchData',
                            value: 'L',
                        },
                    },
                    {
                        __typename: 'ConfigurableProductOptionsValues',
                        value_index: 171,
                        label: 'XL',
                        swatch_data: {
                            __typename: 'TextSwatchData',
                            value: 'XL',
                        },
                    },
                ],
                product_id: 67,
            },
        ];
        const combination = {
            49: {
                __typename: 'ConfigurableAttributeOption',
                uid: 'Y29uZmlndXJhYmxlLzkzLzQ5',
                label: 'Black',
                code: 'color',
                value_index: 49,
            },
            167: {
                __typename: 'ConfigurableAttributeOption',
                uid: 'Y29uZmlndXJhYmxlLzE0MS8xNjc=',
                label: 'XS',
                code: 'size',
                value_index: 167,
            },
            168: {
                __typename: 'ConfigurableAttributeOption',
                uid: 'Y29uZmlndXJhYmxlLzE0MS8xNjg=',
                label: 'S',
                code: 'size',
                value_index: 168,
            },
            169: {
                __typename: 'ConfigurableAttributeOption',
                uid: 'Y29uZmlndXJhYmxlLzE0MS8xNjk=',
                label: 'M',
                code: 'size',
                value_index: 169,
            },
            170: {
                __typename: 'ConfigurableAttributeOption',
                uid: 'Y29uZmlndXJhYmxlLzE0MS8xNzA=',
                label: 'L',
                code: 'size',
                value_index: 170,
            },
            171: {
                __typename: 'ConfigurableAttributeOption',
                uid: 'Y29uZmlndXJhYmxlLzE0MS8xNzE=',
                label: 'XL',
                code: 'size',
                value_index: 171,
            },
        };
        const expected = [
            {
                options: {
                    __typename: 'ConfigurableProductOptions',
                    id: 3,
                    attribute_id: '93',
                    label: 'Color',
                    position: 0,
                    use_default: false,
                    attribute_code: 'color',
                    values: [
                        {
                            __typename: 'ConfigurableProductOptionsValues',
                            value_index: 49,
                            label: 'Black',
                            swatch_data: {
                                __typename: 'ColorSwatchData',
                                value: '#000000',
                            },
                        },
                        {
                            __typename: 'ConfigurableProductOptionsValues',
                            value_index: 52,
                            label: 'Gray',
                            swatch_data: {
                                __typename: 'ColorSwatchData',
                                value: '#8f8f8f',
                            },
                        },
                        {
                            __typename: 'ConfigurableProductOptionsValues',
                            value_index: 56,
                            label: 'Orange',
                            swatch_data: {
                                __typename: 'ColorSwatchData',
                                value: '#eb6703',
                            },
                        },
                    ],
                    product_id: 67,
                    isSwatch: true,
                },
                value: [
                    {
                        label: 'Black',
                        value: 49,
                        disabled: false,
                        thumbnail: '',
                        content: '#000000',
                    },
                    {
                        label: 'Gray',
                        value: 52,
                        disabled: false,
                        thumbnail: '',
                        content: '#8f8f8f',
                    },
                    {
                        label: 'Orange',
                        value: 56,
                        disabled: false,
                        thumbnail: '',
                        content: '#eb6703',
                    },
                ],
            },
            {
                options: {
                    __typename: 'ConfigurableProductOptions',
                    id: 2,
                    attribute_id: '141',
                    label: 'Size',
                    position: 0,
                    use_default: false,
                    attribute_code: 'size',
                    values: [
                        {
                            __typename: 'ConfigurableProductOptionsValues',
                            value_index: 167,
                            label: 'XS',
                            swatch_data: {
                                __typename: 'TextSwatchData',
                                value: 'XS',
                            },
                        },
                        {
                            __typename: 'ConfigurableProductOptionsValues',
                            value_index: 168,
                            label: 'S',
                            swatch_data: {
                                __typename: 'TextSwatchData',
                                value: 'S',
                            },
                        },
                        {
                            __typename: 'ConfigurableProductOptionsValues',
                            value_index: 169,
                            label: 'M',
                            swatch_data: {
                                __typename: 'TextSwatchData',
                                value: 'M',
                            },
                        },
                        {
                            __typename: 'ConfigurableProductOptionsValues',
                            value_index: 170,
                            label: 'L',
                            swatch_data: {
                                __typename: 'TextSwatchData',
                                value: 'L',
                            },
                        },
                        {
                            __typename: 'ConfigurableProductOptionsValues',
                            value_index: 171,
                            label: 'XL',
                            swatch_data: {
                                __typename: 'TextSwatchData',
                                value: 'XL',
                            },
                        },
                    ],
                    product_id: 67,
                    isSwatch: true,
                },
                value: [
                    {
                        label: 'XS',
                        value: 167,
                        disabled: false,
                        thumbnail: '',
                        content: 'XS',
                    },
                    {
                        label: 'S',
                        value: 168,
                        disabled: false,
                        thumbnail: '',
                        content: 'S',
                    },
                    {
                        label: 'M',
                        value: 169,
                        disabled: false,
                        thumbnail: '',
                        content: 'M',
                    },
                    {
                        label: 'L',
                        value: 170,
                        disabled: false,
                        thumbnail: '',
                        content: 'L',
                    },
                    {
                        label: 'XL',
                        value: 171,
                        disabled: false,
                        thumbnail: '',
                        content: 'XL',
                    },
                ],
            },
        ];
        expect(generateValue(selectConfigurable, configurable_options, combination)).toMatchObject(expected);
    });
    it('Should clicked options to be saved in current state of configurable options', () => {
        const selectConfigurable = {};
        const key = 'color';
        const value = 49;
        const expected = {
            color: 49,
        };
        expect(handleSelected(selectConfigurable, key, value)).toMatchObject(expected);
    });
    it('Should generate available product combination', () => {
        const selectedOption = {
            color: 49,
        };
        const product_items = {
            __typename: 'ConfigurableProduct',
            configurable_options: [
                {
                    __typename: 'ConfigurableProductOptions',
                    id: 3,
                    attribute_id: '93',
                    label: 'Color',
                    position: 0,
                    use_default: false,
                    attribute_code: 'color',
                    values: [
                        {
                            __typename: 'ConfigurableProductOptionsValues',
                            value_index: 49,
                            label: 'Black',
                            swatch_data: {
                                __typename: 'ColorSwatchData',
                                value: '#000000',
                            },
                        },
                        {
                            __typename: 'ConfigurableProductOptionsValues',
                            value_index: 52,
                            label: 'Gray',
                            swatch_data: {
                                __typename: 'ColorSwatchData',
                                value: '#8f8f8f',
                            },
                        },
                        {
                            __typename: 'ConfigurableProductOptionsValues',
                            value_index: 56,
                            label: 'Orange',
                            swatch_data: {
                                __typename: 'ColorSwatchData',
                                value: '#eb6703',
                            },
                        },
                    ],
                    product_id: 67,
                },
                {
                    __typename: 'ConfigurableProductOptions',
                    id: 2,
                    attribute_id: '141',
                    label: 'Size',
                    position: 0,
                    use_default: false,
                    attribute_code: 'size',
                    values: [
                        {
                            __typename: 'ConfigurableProductOptionsValues',
                            value_index: 167,
                            label: 'XS',
                            swatch_data: {
                                __typename: 'TextSwatchData',
                                value: 'XS',
                            },
                        },
                        {
                            __typename: 'ConfigurableProductOptionsValues',
                            value_index: 168,
                            label: 'S',
                            swatch_data: {
                                __typename: 'TextSwatchData',
                                value: 'S',
                            },
                        },
                        {
                            __typename: 'ConfigurableProductOptionsValues',
                            value_index: 169,
                            label: 'M',
                            swatch_data: {
                                __typename: 'TextSwatchData',
                                value: 'M',
                            },
                        },
                        {
                            __typename: 'ConfigurableProductOptionsValues',
                            value_index: 170,
                            label: 'L',
                            swatch_data: {
                                __typename: 'TextSwatchData',
                                value: 'L',
                            },
                        },
                        {
                            __typename: 'ConfigurableProductOptionsValues',
                            value_index: 171,
                            label: 'XL',
                            swatch_data: {
                                __typename: 'TextSwatchData',
                                value: 'XL',
                            },
                        },
                    ],
                    product_id: 67,
                },
            ],
            variants: [
                {
                    __typename: 'ConfigurableVariant',
                    product: {
                        __typename: 'SimpleProduct',
                        id: 52,
                        name: 'Chaz Kangeroo Hoodie-XS-Black',
                        sku: 'MH01-XS-Black',
                        stock_status: 'IN_STOCK',
                        url_key: 'chaz-kangeroo-hoodie-xs-black',
                        attribute_set_id: 9,
                        small_image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-black_main.jpg',
                            label: 'Chaz Kangeroo Hoodie-XS-Black',
                        },
                        image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-black_main.jpg',
                        },
                        media_gallery_entries: [
                            {
                                __typename: 'MediaGalleryEntry',
                                media_type: 'image',
                                video_content: null,
                            },
                        ],
                        review: {
                            __typename: 'ReviewSummary',
                            rating_summary: null,
                            reviews_count: null,
                        },
                        categories: [],
                        special_from_date: '2021-10-26 00:00:00',
                        special_to_date: null,
                        price_range: {
                            __typename: 'PriceRange',
                            minimum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                            maximum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                        },
                        price_tiers: [],
                        media_gallery: [
                            {
                                __typename: 'ProductImage',
                                url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-black_main.jpg',
                                label: null,
                            },
                        ],
                    },
                    attributes: [
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzkzLzQ5',
                            label: 'Black',
                            code: 'color',
                            value_index: 49,
                        },
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzE0MS8xNjc=',
                            label: 'XS',
                            code: 'size',
                            value_index: 167,
                        },
                    ],
                },
                {
                    __typename: 'ConfigurableVariant',
                    product: {
                        __typename: 'SimpleProduct',
                        id: 53,
                        name: 'Chaz Kangeroo Hoodie-XS-Gray',
                        sku: 'MH01-XS-Gray',
                        stock_status: 'IN_STOCK',
                        url_key: 'chaz-kangeroo-hoodie-xs-gray',
                        attribute_set_id: 9,
                        small_image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-gray_main.jpg',
                            label: 'Chaz Kangeroo Hoodie-XS-Gray',
                        },
                        image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-gray_main.jpg',
                        },
                        media_gallery_entries: [
                            {
                                __typename: 'MediaGalleryEntry',
                                media_type: 'image',
                                video_content: null,
                            },
                            {
                                __typename: 'MediaGalleryEntry',
                                media_type: 'image',
                                video_content: null,
                            },
                            {
                                __typename: 'MediaGalleryEntry',
                                media_type: 'image',
                                video_content: null,
                            },
                        ],
                        review: {
                            __typename: 'ReviewSummary',
                            rating_summary: null,
                            reviews_count: null,
                        },
                        categories: [],
                        special_from_date: null,
                        special_to_date: null,
                        price_range: {
                            __typename: 'PriceRange',
                            minimum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                            maximum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                        },
                        price_tiers: [],
                        media_gallery: [
                            {
                                __typename: 'ProductImage',
                                url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_main.jpg',
                                label: '',
                            },
                            {
                                __typename: 'ProductImage',
                                url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_alt1.jpg',
                                label: '',
                            },
                            {
                                __typename: 'ProductImage',
                                url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_back.jpg',
                                label: '',
                            },
                        ],
                    },
                    attributes: [
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzkzLzUy',
                            label: 'Gray',
                            code: 'color',
                            value_index: 52,
                        },
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzE0MS8xNjc=',
                            label: 'XS',
                            code: 'size',
                            value_index: 167,
                        },
                    ],
                },
                {
                    __typename: 'ConfigurableVariant',
                    product: {
                        __typename: 'SimpleProduct',
                        id: 54,
                        name: 'Chaz Kangeroo Hoodie-XS-Orange',
                        sku: 'MH01-XS-Orange',
                        stock_status: 'IN_STOCK',
                        url_key: 'chaz-kangeroo-hoodie-xs-orange',
                        attribute_set_id: 9,
                        small_image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-orange_main.jpg',
                            label: 'Chaz Kangeroo Hoodie-XS-Orange',
                        },
                        image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-orange_main.jpg',
                        },
                        media_gallery_entries: [
                            {
                                __typename: 'MediaGalleryEntry',
                                media_type: 'image',
                                video_content: null,
                            },
                        ],
                        review: {
                            __typename: 'ReviewSummary',
                            rating_summary: null,
                            reviews_count: null,
                        },
                        categories: [],
                        special_from_date: null,
                        special_to_date: null,
                        price_range: {
                            __typename: 'PriceRange',
                            minimum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                            maximum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                        },
                        price_tiers: [],
                        media_gallery: [
                            {
                                __typename: 'ProductImage',
                                url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-orange_main.jpg',
                                label: '',
                            },
                        ],
                    },
                    attributes: [
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzkzLzU2',
                            label: 'Orange',
                            code: 'color',
                            value_index: 56,
                        },
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzE0MS8xNjc=',
                            label: 'XS',
                            code: 'size',
                            value_index: 167,
                        },
                    ],
                },
                {
                    __typename: 'ConfigurableVariant',
                    product: {
                        __typename: 'SimpleProduct',
                        id: 55,
                        name: 'Chaz Kangeroo Hoodie-S-Black',
                        sku: 'MH01-S-Black',
                        stock_status: 'IN_STOCK',
                        url_key: 'chaz-kangeroo-hoodie-s-black',
                        attribute_set_id: 9,
                        small_image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-black_main.jpg',
                            label: 'Chaz Kangeroo Hoodie-XS-Black',
                        },
                        image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-black_main.jpg',
                        },
                        media_gallery_entries: [
                            {
                                __typename: 'MediaGalleryEntry',
                                media_type: 'image',
                                video_content: null,
                            },
                        ],
                        review: {
                            __typename: 'ReviewSummary',
                            rating_summary: null,
                            reviews_count: null,
                        },
                        categories: [],
                        special_from_date: null,
                        special_to_date: null,
                        price_range: {
                            __typename: 'PriceRange',
                            minimum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                            maximum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                        },
                        price_tiers: [],
                        media_gallery: [
                            {
                                __typename: 'ProductImage',
                                url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-black_main.jpg',
                                label: null,
                            },
                        ],
                    },
                    attributes: [
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzkzLzQ5',
                            label: 'Black',
                            code: 'color',
                            value_index: 49,
                        },
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzE0MS8xNjg=',
                            label: 'S',
                            code: 'size',
                            value_index: 168,
                        },
                    ],
                },
                {
                    __typename: 'ConfigurableVariant',
                    product: {
                        __typename: 'SimpleProduct',
                        id: 56,
                        name: 'Chaz Kangeroo Hoodie-S-Gray',
                        sku: 'MH01-S-Gray',
                        stock_status: 'IN_STOCK',
                        url_key: 'chaz-kangeroo-hoodie-s-gray',
                        attribute_set_id: 9,
                        small_image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-gray_main.jpg',
                            label: 'Chaz Kangeroo Hoodie-XS-Gray',
                        },
                        image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-gray_main.jpg',
                        },
                        media_gallery_entries: [
                            {
                                __typename: 'MediaGalleryEntry',
                                media_type: 'image',
                                video_content: null,
                            },
                            {
                                __typename: 'MediaGalleryEntry',
                                media_type: 'image',
                                video_content: null,
                            },
                            {
                                __typename: 'MediaGalleryEntry',
                                media_type: 'image',
                                video_content: null,
                            },
                        ],
                        review: {
                            __typename: 'ReviewSummary',
                            rating_summary: null,
                            reviews_count: null,
                        },
                        categories: [],
                        special_from_date: null,
                        special_to_date: null,
                        price_range: {
                            __typename: 'PriceRange',
                            minimum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                            maximum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                        },
                        price_tiers: [],
                        media_gallery: [
                            {
                                __typename: 'ProductImage',
                                url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_main.jpg',
                                label: '',
                            },
                            {
                                __typename: 'ProductImage',
                                url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_alt1.jpg',
                                label: '',
                            },
                            {
                                __typename: 'ProductImage',
                                url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_back.jpg',
                                label: '',
                            },
                        ],
                    },
                    attributes: [
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzkzLzUy',
                            label: 'Gray',
                            code: 'color',
                            value_index: 52,
                        },
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzE0MS8xNjg=',
                            label: 'S',
                            code: 'size',
                            value_index: 168,
                        },
                    ],
                },
                {
                    __typename: 'ConfigurableVariant',
                    product: {
                        __typename: 'SimpleProduct',
                        id: 57,
                        name: 'Chaz Kangeroo Hoodie-S-Orange',
                        sku: 'MH01-S-Orange',
                        stock_status: 'IN_STOCK',
                        url_key: 'chaz-kangeroo-hoodie-s-orange',
                        attribute_set_id: 9,
                        small_image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-orange_main.jpg',
                            label: 'Chaz Kangeroo Hoodie-XS-Orange',
                        },
                        image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-orange_main.jpg',
                        },
                        media_gallery_entries: [
                            {
                                __typename: 'MediaGalleryEntry',
                                media_type: 'image',
                                video_content: null,
                            },
                        ],
                        review: {
                            __typename: 'ReviewSummary',
                            rating_summary: null,
                            reviews_count: null,
                        },
                        categories: [],
                        special_from_date: null,
                        special_to_date: null,
                        price_range: {
                            __typename: 'PriceRange',
                            minimum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                            maximum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                        },
                        price_tiers: [],
                        media_gallery: [
                            {
                                __typename: 'ProductImage',
                                url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-orange_main.jpg',
                                label: '',
                            },
                        ],
                    },
                    attributes: [
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzkzLzU2',
                            label: 'Orange',
                            code: 'color',
                            value_index: 56,
                        },
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzE0MS8xNjg=',
                            label: 'S',
                            code: 'size',
                            value_index: 168,
                        },
                    ],
                },
                {
                    __typename: 'ConfigurableVariant',
                    product: {
                        __typename: 'SimpleProduct',
                        id: 58,
                        name: 'Chaz Kangeroo Hoodie-M-Black',
                        sku: 'MH01-M-Black',
                        stock_status: 'IN_STOCK',
                        url_key: 'chaz-kangeroo-hoodie-m-black',
                        attribute_set_id: 9,
                        small_image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-black_main.jpg',
                            label: 'Chaz Kangeroo Hoodie-XS-Black',
                        },
                        image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-black_main.jpg',
                        },
                        media_gallery_entries: [
                            {
                                __typename: 'MediaGalleryEntry',
                                media_type: 'image',
                                video_content: null,
                            },
                        ],
                        review: {
                            __typename: 'ReviewSummary',
                            rating_summary: null,
                            reviews_count: null,
                        },
                        categories: [],
                        special_from_date: null,
                        special_to_date: null,
                        price_range: {
                            __typename: 'PriceRange',
                            minimum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                            maximum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                        },
                        price_tiers: [],
                        media_gallery: [
                            {
                                __typename: 'ProductImage',
                                url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-black_main.jpg',
                                label: null,
                            },
                        ],
                    },
                    attributes: [
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzkzLzQ5',
                            label: 'Black',
                            code: 'color',
                            value_index: 49,
                        },
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzE0MS8xNjk=',
                            label: 'M',
                            code: 'size',
                            value_index: 169,
                        },
                    ],
                },
                {
                    __typename: 'ConfigurableVariant',
                    product: {
                        __typename: 'SimpleProduct',
                        id: 59,
                        name: 'Chaz Kangeroo Hoodie-M-Gray',
                        sku: 'MH01-M-Gray',
                        stock_status: 'IN_STOCK',
                        url_key: 'chaz-kangeroo-hoodie-m-gray',
                        attribute_set_id: 9,
                        small_image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-gray_main.jpg',
                            label: 'Chaz Kangeroo Hoodie-XS-Gray',
                        },
                        image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-gray_main.jpg',
                        },
                        media_gallery_entries: [
                            {
                                __typename: 'MediaGalleryEntry',
                                media_type: 'image',
                                video_content: null,
                            },
                            {
                                __typename: 'MediaGalleryEntry',
                                media_type: 'image',
                                video_content: null,
                            },
                            {
                                __typename: 'MediaGalleryEntry',
                                media_type: 'image',
                                video_content: null,
                            },
                        ],
                        review: {
                            __typename: 'ReviewSummary',
                            rating_summary: null,
                            reviews_count: null,
                        },
                        categories: [],
                        special_from_date: null,
                        special_to_date: null,
                        price_range: {
                            __typename: 'PriceRange',
                            minimum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                            maximum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                        },
                        price_tiers: [],
                        media_gallery: [
                            {
                                __typename: 'ProductImage',
                                url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_main.jpg',
                                label: '',
                            },
                            {
                                __typename: 'ProductImage',
                                url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_alt1.jpg',
                                label: '',
                            },
                            {
                                __typename: 'ProductImage',
                                url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_back.jpg',
                                label: '',
                            },
                        ],
                    },
                    attributes: [
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzkzLzUy',
                            label: 'Gray',
                            code: 'color',
                            value_index: 52,
                        },
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzE0MS8xNjk=',
                            label: 'M',
                            code: 'size',
                            value_index: 169,
                        },
                    ],
                },
                {
                    __typename: 'ConfigurableVariant',
                    product: {
                        __typename: 'SimpleProduct',
                        id: 60,
                        name: 'Chaz Kangeroo Hoodie-M-Orange',
                        sku: 'MH01-M-Orange',
                        stock_status: 'IN_STOCK',
                        url_key: 'chaz-kangeroo-hoodie-m-orange',
                        attribute_set_id: 9,
                        small_image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-orange_main.jpg',
                            label: 'Chaz Kangeroo Hoodie-XS-Orange',
                        },
                        image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-orange_main.jpg',
                        },
                        media_gallery_entries: [
                            {
                                __typename: 'MediaGalleryEntry',
                                media_type: 'image',
                                video_content: null,
                            },
                        ],
                        review: {
                            __typename: 'ReviewSummary',
                            rating_summary: null,
                            reviews_count: null,
                        },
                        categories: [],
                        special_from_date: null,
                        special_to_date: null,
                        price_range: {
                            __typename: 'PriceRange',
                            minimum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                            maximum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                        },
                        price_tiers: [],
                        media_gallery: [
                            {
                                __typename: 'ProductImage',
                                url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-orange_main.jpg',
                                label: '',
                            },
                        ],
                    },
                    attributes: [
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzkzLzU2',
                            label: 'Orange',
                            code: 'color',
                            value_index: 56,
                        },
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzE0MS8xNjk=',
                            label: 'M',
                            code: 'size',
                            value_index: 169,
                        },
                    ],
                },
                {
                    __typename: 'ConfigurableVariant',
                    product: {
                        __typename: 'SimpleProduct',
                        id: 61,
                        name: 'Chaz Kangeroo Hoodie-L-Black',
                        sku: 'MH01-L-Black',
                        stock_status: 'IN_STOCK',
                        url_key: 'chaz-kangeroo-hoodie-l-black',
                        attribute_set_id: 9,
                        small_image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-black_main.jpg',
                            label: 'Chaz Kangeroo Hoodie-XS-Black',
                        },
                        image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-black_main.jpg',
                        },
                        media_gallery_entries: [
                            {
                                __typename: 'MediaGalleryEntry',
                                media_type: 'image',
                                video_content: null,
                            },
                        ],
                        review: {
                            __typename: 'ReviewSummary',
                            rating_summary: null,
                            reviews_count: null,
                        },
                        categories: [],
                        special_from_date: null,
                        special_to_date: null,
                        price_range: {
                            __typename: 'PriceRange',
                            minimum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                            maximum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                        },
                        price_tiers: [],
                        media_gallery: [
                            {
                                __typename: 'ProductImage',
                                url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-black_main.jpg',
                                label: null,
                            },
                        ],
                    },
                    attributes: [
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzkzLzQ5',
                            label: 'Black',
                            code: 'color',
                            value_index: 49,
                        },
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzE0MS8xNzA=',
                            label: 'L',
                            code: 'size',
                            value_index: 170,
                        },
                    ],
                },
                {
                    __typename: 'ConfigurableVariant',
                    product: {
                        __typename: 'SimpleProduct',
                        id: 62,
                        name: 'Chaz Kangeroo Hoodie-L-Gray',
                        sku: 'MH01-L-Gray',
                        stock_status: 'IN_STOCK',
                        url_key: 'chaz-kangeroo-hoodie-l-gray',
                        attribute_set_id: 9,
                        small_image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-gray_main.jpg',
                            label: 'Chaz Kangeroo Hoodie-XS-Gray',
                        },
                        image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-gray_main.jpg',
                        },
                        media_gallery_entries: [
                            {
                                __typename: 'MediaGalleryEntry',
                                media_type: 'image',
                                video_content: null,
                            },
                            {
                                __typename: 'MediaGalleryEntry',
                                media_type: 'image',
                                video_content: null,
                            },
                            {
                                __typename: 'MediaGalleryEntry',
                                media_type: 'image',
                                video_content: null,
                            },
                        ],
                        review: {
                            __typename: 'ReviewSummary',
                            rating_summary: null,
                            reviews_count: null,
                        },
                        categories: [],
                        special_from_date: null,
                        special_to_date: null,
                        price_range: {
                            __typename: 'PriceRange',
                            minimum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                            maximum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                        },
                        price_tiers: [],
                        media_gallery: [
                            {
                                __typename: 'ProductImage',
                                url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_main.jpg',
                                label: '',
                            },
                            {
                                __typename: 'ProductImage',
                                url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_alt1.jpg',
                                label: '',
                            },
                            {
                                __typename: 'ProductImage',
                                url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_back.jpg',
                                label: '',
                            },
                        ],
                    },
                    attributes: [
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzkzLzUy',
                            label: 'Gray',
                            code: 'color',
                            value_index: 52,
                        },
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzE0MS8xNzA=',
                            label: 'L',
                            code: 'size',
                            value_index: 170,
                        },
                    ],
                },
                {
                    __typename: 'ConfigurableVariant',
                    product: {
                        __typename: 'SimpleProduct',
                        id: 63,
                        name: 'Chaz Kangeroo Hoodie-L-Orange',
                        sku: 'MH01-L-Orange',
                        stock_status: 'IN_STOCK',
                        url_key: 'chaz-kangeroo-hoodie-l-orange',
                        attribute_set_id: 9,
                        small_image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-orange_main.jpg',
                            label: 'Chaz Kangeroo Hoodie-XS-Orange',
                        },
                        image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-orange_main.jpg',
                        },
                        media_gallery_entries: [
                            {
                                __typename: 'MediaGalleryEntry',
                                media_type: 'image',
                                video_content: null,
                            },
                        ],
                        review: {
                            __typename: 'ReviewSummary',
                            rating_summary: null,
                            reviews_count: null,
                        },
                        categories: [],
                        special_from_date: null,
                        special_to_date: null,
                        price_range: {
                            __typename: 'PriceRange',
                            minimum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                            maximum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                        },
                        price_tiers: [],
                        media_gallery: [
                            {
                                __typename: 'ProductImage',
                                url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-orange_main.jpg',
                                label: '',
                            },
                        ],
                    },
                    attributes: [
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzkzLzU2',
                            label: 'Orange',
                            code: 'color',
                            value_index: 56,
                        },
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzE0MS8xNzA=',
                            label: 'L',
                            code: 'size',
                            value_index: 170,
                        },
                    ],
                },
                {
                    __typename: 'ConfigurableVariant',
                    product: {
                        __typename: 'SimpleProduct',
                        id: 64,
                        name: 'Chaz Kangeroo Hoodie-XL-Black',
                        sku: 'MH01-XL-Black',
                        stock_status: 'IN_STOCK',
                        url_key: 'chaz-kangeroo-hoodie-xl-black',
                        attribute_set_id: 9,
                        small_image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-black_main.jpg',
                            label: 'Chaz Kangeroo Hoodie-XS-Black',
                        },
                        image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-black_main.jpg',
                        },
                        media_gallery_entries: [
                            {
                                __typename: 'MediaGalleryEntry',
                                media_type: 'image',
                                video_content: null,
                            },
                        ],
                        review: {
                            __typename: 'ReviewSummary',
                            rating_summary: null,
                            reviews_count: null,
                        },
                        categories: [],
                        special_from_date: null,
                        special_to_date: null,
                        price_range: {
                            __typename: 'PriceRange',
                            minimum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                            maximum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                        },
                        price_tiers: [],
                        media_gallery: [
                            {
                                __typename: 'ProductImage',
                                url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-black_main.jpg',
                                label: null,
                            },
                        ],
                    },
                    attributes: [
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzkzLzQ5',
                            label: 'Black',
                            code: 'color',
                            value_index: 49,
                        },
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzE0MS8xNzE=',
                            label: 'XL',
                            code: 'size',
                            value_index: 171,
                        },
                    ],
                },
                {
                    __typename: 'ConfigurableVariant',
                    product: {
                        __typename: 'SimpleProduct',
                        id: 65,
                        name: 'Chaz Kangeroo Hoodie-XL-Gray',
                        sku: 'MH01-XL-Gray',
                        stock_status: 'IN_STOCK',
                        url_key: 'chaz-kangeroo-hoodie-xl-gray',
                        attribute_set_id: 9,
                        small_image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-gray_main.jpg',
                            label: 'Chaz Kangeroo Hoodie-XS-Gray',
                        },
                        image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-gray_main.jpg',
                        },
                        media_gallery_entries: [
                            {
                                __typename: 'MediaGalleryEntry',
                                media_type: 'image',
                                video_content: null,
                            },
                            {
                                __typename: 'MediaGalleryEntry',
                                media_type: 'image',
                                video_content: null,
                            },
                            {
                                __typename: 'MediaGalleryEntry',
                                media_type: 'image',
                                video_content: null,
                            },
                        ],
                        review: {
                            __typename: 'ReviewSummary',
                            rating_summary: null,
                            reviews_count: null,
                        },
                        categories: [],
                        special_from_date: null,
                        special_to_date: null,
                        price_range: {
                            __typename: 'PriceRange',
                            minimum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                            maximum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                        },
                        price_tiers: [],
                        media_gallery: [
                            {
                                __typename: 'ProductImage',
                                url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_main.jpg',
                                label: '',
                            },
                            {
                                __typename: 'ProductImage',
                                url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_alt1.jpg',
                                label: '',
                            },
                            {
                                __typename: 'ProductImage',
                                url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_back.jpg',
                                label: '',
                            },
                        ],
                    },
                    attributes: [
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzkzLzUy',
                            label: 'Gray',
                            code: 'color',
                            value_index: 52,
                        },
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzE0MS8xNzE=',
                            label: 'XL',
                            code: 'size',
                            value_index: 171,
                        },
                    ],
                },
                {
                    __typename: 'ConfigurableVariant',
                    product: {
                        __typename: 'SimpleProduct',
                        id: 66,
                        name: 'Chaz Kangeroo Hoodie-XL-Orange',
                        sku: 'MH01-XL-Orange',
                        stock_status: 'IN_STOCK',
                        url_key: 'chaz-kangeroo-hoodie-xl-orange',
                        attribute_set_id: 9,
                        small_image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-orange_main.jpg',
                            label: 'Chaz Kangeroo Hoodie-XS-Orange',
                        },
                        image: {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-orange_main.jpg',
                        },
                        media_gallery_entries: [
                            {
                                __typename: 'MediaGalleryEntry',
                                media_type: 'image',
                                video_content: null,
                            },
                        ],
                        review: {
                            __typename: 'ReviewSummary',
                            rating_summary: null,
                            reviews_count: null,
                        },
                        categories: [],
                        special_from_date: null,
                        special_to_date: null,
                        price_range: {
                            __typename: 'PriceRange',
                            minimum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                            maximum_price: {
                                __typename: 'ProductPrice',
                                discount: {
                                    __typename: 'ProductDiscount',
                                    amount_off: 48000,
                                    percent_off: 5.77,
                                },
                                final_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 784000,
                                },
                                fixed_product_taxes: [],
                                regular_price: {
                                    __typename: 'Money',
                                    currency: 'USD',
                                    value: 832000,
                                },
                            },
                        },
                        price_tiers: [],
                        media_gallery: [
                            {
                                __typename: 'ProductImage',
                                url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-orange_main.jpg',
                                label: '',
                            },
                        ],
                    },
                    attributes: [
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzkzLzU2',
                            label: 'Orange',
                            code: 'color',
                            value_index: 56,
                        },
                        {
                            __typename: 'ConfigurableAttributeOption',
                            uid: 'Y29uZmlndXJhYmxlLzE0MS8xNzE=',
                            label: 'XL',
                            code: 'size',
                            value_index: 171,
                        },
                    ],
                },
            ],
        };
        const expected = {
            49: {
                __typename: 'ConfigurableAttributeOption',
                uid: 'Y29uZmlndXJhYmxlLzkzLzQ5',
                label: 'Black',
                code: 'color',
                value_index: 49,
            },
            167: {
                __typename: 'ConfigurableAttributeOption',
                uid: 'Y29uZmlndXJhYmxlLzE0MS8xNjc=',
                label: 'XS',
                code: 'size',
                value_index: 167,
            },
            168: {
                __typename: 'ConfigurableAttributeOption',
                uid: 'Y29uZmlndXJhYmxlLzE0MS8xNjg=',
                label: 'S',
                code: 'size',
                value_index: 168,
            },
            169: {
                __typename: 'ConfigurableAttributeOption',
                uid: 'Y29uZmlndXJhYmxlLzE0MS8xNjk=',
                label: 'M',
                code: 'size',
                value_index: 169,
            },
            170: {
                __typename: 'ConfigurableAttributeOption',
                uid: 'Y29uZmlndXJhYmxlLzE0MS8xNzA=',
                label: 'L',
                code: 'size',
                value_index: 170,
            },
            171: {
                __typename: 'ConfigurableAttributeOption',
                uid: 'Y29uZmlndXJhYmxlLzE0MS8xNzE=',
                label: 'XL',
                code: 'size',
                value_index: 171,
            },
        };
        expect(generateAvailableCombination(selectedOption, product_items)).toMatchObject(expected);
    });
    it('Should generate product by variant', () => {
        const selectedOption = {
            color: 49,
        };
        const variants = [
            {
                __typename: 'ConfigurableVariant',
                product: {
                    __typename: 'SimpleProduct',
                    id: 52,
                    name: 'Chaz Kangeroo Hoodie-XS-Black',
                    sku: 'MH01-XS-Black',
                    stock_status: 'IN_STOCK',
                    url_key: 'chaz-kangeroo-hoodie-xs-black',
                    attribute_set_id: 9,
                    small_image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-black_main.jpg',
                        label: 'Chaz Kangeroo Hoodie-XS-Black',
                    },
                    image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-black_main.jpg',
                    },
                    media_gallery_entries: [
                        {
                            __typename: 'MediaGalleryEntry',
                            media_type: 'image',
                            video_content: null,
                        },
                    ],
                    review: {
                        __typename: 'ReviewSummary',
                        rating_summary: null,
                        reviews_count: null,
                    },
                    categories: [],
                    special_from_date: '2021-10-26 00:00:00',
                    special_to_date: null,
                    price_range: {
                        __typename: 'PriceRange',
                        minimum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                        maximum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                    },
                    price_tiers: [],
                    media_gallery: [
                        {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-black_main.jpg',
                            label: null,
                        },
                    ],
                },
                attributes: [
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzkzLzQ5',
                        label: 'Black',
                        code: 'color',
                        value_index: 49,
                    },
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzE0MS8xNjc=',
                        label: 'XS',
                        code: 'size',
                        value_index: 167,
                    },
                ],
            },
            {
                __typename: 'ConfigurableVariant',
                product: {
                    __typename: 'SimpleProduct',
                    id: 53,
                    name: 'Chaz Kangeroo Hoodie-XS-Gray',
                    sku: 'MH01-XS-Gray',
                    stock_status: 'IN_STOCK',
                    url_key: 'chaz-kangeroo-hoodie-xs-gray',
                    attribute_set_id: 9,
                    small_image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-gray_main.jpg',
                        label: 'Chaz Kangeroo Hoodie-XS-Gray',
                    },
                    image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-gray_main.jpg',
                    },
                    media_gallery_entries: [
                        {
                            __typename: 'MediaGalleryEntry',
                            media_type: 'image',
                            video_content: null,
                        },
                        {
                            __typename: 'MediaGalleryEntry',
                            media_type: 'image',
                            video_content: null,
                        },
                        {
                            __typename: 'MediaGalleryEntry',
                            media_type: 'image',
                            video_content: null,
                        },
                    ],
                    review: {
                        __typename: 'ReviewSummary',
                        rating_summary: null,
                        reviews_count: null,
                    },
                    categories: [],
                    special_from_date: null,
                    special_to_date: null,
                    price_range: {
                        __typename: 'PriceRange',
                        minimum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                        maximum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                    },
                    price_tiers: [],
                    media_gallery: [
                        {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_main.jpg',
                            label: '',
                        },
                        {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_alt1.jpg',
                            label: '',
                        },
                        {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_back.jpg',
                            label: '',
                        },
                    ],
                },
                attributes: [
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzkzLzUy',
                        label: 'Gray',
                        code: 'color',
                        value_index: 52,
                    },
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzE0MS8xNjc=',
                        label: 'XS',
                        code: 'size',
                        value_index: 167,
                    },
                ],
            },
            {
                __typename: 'ConfigurableVariant',
                product: {
                    __typename: 'SimpleProduct',
                    id: 54,
                    name: 'Chaz Kangeroo Hoodie-XS-Orange',
                    sku: 'MH01-XS-Orange',
                    stock_status: 'IN_STOCK',
                    url_key: 'chaz-kangeroo-hoodie-xs-orange',
                    attribute_set_id: 9,
                    small_image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-orange_main.jpg',
                        label: 'Chaz Kangeroo Hoodie-XS-Orange',
                    },
                    image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-orange_main.jpg',
                    },
                    media_gallery_entries: [
                        {
                            __typename: 'MediaGalleryEntry',
                            media_type: 'image',
                            video_content: null,
                        },
                    ],
                    review: {
                        __typename: 'ReviewSummary',
                        rating_summary: null,
                        reviews_count: null,
                    },
                    categories: [],
                    special_from_date: null,
                    special_to_date: null,
                    price_range: {
                        __typename: 'PriceRange',
                        minimum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                        maximum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                    },
                    price_tiers: [],
                    media_gallery: [
                        {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-orange_main.jpg',
                            label: '',
                        },
                    ],
                },
                attributes: [
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzkzLzU2',
                        label: 'Orange',
                        code: 'color',
                        value_index: 56,
                    },
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzE0MS8xNjc=',
                        label: 'XS',
                        code: 'size',
                        value_index: 167,
                    },
                ],
            },
            {
                __typename: 'ConfigurableVariant',
                product: {
                    __typename: 'SimpleProduct',
                    id: 55,
                    name: 'Chaz Kangeroo Hoodie-S-Black',
                    sku: 'MH01-S-Black',
                    stock_status: 'IN_STOCK',
                    url_key: 'chaz-kangeroo-hoodie-s-black',
                    attribute_set_id: 9,
                    small_image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-black_main.jpg',
                        label: 'Chaz Kangeroo Hoodie-XS-Black',
                    },
                    image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-black_main.jpg',
                    },
                    media_gallery_entries: [
                        {
                            __typename: 'MediaGalleryEntry',
                            media_type: 'image',
                            video_content: null,
                        },
                    ],
                    review: {
                        __typename: 'ReviewSummary',
                        rating_summary: null,
                        reviews_count: null,
                    },
                    categories: [],
                    special_from_date: null,
                    special_to_date: null,
                    price_range: {
                        __typename: 'PriceRange',
                        minimum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                        maximum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                    },
                    price_tiers: [],
                    media_gallery: [
                        {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-black_main.jpg',
                            label: null,
                        },
                    ],
                },
                attributes: [
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzkzLzQ5',
                        label: 'Black',
                        code: 'color',
                        value_index: 49,
                    },
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzE0MS8xNjg=',
                        label: 'S',
                        code: 'size',
                        value_index: 168,
                    },
                ],
            },
            {
                __typename: 'ConfigurableVariant',
                product: {
                    __typename: 'SimpleProduct',
                    id: 56,
                    name: 'Chaz Kangeroo Hoodie-S-Gray',
                    sku: 'MH01-S-Gray',
                    stock_status: 'IN_STOCK',
                    url_key: 'chaz-kangeroo-hoodie-s-gray',
                    attribute_set_id: 9,
                    small_image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-gray_main.jpg',
                        label: 'Chaz Kangeroo Hoodie-XS-Gray',
                    },
                    image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-gray_main.jpg',
                    },
                    media_gallery_entries: [
                        {
                            __typename: 'MediaGalleryEntry',
                            media_type: 'image',
                            video_content: null,
                        },
                        {
                            __typename: 'MediaGalleryEntry',
                            media_type: 'image',
                            video_content: null,
                        },
                        {
                            __typename: 'MediaGalleryEntry',
                            media_type: 'image',
                            video_content: null,
                        },
                    ],
                    review: {
                        __typename: 'ReviewSummary',
                        rating_summary: null,
                        reviews_count: null,
                    },
                    categories: [],
                    special_from_date: null,
                    special_to_date: null,
                    price_range: {
                        __typename: 'PriceRange',
                        minimum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                        maximum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                    },
                    price_tiers: [],
                    media_gallery: [
                        {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_main.jpg',
                            label: '',
                        },
                        {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_alt1.jpg',
                            label: '',
                        },
                        {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_back.jpg',
                            label: '',
                        },
                    ],
                },
                attributes: [
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzkzLzUy',
                        label: 'Gray',
                        code: 'color',
                        value_index: 52,
                    },
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzE0MS8xNjg=',
                        label: 'S',
                        code: 'size',
                        value_index: 168,
                    },
                ],
            },
            {
                __typename: 'ConfigurableVariant',
                product: {
                    __typename: 'SimpleProduct',
                    id: 57,
                    name: 'Chaz Kangeroo Hoodie-S-Orange',
                    sku: 'MH01-S-Orange',
                    stock_status: 'IN_STOCK',
                    url_key: 'chaz-kangeroo-hoodie-s-orange',
                    attribute_set_id: 9,
                    small_image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-orange_main.jpg',
                        label: 'Chaz Kangeroo Hoodie-XS-Orange',
                    },
                    image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-orange_main.jpg',
                    },
                    media_gallery_entries: [
                        {
                            __typename: 'MediaGalleryEntry',
                            media_type: 'image',
                            video_content: null,
                        },
                    ],
                    review: {
                        __typename: 'ReviewSummary',
                        rating_summary: null,
                        reviews_count: null,
                    },
                    categories: [],
                    special_from_date: null,
                    special_to_date: null,
                    price_range: {
                        __typename: 'PriceRange',
                        minimum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                        maximum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                    },
                    price_tiers: [],
                    media_gallery: [
                        {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-orange_main.jpg',
                            label: '',
                        },
                    ],
                },
                attributes: [
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzkzLzU2',
                        label: 'Orange',
                        code: 'color',
                        value_index: 56,
                    },
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzE0MS8xNjg=',
                        label: 'S',
                        code: 'size',
                        value_index: 168,
                    },
                ],
            },
            {
                __typename: 'ConfigurableVariant',
                product: {
                    __typename: 'SimpleProduct',
                    id: 58,
                    name: 'Chaz Kangeroo Hoodie-M-Black',
                    sku: 'MH01-M-Black',
                    stock_status: 'IN_STOCK',
                    url_key: 'chaz-kangeroo-hoodie-m-black',
                    attribute_set_id: 9,
                    small_image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-black_main.jpg',
                        label: 'Chaz Kangeroo Hoodie-XS-Black',
                    },
                    image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-black_main.jpg',
                    },
                    media_gallery_entries: [
                        {
                            __typename: 'MediaGalleryEntry',
                            media_type: 'image',
                            video_content: null,
                        },
                    ],
                    review: {
                        __typename: 'ReviewSummary',
                        rating_summary: null,
                        reviews_count: null,
                    },
                    categories: [],
                    special_from_date: null,
                    special_to_date: null,
                    price_range: {
                        __typename: 'PriceRange',
                        minimum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                        maximum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                    },
                    price_tiers: [],
                    media_gallery: [
                        {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-black_main.jpg',
                            label: null,
                        },
                    ],
                },
                attributes: [
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzkzLzQ5',
                        label: 'Black',
                        code: 'color',
                        value_index: 49,
                    },
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzE0MS8xNjk=',
                        label: 'M',
                        code: 'size',
                        value_index: 169,
                    },
                ],
            },
            {
                __typename: 'ConfigurableVariant',
                product: {
                    __typename: 'SimpleProduct',
                    id: 59,
                    name: 'Chaz Kangeroo Hoodie-M-Gray',
                    sku: 'MH01-M-Gray',
                    stock_status: 'IN_STOCK',
                    url_key: 'chaz-kangeroo-hoodie-m-gray',
                    attribute_set_id: 9,
                    small_image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-gray_main.jpg',
                        label: 'Chaz Kangeroo Hoodie-XS-Gray',
                    },
                    image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-gray_main.jpg',
                    },
                    media_gallery_entries: [
                        {
                            __typename: 'MediaGalleryEntry',
                            media_type: 'image',
                            video_content: null,
                        },
                        {
                            __typename: 'MediaGalleryEntry',
                            media_type: 'image',
                            video_content: null,
                        },
                        {
                            __typename: 'MediaGalleryEntry',
                            media_type: 'image',
                            video_content: null,
                        },
                    ],
                    review: {
                        __typename: 'ReviewSummary',
                        rating_summary: null,
                        reviews_count: null,
                    },
                    categories: [],
                    special_from_date: null,
                    special_to_date: null,
                    price_range: {
                        __typename: 'PriceRange',
                        minimum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                        maximum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                    },
                    price_tiers: [],
                    media_gallery: [
                        {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_main.jpg',
                            label: '',
                        },
                        {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_alt1.jpg',
                            label: '',
                        },
                        {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_back.jpg',
                            label: '',
                        },
                    ],
                },
                attributes: [
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzkzLzUy',
                        label: 'Gray',
                        code: 'color',
                        value_index: 52,
                    },
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzE0MS8xNjk=',
                        label: 'M',
                        code: 'size',
                        value_index: 169,
                    },
                ],
            },
            {
                __typename: 'ConfigurableVariant',
                product: {
                    __typename: 'SimpleProduct',
                    id: 60,
                    name: 'Chaz Kangeroo Hoodie-M-Orange',
                    sku: 'MH01-M-Orange',
                    stock_status: 'IN_STOCK',
                    url_key: 'chaz-kangeroo-hoodie-m-orange',
                    attribute_set_id: 9,
                    small_image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-orange_main.jpg',
                        label: 'Chaz Kangeroo Hoodie-XS-Orange',
                    },
                    image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-orange_main.jpg',
                    },
                    media_gallery_entries: [
                        {
                            __typename: 'MediaGalleryEntry',
                            media_type: 'image',
                            video_content: null,
                        },
                    ],
                    review: {
                        __typename: 'ReviewSummary',
                        rating_summary: null,
                        reviews_count: null,
                    },
                    categories: [],
                    special_from_date: null,
                    special_to_date: null,
                    price_range: {
                        __typename: 'PriceRange',
                        minimum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                        maximum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                    },
                    price_tiers: [],
                    media_gallery: [
                        {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-orange_main.jpg',
                            label: '',
                        },
                    ],
                },
                attributes: [
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzkzLzU2',
                        label: 'Orange',
                        code: 'color',
                        value_index: 56,
                    },
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzE0MS8xNjk=',
                        label: 'M',
                        code: 'size',
                        value_index: 169,
                    },
                ],
            },
            {
                __typename: 'ConfigurableVariant',
                product: {
                    __typename: 'SimpleProduct',
                    id: 61,
                    name: 'Chaz Kangeroo Hoodie-L-Black',
                    sku: 'MH01-L-Black',
                    stock_status: 'IN_STOCK',
                    url_key: 'chaz-kangeroo-hoodie-l-black',
                    attribute_set_id: 9,
                    small_image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-black_main.jpg',
                        label: 'Chaz Kangeroo Hoodie-XS-Black',
                    },
                    image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-black_main.jpg',
                    },
                    media_gallery_entries: [
                        {
                            __typename: 'MediaGalleryEntry',
                            media_type: 'image',
                            video_content: null,
                        },
                    ],
                    review: {
                        __typename: 'ReviewSummary',
                        rating_summary: null,
                        reviews_count: null,
                    },
                    categories: [],
                    special_from_date: null,
                    special_to_date: null,
                    price_range: {
                        __typename: 'PriceRange',
                        minimum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                        maximum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                    },
                    price_tiers: [],
                    media_gallery: [
                        {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-black_main.jpg',
                            label: null,
                        },
                    ],
                },
                attributes: [
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzkzLzQ5',
                        label: 'Black',
                        code: 'color',
                        value_index: 49,
                    },
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzE0MS8xNzA=',
                        label: 'L',
                        code: 'size',
                        value_index: 170,
                    },
                ],
            },
            {
                __typename: 'ConfigurableVariant',
                product: {
                    __typename: 'SimpleProduct',
                    id: 62,
                    name: 'Chaz Kangeroo Hoodie-L-Gray',
                    sku: 'MH01-L-Gray',
                    stock_status: 'IN_STOCK',
                    url_key: 'chaz-kangeroo-hoodie-l-gray',
                    attribute_set_id: 9,
                    small_image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-gray_main.jpg',
                        label: 'Chaz Kangeroo Hoodie-XS-Gray',
                    },
                    image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-gray_main.jpg',
                    },
                    media_gallery_entries: [
                        {
                            __typename: 'MediaGalleryEntry',
                            media_type: 'image',
                            video_content: null,
                        },
                        {
                            __typename: 'MediaGalleryEntry',
                            media_type: 'image',
                            video_content: null,
                        },
                        {
                            __typename: 'MediaGalleryEntry',
                            media_type: 'image',
                            video_content: null,
                        },
                    ],
                    review: {
                        __typename: 'ReviewSummary',
                        rating_summary: null,
                        reviews_count: null,
                    },
                    categories: [],
                    special_from_date: null,
                    special_to_date: null,
                    price_range: {
                        __typename: 'PriceRange',
                        minimum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                        maximum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                    },
                    price_tiers: [],
                    media_gallery: [
                        {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_main.jpg',
                            label: '',
                        },
                        {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_alt1.jpg',
                            label: '',
                        },
                        {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_back.jpg',
                            label: '',
                        },
                    ],
                },
                attributes: [
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzkzLzUy',
                        label: 'Gray',
                        code: 'color',
                        value_index: 52,
                    },
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzE0MS8xNzA=',
                        label: 'L',
                        code: 'size',
                        value_index: 170,
                    },
                ],
            },
            {
                __typename: 'ConfigurableVariant',
                product: {
                    __typename: 'SimpleProduct',
                    id: 63,
                    name: 'Chaz Kangeroo Hoodie-L-Orange',
                    sku: 'MH01-L-Orange',
                    stock_status: 'IN_STOCK',
                    url_key: 'chaz-kangeroo-hoodie-l-orange',
                    attribute_set_id: 9,
                    small_image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-orange_main.jpg',
                        label: 'Chaz Kangeroo Hoodie-XS-Orange',
                    },
                    image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-orange_main.jpg',
                    },
                    media_gallery_entries: [
                        {
                            __typename: 'MediaGalleryEntry',
                            media_type: 'image',
                            video_content: null,
                        },
                    ],
                    review: {
                        __typename: 'ReviewSummary',
                        rating_summary: null,
                        reviews_count: null,
                    },
                    categories: [],
                    special_from_date: null,
                    special_to_date: null,
                    price_range: {
                        __typename: 'PriceRange',
                        minimum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                        maximum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                    },
                    price_tiers: [],
                    media_gallery: [
                        {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-orange_main.jpg',
                            label: '',
                        },
                    ],
                },
                attributes: [
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzkzLzU2',
                        label: 'Orange',
                        code: 'color',
                        value_index: 56,
                    },
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzE0MS8xNzA=',
                        label: 'L',
                        code: 'size',
                        value_index: 170,
                    },
                ],
            },
            {
                __typename: 'ConfigurableVariant',
                product: {
                    __typename: 'SimpleProduct',
                    id: 64,
                    name: 'Chaz Kangeroo Hoodie-XL-Black',
                    sku: 'MH01-XL-Black',
                    stock_status: 'IN_STOCK',
                    url_key: 'chaz-kangeroo-hoodie-xl-black',
                    attribute_set_id: 9,
                    small_image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-black_main.jpg',
                        label: 'Chaz Kangeroo Hoodie-XS-Black',
                    },
                    image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-black_main.jpg',
                    },
                    media_gallery_entries: [
                        {
                            __typename: 'MediaGalleryEntry',
                            media_type: 'image',
                            video_content: null,
                        },
                    ],
                    review: {
                        __typename: 'ReviewSummary',
                        rating_summary: null,
                        reviews_count: null,
                    },
                    categories: [],
                    special_from_date: null,
                    special_to_date: null,
                    price_range: {
                        __typename: 'PriceRange',
                        minimum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                        maximum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                    },
                    price_tiers: [],
                    media_gallery: [
                        {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-black_main.jpg',
                            label: null,
                        },
                    ],
                },
                attributes: [
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzkzLzQ5',
                        label: 'Black',
                        code: 'color',
                        value_index: 49,
                    },
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzE0MS8xNzE=',
                        label: 'XL',
                        code: 'size',
                        value_index: 171,
                    },
                ],
            },
            {
                __typename: 'ConfigurableVariant',
                product: {
                    __typename: 'SimpleProduct',
                    id: 65,
                    name: 'Chaz Kangeroo Hoodie-XL-Gray',
                    sku: 'MH01-XL-Gray',
                    stock_status: 'IN_STOCK',
                    url_key: 'chaz-kangeroo-hoodie-xl-gray',
                    attribute_set_id: 9,
                    small_image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-gray_main.jpg',
                        label: 'Chaz Kangeroo Hoodie-XS-Gray',
                    },
                    image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-gray_main.jpg',
                    },
                    media_gallery_entries: [
                        {
                            __typename: 'MediaGalleryEntry',
                            media_type: 'image',
                            video_content: null,
                        },
                        {
                            __typename: 'MediaGalleryEntry',
                            media_type: 'image',
                            video_content: null,
                        },
                        {
                            __typename: 'MediaGalleryEntry',
                            media_type: 'image',
                            video_content: null,
                        },
                    ],
                    review: {
                        __typename: 'ReviewSummary',
                        rating_summary: null,
                        reviews_count: null,
                    },
                    categories: [],
                    special_from_date: null,
                    special_to_date: null,
                    price_range: {
                        __typename: 'PriceRange',
                        minimum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                        maximum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                    },
                    price_tiers: [],
                    media_gallery: [
                        {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_main.jpg',
                            label: '',
                        },
                        {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_alt1.jpg',
                            label: '',
                        },
                        {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-gray_back.jpg',
                            label: '',
                        },
                    ],
                },
                attributes: [
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzkzLzUy',
                        label: 'Gray',
                        code: 'color',
                        value_index: 52,
                    },
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzE0MS8xNzE=',
                        label: 'XL',
                        code: 'size',
                        value_index: 171,
                    },
                ],
            },
            {
                __typename: 'ConfigurableVariant',
                product: {
                    __typename: 'SimpleProduct',
                    id: 66,
                    name: 'Chaz Kangeroo Hoodie-XL-Orange',
                    sku: 'MH01-XL-Orange',
                    stock_status: 'IN_STOCK',
                    url_key: 'chaz-kangeroo-hoodie-xl-orange',
                    attribute_set_id: 9,
                    small_image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-orange_main.jpg',
                        label: 'Chaz Kangeroo Hoodie-XS-Orange',
                    },
                    image: {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-orange_main.jpg',
                    },
                    media_gallery_entries: [
                        {
                            __typename: 'MediaGalleryEntry',
                            media_type: 'image',
                            video_content: null,
                        },
                    ],
                    review: {
                        __typename: 'ReviewSummary',
                        rating_summary: null,
                        reviews_count: null,
                    },
                    categories: [],
                    special_from_date: null,
                    special_to_date: null,
                    price_range: {
                        __typename: 'PriceRange',
                        minimum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                        maximum_price: {
                            __typename: 'ProductPrice',
                            discount: {
                                __typename: 'ProductDiscount',
                                amount_off: 48000,
                                percent_off: 5.77,
                            },
                            final_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 784000,
                            },
                            fixed_product_taxes: [],
                            regular_price: {
                                __typename: 'Money',
                                currency: 'USD',
                                value: 832000,
                            },
                        },
                    },
                    price_tiers: [],
                    media_gallery: [
                        {
                            __typename: 'ProductImage',
                            url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-orange_main.jpg',
                            label: '',
                        },
                    ],
                },
                attributes: [
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzkzLzU2',
                        label: 'Orange',
                        code: 'color',
                        value_index: 56,
                    },
                    {
                        __typename: 'ConfigurableAttributeOption',
                        uid: 'Y29uZmlndXJhYmxlLzE0MS8xNzE=',
                        label: 'XL',
                        code: 'size',
                        value_index: 171,
                    },
                ],
            },
        ];
        const expected = {
            __typename: 'SimpleProduct',
            id: 52,
            name: 'Chaz Kangeroo Hoodie-XS-Black',
            sku: 'MH01-XS-Black',
            stock_status: 'IN_STOCK',
            url_key: 'chaz-kangeroo-hoodie-xs-black',
            attribute_set_id: 9,
            small_image: {
                __typename: 'ProductImage',
                url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-black_main.jpg',
                label: 'Chaz Kangeroo Hoodie-XS-Black',
            },
            image: {
                __typename: 'ProductImage',
                url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-black_main.jpg',
            },
            media_gallery_entries: [
                {
                    __typename: 'MediaGalleryEntry',
                    media_type: 'image',
                    video_content: null,
                },
            ],
            review: {
                __typename: 'ReviewSummary',
                rating_summary: null,
                reviews_count: null,
            },
            categories: [],
            special_from_date: '2021-10-26 00:00:00',
            special_to_date: null,
            price_range: {
                __typename: 'PriceRange',
                minimum_price: {
                    __typename: 'ProductPrice',
                    discount: {
                        __typename: 'ProductDiscount',
                        amount_off: 48000,
                        percent_off: 5.77,
                    },
                    final_price: {
                        __typename: 'Money',
                        currency: 'USD',
                        value: 784000,
                    },
                    fixed_product_taxes: [],
                    regular_price: {
                        __typename: 'Money',
                        currency: 'USD',
                        value: 832000,
                    },
                },
                maximum_price: {
                    __typename: 'ProductPrice',
                    discount: {
                        __typename: 'ProductDiscount',
                        amount_off: 48000,
                        percent_off: 5.77,
                    },
                    final_price: {
                        __typename: 'Money',
                        currency: 'USD',
                        value: 784000,
                    },
                    fixed_product_taxes: [],
                    regular_price: {
                        __typename: 'Money',
                        currency: 'USD',
                        value: 832000,
                    },
                },
            },
            price_tiers: [],
            media_gallery: [
                {
                    __typename: 'ProductImage',
                    url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-black_main.jpg',
                    label: null,
                },
            ],
        };
        expect(ProductByVariant(selectedOption, variants)).toMatchObject(expected);
    });
    it('Should check available stock on variants', () => {
        const attributes = {
            __typename: 'ConfigurableAttributeOption',
            uid: 'Y29uZmlndXJhYmxlLzkzLzQ5',
            label: 'Black',
            code: 'color',
            value_index: 49,
        };
        const variants = {
            __typename: 'ConfigurableVariant',
            product: {
                __typename: 'SimpleProduct',
                id: 52,
                name: 'Chaz Kangeroo Hoodie-XS-Black',
                sku: 'MH01-XS-Black',
                stock_status: 'IN_STOCK',
                url_key: 'chaz-kangeroo-hoodie-xs-black',
                attribute_set_id: 9,
                small_image: {
                    __typename: 'ProductImage',
                    url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-black_main.jpg',
                    label: 'Chaz Kangeroo Hoodie-XS-Black',
                },
                image: {
                    __typename: 'ProductImage',
                    url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/d2df078698bd98dc9630b0ec54efd562/m/h/mh01-black_main.jpg',
                },
                media_gallery_entries: [
                    {
                        __typename: 'MediaGalleryEntry',
                        media_type: 'image',
                        video_content: null,
                    },
                ],
                review: {
                    __typename: 'ReviewSummary',
                    rating_summary: null,
                    reviews_count: null,
                },
                categories: [],
                special_from_date: '2021-10-26 00:00:00',
                special_to_date: null,
                price_range: {
                    __typename: 'PriceRange',
                    minimum_price: {
                        __typename: 'ProductPrice',
                        discount: {
                            __typename: 'ProductDiscount',
                            amount_off: 48000,
                            percent_off: 5.77,
                        },
                        final_price: {
                            __typename: 'Money',
                            currency: 'USD',
                            value: 784000,
                        },
                        fixed_product_taxes: [],
                        regular_price: {
                            __typename: 'Money',
                            currency: 'USD',
                            value: 832000,
                        },
                    },
                    maximum_price: {
                        __typename: 'ProductPrice',
                        discount: {
                            __typename: 'ProductDiscount',
                            amount_off: 48000,
                            percent_off: 5.77,
                        },
                        final_price: {
                            __typename: 'Money',
                            currency: 'USD',
                            value: 784000,
                        },
                        fixed_product_taxes: [],
                        regular_price: {
                            __typename: 'Money',
                            currency: 'USD',
                            value: 832000,
                        },
                    },
                },
                price_tiers: [],
                media_gallery: [
                    {
                        __typename: 'ProductImage',
                        url: 'https://swift-sprint.testingnow.me/media/catalog/product/cache/a8acbbfadbe98fa4dafa068a1ef9886b/m/h/mh01-black_main.jpg',
                        label: null,
                    },
                ],
            },
            attributes: [
                {
                    __typename: 'ConfigurableAttributeOption',
                    uid: 'Y29uZmlndXJhYmxlLzkzLzQ5',
                    label: 'Black',
                    code: 'color',
                    value_index: 49,
                },
                {
                    __typename: 'ConfigurableAttributeOption',
                    uid: 'Y29uZmlndXJhYmxlLzE0MS8xNjc=',
                    label: 'XS',
                    code: 'size',
                    value_index: 167,
                },
            ],
        };
        expect(CheckAvailableStock(attributes, variants)).toBe(true);
    });
});
