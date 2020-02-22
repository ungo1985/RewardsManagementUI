import React from 'react'
import { shallow, mount } from 'enzyme'
import Inquiry from './Inquiry'
import ItemContext from '../contexts/ItemContext';
import PrinterContext from '../contexts/PrinterContext';


beforeEach(() => {
    fetch.resetMocks();
    jest.mock('react-router-dom');
})


it('renders the Inquiry component without crashing', () => {
    var props = {
        location: {
            search: ' ? skuNbr = 1019060'
        },
    }
    var component = shallow(<ItemContext.Provider>
        <Inquiry {...props} />
    </ItemContext.Provider>);

    expect(component.find('Inquiry').exists()).toBeTruthy();

})

it('Service responds with null inner objects', () => {
    var props = {
        //location.state.skuNbr
        location: {
            state: ' ? skuNbr = 1019060'
        },
        history: {
            location: { state: { skuNbr: 1019060 } }
        }

    }
    const searchedInput = '161640';
    const selectedPrinter = [];
    const errorBox = { serviceDown: false, skuNotFound: true };
    var component = mount(<ItemContext.Provider value={{ searchedInput }}>
        <PrinterContext.Provider value={{ selectedPrinter }}>
            <Inquiry {...props} />
        </PrinterContext.Provider>
    </ItemContext.Provider>);
    component.instance().setState({
        isLoading: false,
        errorBox: errorBox
    },
        () => {
            component.update();
        })


    expect(component.find(".skuNotFoundDiv").exists()).toBeTruthy();
})

it('Service responds success', () => {
    var props1 = {
        //location.state.skuNbr
        location: {
            state: ' ? skuNbr = 1019060'
        },
        //history.location.state.skuNbr
        history: {
            location: { state: { skuNbr: 1019060 } }
        }

    }


    const searchedInput = '161640';
    const selectedPrinter = [];
    var component = mount(<ItemContext.Provider value={{ searchedInput }}>
        <PrinterContext.Provider value={{ selectedPrinter }}>
            <Inquiry {...props1} />
        </PrinterContext.Provider>
    </ItemContext.Provider>);
    component.instance().setState({
        isLoading: false,
        showErrorBox: false,
        skuNbr: "161640",
        skuBasicInfo: {
            skuStatus: "ACTIVE",
            mamaSku: "null",
            prices: [
                {
                    price: 3.61,
                    type: "PERMANENT"
                }
            ],
            skuDescription: "2X4-96 PRIME KD WHITEWOOD STUD",
            unitOfMeasure: "EA",
            brandName: null
        }
    },
        () => {
            component.update();
        })
    expect(component.find(".sku-number").length).toEqual(1)
    expect(component.find(".sku-number").text()).toEqual("0000-161-640")
    expect(component.find(".sku-details-price").length).toEqual(1)
    expect(component.find(".sku-details-price").text()).toEqual("3.61")
    expect(component.find(".sku-details-desc").length).toEqual(1)
    expect(component.find(".sku-details-desc").text()).toEqual("2X4-96 PRIME KD WHITEWOOD STUD")

})


it('Service responds success with price value null', () => {
    var props1 = {
        //location.state.skuNbr
        location: {
            state: ' ? skuNbr = 1019060'
        },
        //history.location.state.skuNbr
        history: {
            location: { state: { skuNbr: 1019060 } }
        }

    }


    const searchedInput = '161640';
    const currentPrinter = [];
    var component = mount(<ItemContext.Provider value={{ searchedInput }}>
        <PrinterContext.Provider value={{ currentPrinter }}>
            <Inquiry {...props1} />
        </PrinterContext.Provider>
    </ItemContext.Provider>);
    component.instance().setState({
        isLoading: false,
        showErrorBox: false,
        skuNbr: "161640",
        skuBasicInfo: {
            skuStatus: "ACTIVE",
            mamaSku: "null",
            prices: [],
            skuDescription: "2X4-96 PRIME KD WHITEWOOD STUD",
            unitOfMeasure: "EA",
            brandName: null
        }
    },
        () => {
            component.update();
        })
    expect(component.find(".sku-number").length).toEqual(1)
    expect(component.find(".sku-number").text()).toEqual("0000-161-640")
    expect(component.find(".sku-details-price").length).toEqual(1)
    expect(component.find(".sku-details-price").text()).toEqual("--")
    expect(component.find(".sku-details-desc").length).toEqual(1)
    expect(component.find(".sku-details-desc").text()).toEqual("2X4-96 PRIME KD WHITEWOOD STUD")

})


