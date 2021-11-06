import Axios from 'axios';
import renderer from 'react-test-renderer';
import CountyChart from "./CountyChart";
import {useState} from "react";

const testDate = "03/14/2020"

async function getValue() {
    const response = await Axios.get("http://localhost:5000/County", { params: {date: testDate}})
    return response
}

test("Get request", async () => {
    const response = await getValue()
    //Success code for get request
    expect(response.status).toEqual(200)
})

test("Date filtering", async () => {
    const response = await getValue()
    //Make sure the data of the data being pulled is correct
    expect(response.data[0].Updated).toEqual(testDate)
})

test("Getting correct data", async () => {
    const response = await getValue()
    // Should be getting state data
    expect(response.data[0].AdminRegion1).toBe("Georgia")
    // Should be getting county data
    expect(response.data[0].AdminRegion2).toBe("Dougherty")
})

test('returns null when map is not county', () => {
    const component = renderer.create(
        <CountyChart setTooltipContent={null} map={"USA"} date={testDate} toolTip={null}/>
    );
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot();
})

test('returns the chart when map is County', () => {
    const component = renderer.create(
        <CountyChart setTooltipContent={null} map={"County"} date={testDate} toolTip={null}/>
    );
    let tree = component.toJSON()
    expect(tree.length).toBeGreaterThan(1);
})
