import React from 'react'
import { shallow ,mount } from 'enzyme'
import PurchaseDetails from './PurchaseDetails'
import Context from '../contexts/Context';




describe('SkuDetails Component with props', () => {
    var props = {
        //location.state.skuNbr
        skuBasicInfo: {
            skuStatus: "ACTIVE",
            prices: [
                {
                    price: 3.61,
                    type: "PERMANENT"
                }
            ],
            skuDescription: "2X4-96 PRIME KD WHITEWOOD STUD"
        },
        sku_nbr: "161640"
    }

    let component = shallow(<SkuDetails {...props} />)

    it('Makes sure the <SkuDetails/> renders component', () => {
          expect(component).toMatchSnapshot();
    })


    it('Makes sure the <SkuDetails/> renders sku-number', () => {
        expect(component.find(".sku-number").length).toEqual(1)
        expect(component.find(".sku-number").text()).toEqual("0000-161-640")
    })

    it('Makes sure the <SkuDetails/> renders Price Information', () => {
        expect(component.find(".sku-details-price").length).toEqual(1)
        expect(component.find(".sku-details-price").text()).toEqual("3.61")
    })

    it('Makes sure the <SkuDetails/> renders SKU Description', () => {
        expect(component.find(".sku-details-desc").length).toEqual(1)
        expect(component.find(".sku-details-desc").text()).toEqual("2X4-96 PRIME KD WHITEWOOD STUD")
    })

    it('Makes sure the <SkuDetails/> renders Qty Details', () => {
        expect(component.find(".sku-details-quantity").length).toEqual(1)
    })

});


describe('SkuDetails Component with Carton Count props', () => {

    var props = {
        //location.state.skuNbr
        skuBasicInfo: {
            skuStatus: "ACTIVE",
            prices: [
                {
                    price: 3.61,
                    type: "PERMANENT"
                }
            ],
            skuDescription: "2X4-96 PRIME KD WHITEWOOD STUD"
        },
        sku_nbr: "161640",
        isCarton: true,
        cartonCount: 100,
        setInputQty: jest.fn(),
        resetErrorFlg : jest.fn(),
        setTotalUnits : jest.fn(),
        setItemQuantity: jest.fn()

    }
    const itemQuantity = 1;
    const totalUnits = 100;
    const cartonCount = 100;
    var component1 = mount(<Context.Provider value={{ itemQuantity,totalUnits,cartonCount}}>
    <SkuDetails {...props} />
    
    </Context.Provider>);
    
    it('Makes sure the <SkuDetails/> renders component', () => {
        expect(component1).toMatchSnapshot();
    })

    it('Makes sure the <SkuDetails/> renders sku-number', () => {
        expect(component1.find(".sku-number").length).toEqual(1)
        expect(component1.find(".sku-number").text()).toEqual("0000-161-640")
    })

    it('Makes sure the <SkuDetails/> renders Price Information', () => {
        expect(component1.find(".sku-details-price").length).toEqual(1)
        expect(component1.find(".sku-details-price").text()).toEqual("3.61")
    })

    it('Makes sure the <SkuDetails/> renders SKU Description', () => {
        expect(component1.find(".sku-details-desc").length).toEqual(1)
        expect(component1.find(".sku-details-desc").text()).toEqual("2X4-96 PRIME KD WHITEWOOD STUD")
    })

    it('Makes sure the <SkuDetails/> renders carton-count', () => {
        expect(component1.find(".sku-quantity-input").length).toEqual(1)
        expect(component1.find(".carton-units").length).toEqual(1)
        expect(component1.find(".carton-units").text()).toEqual("100")
        expect(component1.find(".unit-total").length).toEqual(1)
        expect(component1.find(".unit-total").text()).toEqual("100")
    })

});


describe('SkuDetails Component with Carton Count props and price is empty', () => {

    var props = {
        //location.state.skuNbr
        skuBasicInfo: {
            skuStatus: "ACTIVE",
            prices: [],
            skuDescription: "2X4-96 PRIME KD WHITEWOOD STUD"
        },
        sku_nbr: "161640",
        isCarton: true,
        cartonCount: 100,
        setInputQty: jest.fn(),
        resetErrorFlg : jest.fn(),
        setTotalUnits : jest.fn(),
        setItemQuantity: jest.fn()
    }
    const itemQuantity = 1;
    const totalUnits = 100;
    const cartonCount = 100
    var component2 = mount(<Context.Provider value={{ itemQuantity,totalUnits , cartonCount}}>
    <SkuDetails {...props} />
    
    </Context.Provider>);
    
    it('Makes sure the <SkuDetails/> renders component', () => {
        expect(component2).toMatchSnapshot();
    })

    it('Makes sure the <SkuDetails/> renders sku-number', () => {
        expect(component2.find(".sku-number").length).toEqual(1)
        expect(component2.find(".sku-number").text()).toEqual("0000-161-640")
    })

    it('Makes sure the <SkuDetails/> renders Price Information', () => {
        expect(component2.find(".sku-details-price").length).toEqual(1)
        expect(component2.find(".sku-details-price").text()).toEqual("--")
    })

    it('Makes sure the <SkuDetails/> renders SKU Description', () => {
        expect(component2.find(".sku-details-desc").length).toEqual(1)
        expect(component2.find(".sku-details-desc").text()).toEqual("2X4-96 PRIME KD WHITEWOOD STUD")
    })

    it('Makes sure the <SkuDetails/> renders carton-count', () => {
        expect(component2.find(".sku-quantity-input").length).toEqual(1)
        expect(component2.find(".carton-units").length).toEqual(1)
        expect(component2.find(".carton-units").text()).toEqual("100")
        expect(component2.find(".unit-total").length).toEqual(1)
        expect(component2.find(".unit-total").text()).toEqual("100")
    })

});