it('Service responds success with sku description value null', () => {
    var props1 = {
        //location.state.skuNbr
        location: {
            state: ' ? skuNbr = 1019060'
        },
        //history.location.state.skuNbr
        history: {
            location: { state: { skuNbr: 1019060 } }
        }

    }


    const searchedInput = '161640';
    const currentPrinter = [];
    var component = mount(<ItemContext.Provider value={{ searchedInput }}>
        <PrinterContext.Provider value={{ currentPrinter }}>
            <Inquiry {...props1} />
        </PrinterContext.Provider>
    </ItemContext.Provider>);
    component.instance().setState({
        isLoading: false,
        showErrorBox: false,
        skuNbr: "161640",
        skuBasicInfo: {
            skuStatus: "ACTIVE",
            mamaSku: "null",
            prices: [],
            skuDescription: null,
            unitOfMeasure: "EA",
            brandName: null
        }
    },
        () => {
            component.update();
        })
    expect(component.find(".sku-number").length).toEqual(1)
    expect(component.find(".sku-number").text()).toEqual("0000-161-640")
    expect(component.find(".sku-details-price").length).toEqual(1)
    expect(component.find(".sku-details-price").text()).toEqual("--")
    expect(component.find(".sku-details-desc").length).toEqual(1)
    expect(component.find(".sku-details-desc").text()).toEqual("--")

})


it('Service responds success with sku status value null', () => {
    var props1 = {
        //location.state.skuNbr
        location: {
            state: ' ? skuNbr = 1019060'
        },
        //history.location.state.skuNbr
        history: {
            location: { state: { skuNbr: 1019060 } }
        }

    }


    const searchedInput = '161640';
    const currentPrinter = [];
    var component = mount(<ItemContext.Provider value={{ searchedInput }}>
        <PrinterContext.Provider value={{ currentPrinter }}>
            <Inquiry {...props1} />
        </PrinterContext.Provider>
    </ItemContext.Provider>);
    component.instance().setState({
        isLoading: false,
        showErrorBox: false,
        skuNbr: "161640",
        skuBasicInfo: {
            skuStatus: null,
            mamaSku: "null",
            prices: [],
            skuDescription: null,
            unitOfMeasure: "EA",
            brandName: null
        }
    },
        () => {
            component.update();
        })
    expect(component.find(".sku-number").length).toEqual(1)
    expect(component.find(".sku-number").text()).toEqual("0000-161-640")
    expect(component.find(".sku-details-price").length).toEqual(1)
    expect(component.find(".sku-details-price").text()).toEqual("--")
    expect(component.find(".sku-details-desc").length).toEqual(1)
    expect(component.find(".sku-details-desc").text()).toEqual("--")
    expect(component.find("#sku-details-status").length).toEqual(1)
    expect(component.find("#sku-details-status").text()).toEqual("--")

})

