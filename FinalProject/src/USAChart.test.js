import Axios from 'axios';
import renderer from "react-test-renderer";
import USAChart from "./USAChart";

const testDate = "03/14/2020"


async function getValue() {
    const response = await Axios.get("http://localhost:5000/USA", { params: {date: testDate}})
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
    // Should be empty as it should have no state information
    expect(response.data[0].AdminRegion1).toBe("")
    // Should be empty as it should have no county information
    expect(response.data[0].AdminRegion2).toBe("\r")
})

test('returns null when map is not USA', () => {
    const component = renderer.create(
        <USAChart setTooltipContent={null} map={"County"} date={testDate} toolTip={null}/>
    );
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot();
})

test('returns the chart when map is USA', () => {
    const component = renderer.create(
        <USAChart setTooltipContent={null} map={"USA"} date={testDate} toolTip={null}/>
    );
    let tree = component.toJSON()
    expect(tree.length).toBeGreaterThan(1);
})