describe('SkuDetails Component with Carton Count props and sku desc is empty', () => {

    var props = {
        //location.state.skuNbr
        skuBasicInfo: {
            skuStatus: "ACTIVE",
            prices: [],
            skuDescription: ""
        },
        sku_nbr: "161640",
        isCarton: true,
        cartonCount: 100,
        setInputQty: jest.fn(),
        resetErrorFlg : jest.fn(),
        setTotalUnits : jest.fn(),
        setItemQuantity: jest.fn()
    }

    const itemQuantity = 1;
    const totalUnits = 100;
    const cartonCount = 100
    var component3 = mount(<Context.Provider value={{ itemQuantity , totalUnits , cartonCount}}>
        
            <SkuDetails {...props} />
      
    </Context.Provider>);
    // component3.instance().setState({
    //     isLoading: false,
    //     showErrorBox: false,
    //     skuNbr: "161640",
    //     setTotalUnits : jest.fn(),
    //     setItemQuantity: jest.fn()
    // },
    //     () => {
    //         component3.update();
    //     })

   // let component3 = shallow(<SkuDetails {...props} />)
    it('Makes sure the <SkuDetails/> renders component', () => {
        expect(component3).toMatchSnapshot();
    })

    it('Makes sure the <SkuDetails/> renders sku-number', () => {
        expect(component3.find(".sku-number").length).toEqual(1)
        expect(component3.find(".sku-number").text()).toEqual("0000-161-640")
    })

    it('Makes sure the <SkuDetails/> renders Price Information', () => {
        expect(component3.find(".sku-details-price").length).toEqual(1)
        expect(component3.find(".sku-details-price").text()).toEqual("--")
    })

    it('Makes sure the <SkuDetails/> renders SKU Description', () => {
        expect(component3.find(".sku-details-desc").length).toEqual(1)
        expect(component3.find(".sku-details-desc").text()).toEqual("--")
    })

    it('Makes sure the <SkuDetails/> renders carton-count', () => {
        expect(component3.find(".sku-quantity-input").length).toEqual(1)
        expect(component3.find(".carton-units").length).toEqual(1)
        expect(component3.find(".carton-units").text()).toEqual("100")
        expect(component3.find(".unit-total").length).toEqual(1)
        expect(component3.find(".unit-total").text()).toEqual("100")
    })

});

describe('SkuDetails Component with Carton Count props and sku status is empty', () => {

    var props = {
        //location.state.skuNbr
        skuBasicInfo: {
            skuStatus: "",
            prices: null,
            skuDescription: ""
        },
        sku_nbr: "161640",
        isCarton: true,
        cartonCount: 100,
        setInputQty: jest.fn(),
        resetErrorFlg : jest.fn(),
        setTotalUnits : jest.fn(),
        setItemQuantity: jest.fn()
    }

   
    const itemQuantity = 1;
    const totalUnits = 100;
    const cartonCount = 100;
    var component4 = mount(<Context.Provider value={{ itemQuantity , totalUnits , cartonCount}}>
        
            <SkuDetails {...props} />
      
    </Context.Provider>);

    it('Makes sure the <SkuDetails/> renders component', () => {
        expect(component4).toMatchSnapshot();
    })

    it('Makes sure the <SkuDetails/> renders sku-number', () => {
        expect(component4.find(".sku-number").length).toEqual(1)
        expect(component4.find(".sku-number").text()).toEqual("0000-161-640")
    })

    it('Makes sure the <SkuDetails/> renders Price Information', () => {
        expect(component4.find("#sku-details-status").length).toEqual(1)
    expect(component4.find("#sku-details-status").text()).toEqual("--")
    })

    it('Makes sure the <SkuDetails/> renders SKU Description', () => {
        expect(component4.find(".sku-details-desc").length).toEqual(1)
        expect(component4.find(".sku-details-desc").text()).toEqual("--")
    })

    it('Makes sure the <SkuDetails/> renders carton-count', () => {
        expect(component4.find(".sku-quantity-input").length).toEqual(1)
        expect(component4.find(".carton-units").length).toEqual(1)
        expect(component4.find(".carton-units").text()).toEqual("100")
        expect(component4.find(".unit-total").length).toEqual(1)
        expect(component4.find(".unit-total").text()).toEqual("100")
    })

});