it('Service responds success with sku basic info value null', () => {
    var props1 = {
        //location.state.skuNbr
        location: {
            state: ' ? skuNbr = 1019060'
        },
        //history.location.state.skuNbr
        history: {
            location: { state: { skuNbr: 1019060 } }
        }

    }


    const searchedInput = '161640';
    const currentPrinter = [];
    var component = mount(<ItemContext.Provider value={{ searchedInput }}>
        <PrinterContext.Provider value={{ currentPrinter }}>
            <Inquiry {...props1} />
        </PrinterContext.Provider>
    </ItemContext.Provider>);
    component.instance().setState({
        isLoading: false,
        showErrorBox: false,
        skuNbr: "161640",
        skuBasicInfo: null
    },
        () => {
            component.update();
        })
    expect(component.find(".sku-number").length).toEqual(1)
    expect(component.find(".sku-number").text()).toEqual("0000-161-640")
    expect(component.find(".sku-details-price").length).toEqual(1)
    expect(component.find(".sku-details-price").text()).toEqual("--")
    expect(component.find(".sku-details-desc").length).toEqual(1)
    expect(component.find(".sku-details-desc").text()).toEqual("--")
    expect(component.find("#sku-details-status").length).toEqual(1)
    expect(component.find("#sku-details-status").text()).toEqual("--")

})

it('Service responds success with sku basic info value null and showErrorBox true', () => {
    var props1 = {
        //location.state.skuNbr
        location: {
            state: ' ? skuNbr = 1019060'
        },
        //history.location.state.skuNbr
        history: {
            location: { state: { skuNbr: 1019060 } }
        }

    }


    const searchedInput = '161640';
    const currentPrinter = [];
    const errorBox = { serviceDown: false, skuNotFound: true };
    var component = mount(<ItemContext.Provider value={{ searchedInput }}>
        <PrinterContext.Provider value={{ currentPrinter }}>
            <Inquiry {...props1} />
        </PrinterContext.Provider>
    </ItemContext.Provider>);
    component.instance().setState({
        isLoading: false,
        err: true,
        searchedInput: "161640",
        errorBox: errorBox,
        skuBasicInfo: null
    },
        () => {
            component.update();
        })
    expect(component.find(".skuNotFoundText").length).toEqual(1)
    expect(component.find(".skuNotFoundText").text()).toEqual("SKU # 161640 not found. Scan or enter valid SKU number.")
})


