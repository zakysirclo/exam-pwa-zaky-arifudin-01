import Accordion from '@common_acccordion';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';
import Divider from '@common_divider';
import cx from 'classnames';

const ProductTabsAccordion = (props) => {
    const { data } = props;
    const { smartProductTabs } = props;

    if (smartProductTabs) {
        if (smartProductTabs.tab_1 && smartProductTabs.tab_1.label) {
            data.push({
                title: smartProductTabs.tab_1.label,
                content: smartProductTabs.tab_1.content,
                type: 'html',
            });
        }
        if (smartProductTabs.tab_2 && smartProductTabs.tab_2.label) {
            data.push({
                title: smartProductTabs.tab_2.label,
                content: smartProductTabs.tab_2.content,
                type: 'html',
            });
        }
        if (smartProductTabs.tab_3 && smartProductTabs.tab_3.label) {
            data.push({
                title: smartProductTabs.tab_3.label,
                content: smartProductTabs.tab_3.content,
                type: 'html',
            });
        }
    }

    if (!data) return null;

    return (
        <div className={cx(
            'desktop:px-[0px] tablet:px-[0px] mobile:px-[16px]',
        )}
        >
            {
                data.map((item, index) => {
                    if (item.type === 'react-component') {
                        return (
                            <>
                                <Accordion
                                    key={`accordion-product-detail-${index}`}
                                    label={item?.title || '-'}
                                >
                                    {item.content}
                                </Accordion>
                                <Divider className="mt-[24px] mb-[24px]" />
                            </>
                        );
                    }
                    return (
                        <>
                            <Accordion
                                key={`accordion-product-detail-${index}`}
                                label={item?.title || '-'}
                            >
                                {item.content ? <CmsRenderer content={item.content} /> : null}
                            </Accordion>
                            <Divider className="mt-[24px] mb-[24px]" />
                        </>
                    );
                })
            }
        </div>
    );
};

export default ProductTabsAccordion;