// Simulate input Qty
describe('SkuDetails Component with Carton Count props and simulate inputQty', () => {

    var props = {
        //location.state.skuNbr
        skuBasicInfo: {
            skuStatus: "",
            prices: null,
            skuDescription: ""
        },
        sku_nbr: "161640",
        isCarton: true,
        cartonCount: 200,
        setInputQty: jest.fn(),
        resetErrorFlg : jest.fn(),
        setTotalUnits : jest.fn(),
        setItemQuantity: jest.fn()
    }

    const itemQuantity = 50;
    const totalUnits = 100;
    const cartonCount = 200;
    var component5 = mount(<Context.Provider value={{ itemQuantity , totalUnits , cartonCount}}>
        
            <SkuDetails {...props} />
      
    </Context.Provider>);
    it('Makes sure the <SkuDetails/> renders component', () => {
        expect(component5).toMatchSnapshot();
    })

    it('Makes sure the <SkuDetails/> renders sku-number', () => {
        expect(component5.find(".sku-number").length).toEqual(1)
        expect(component5.find(".sku-number").text()).toEqual("0000-161-640")
    })

    it('Makes sure the <SkuDetails/> renders Price Information', () => {
        expect(component5.find("#sku-details-status").length).toEqual(1)
        expect(component5.find("#sku-details-status").text()).toEqual("--")
    })

    it('Makes sure the <SkuDetails/> renders SKU Description', () => {
        expect(component5.find(".sku-details-desc").length).toEqual(1)
        expect(component5.find(".sku-details-desc").text()).toEqual("--")
    })

    it('Makes sure the <SkuDetails/> renders carton-count', () => {
        expect(component5.find(".sku-quantity-input").length).toEqual(1)
        expect(component5.find(".carton-units").length).toEqual(1)
        expect(component5.find(".carton-units").text()).toEqual("200")
        expect(component5.find(".textbox-border").props().value).toEqual(50)
    
    })

    // Simulate input qty value
    it('Makes sure the <SkuDetails/> renders carton-count', () => {
        component5.find(".sku-quantity-input").simulate('change', {target: {value: '50'}});
        component5.state('inputQty');

        expect(component5.find(".sku-quantity-input").length).toEqual(1)
        expect(component5.find(".carton-units").length).toEqual(1)
        expect(component5.find(".carton-units").text()).toEqual("200")
        expect(component5.find(".unit-total").length).toEqual(1)
        expect(component5.find(".unit-total").text()).toEqual("100")
        expect(component5.find(".textbox-border").props().value).toEqual(50)
    })



});


// Simulate input Qty
describe('SkuDetails Component with default cartonQty and Carton Count props', () => {

    
    var props = {
        //location.state.skuNbr
        skuBasicInfo: {
            skuStatus: "",
            prices: [
                {
                    price: 3.61,
                    type: "PERMANENT"
                }
            ],
            skuDescription: ""
        },
        sku_nbr: "161640",
        isCarton: true,
        cartonCount: 200,
        inputQty : null,
        cartonInputQty: 1,
        itemQuantity: 1,
        totalUnits: 1,
        setInputQty: jest.fn(),
        resetErrorFlg : jest.fn(),
        setTotalUnits : jest.fn(),
        setItemQuantity: jest.fn()
    }
    let setItemQuantity= jest.fn()
    let setTotalUnits= jest.fn()
    let cartonCount = 200;

    const itemQuantity = 50;
    const totalUnits = 100;
    var component6 = mount(<Context.Provider value={{  setItemQuantity, setTotalUnits , cartonCount }}>
    <SkuDetails {...props} />
  
    </Context.Provider>);


    it('Makes sure the <SkuDetails/> renders component', () => {
        expect(component6).toMatchSnapshot();
    })

    it('Makes sure the <SkuDetails/> renders sku-number', () => {
        expect(component6.find(".sku-number").length).toEqual(1)
        expect(component6.find(".sku-number").text()).toEqual("0000-161-640")
    })

    it('Makes sure the <SkuDetails/> renders Price Information', () => {
        expect(component6.find("#sku-details-status").length).toEqual(1)
    expect(component6.find("#sku-details-status").text()).toEqual("--")
    })

    it('Makes sure the <SkuDetails/> renders SKU Description', () => {
        expect(component6.find(".sku-details-desc").length).toEqual(1)
        expect(component6.find(".sku-details-desc").text()).toEqual("--")
    })


    // Simulate input qty value
    it('Makes sure the <SkuDetails/> renders error for carton-count', () => {
        component6.find(".textbox-border").simulate('change', {target: {value: '999'}});
        component6.state('inputQty');
        expect(component6.find(".sku-quantity-input").length).toEqual(1)
        expect(component6.find(".carton-units").length).toEqual(1)
        expect(component6.find(".carton-units").text()).toEqual("200")
        expect(component6.find(".unit-total").text()).toEqual('')     
        expect(component6.find(".sku-details-error-validation").text()).toEqual(' Total Unit Count Cannot Exceed 999 ');
    })



});