it('Service responds success', () =>{
    var props1 = {
        //location.state.skuNbr
        location: {
            state: ' ? skuNbr = 1019060'
        },
        //history.location.state.skuNbr
        history: {
            location: { state:{skuNbr:1019060}}
        }

    }

    let state = {

        skuNbr: "161640",
        skuBasicInfoBySkuStore: {
        skuNbr: "161640",
            storeId: null,
            skuBasicInfo: {
            skuStatus: "ACTIVE",
                mamaSku: "null",
                prices: [
                {
                    price: 3.61,
                    type: "PERMANENT"
                }
            ],
                skuDescription: "2X4-96\" PRIME KD WHITEWOOD STUD",
                skuImageUrls: [
                "https://content.homedepot.com/eCatalog/Contents/18/dd/71/18dd713a-355e-470e-b283-6abafb3d1cdd.jpg",
                "https://content.homedepot.com/eCatalog/Contents/58/f0/2c/58f02c96-3122-4fff-bdde-dbfbbfd998a5.jpg",
                "https://content.homedepot.com/eCatalog/Contents/18/dd/71/18dd713a-355e-470e-b283-6abafb3d1cdd.jpg",
                "https://content.homedepot.com/eCatalog/Contents/18/dd/71/18dd713a-355e-470e-b283-6abafb3d1cdd.jpg",
                "https://content.homedepot.com/eCatalog/Contents/d8/2b/04/d82b046d-6b1f-45d0-a47c-b958221b4ecb.jpg",
                "https://content.homedepot.com/eCatalog/Contents/18/dd/71/18dd713a-355e-470e-b283-6abafb3d1cdd.jpg",
                "https://content.homedepot.com/eCatalog/Contents/cb/70/69/cb70696b-0358-436a-aec7-cb02d2724e60.jpg",
                "https://content.homedepot.com/eCatalog/Contents/18/dd/71/18dd713a-355e-470e-b283-6abafb3d1cdd.jpg",
                "https://content.homedepot.com/eCatalog/Contents/18/dd/71/18dd713a-355e-470e-b283-6abafb3d1cdd.jpg",
                "https://content.homedepot.com/eCatalog/Contents/18/dd/71/18dd713a-355e-470e-b283-6abafb3d1cdd.jpg",
                "https://content.homedepot.com/eCatalog/Contents/ce/f8/b4/cef8b4b4-d6ac-461b-b43b-cc6f30cdd4d0.jpg",
                "https://content.homedepot.com/eCatalog/Contents/18/dd/71/18dd713a-355e-470e-b283-6abafb3d1cdd.jpg",
                "https://content.homedepot.com/eCatalog/Contents/18/dd/71/18dd713a-355e-470e-b283-6abafb3d1cdd.jpg",
                "https://content.homedepot.com/eCatalog/Contents/71/2f/88/712f88b9-407a-4dc4-942f-09ccdf813fd3.jpg",
                "https://content.homedepot.com/eCatalog/Contents/4d/66/66/4d66662e-2b0a-43ae-89d3-9544fb9f3e36.jpg",
                "https://content.homedepot.com/eCatalog/Contents/00/11/98/00119828-00dc-498d-9996-5a1564d3651c.jpg",
                "https://content.homedepot.com/eCatalog/Contents/18/dd/71/18dd713a-355e-470e-b283-6abafb3d1cdd.jpg",
                "https://content.homedepot.com/eCatalog/Contents/d6/06/1a/d6061a87-cfe0-4ab7-989e-5310625d3619.jpg",
                "https://content.homedepot.com/eCatalog/Contents/8d/1b/6b/8d1b6bcf-6fce-40b2-bbb1-e05718a9344e.jpg",
                "https://content.homedepot.com/eCatalog/Contents/8a/cc/86/8acc86d7-0b92-4d90-96d2-dcfe87d2efe2.jpg",
                "https://content.homedepot.com/eCatalog/Contents/18/dd/71/18dd713a-355e-470e-b283-6abafb3d1cdd.jpg",
                "https://content.homedepot.com/eCatalog/Contents/e1/6c/68/e16c6834-7b14-40c2-a20f-3fd731027ab5.jpg",
                "https://content.homedepot.com/eCatalog/Contents/35/44/1f/35441f07-ef10-4e6c-8baf-393b54ad7fce.jpg",
                "https://content.homedepot.com/eCatalog/Contents/7a/4b/3e/7a4b3e9f-de92-48be-80e6-83028827f788.jpg",
                "https://content.homedepot.com/eCatalog/Contents/bd/f6/1b/bdf61b62-959e-43d2-8ec5-336ef2a76f8e.jpg",
                "https://content.homedepot.com/eCatalog/Contents/80/8d/fa/808dfaf2-1d52-43aa-adcf-385e75e618c6.jpg",
                "https://content.homedepot.com/eCatalog/Contents/de/d3/89/ded3896d-fd29-4abf-88c5-ec569a514ba7.jpg",
                "https://content.homedepot.com/eCatalog/Contents/18/dd/71/18dd713a-355e-470e-b283-6abafb3d1cdd.jpg",
                "https://content.homedepot.com/eCatalog/Contents/18/dd/71/18dd713a-355e-470e-b283-6abafb3d1cdd.jpg",
                "https://content.homedepot.com/eCatalog/Contents/71/2f/88/712f88b9-407a-4dc4-942f-09ccdf813fd3.jpg"
            ],
                unitOfMeasure: "EA",
                brandName: null
        },
        errorResponse: null
    },
        skuLocationInfoByStore: {
        skuNbr: "161640",
            skuLocations: {
            primaryLocations: [
                "23-EC2"
            ],
                secondaryLocations: null,
                otherLocations: null
        },
        errorResponse: null
    },
        skuOnHandsInfoByStore: {
        skuNbr: "161640",
            skuOnHands: null,
            errorResponse: {
            errorLink: null,
                code: 503,
                message: "Service Not available"
        }
    },
        skuOrderInfo: null,
        errorResponse: null
    }

    fetch.mockResponseOnce(JSON.stringify(state));

    let component = shallow(<Inquiry { ...props1}/>);

    expect(component.childAt(1).find("SkuDetails").exists())
    expect(component.childAt(1).find("Header").exists())
})




